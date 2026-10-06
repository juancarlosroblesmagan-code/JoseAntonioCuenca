<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function respond(int $status, array $data): never {
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

$configPath = dirname(__DIR__, 2) . '/contact-config.php';
if (!is_file($configPath)) respond(503, ['success' => false, 'message' => 'El envío no está disponible. Escribe a info@joseantoniocuenca.es.']);
$config = require $configPath;
$origin = 'https://joseantoniocuenca.es';
$method = $_SERVER['REQUEST_METHOD'] ?? '';
$ip = $_SERVER['REMOTE_ADDR'] ?? '';
$key = hash_hmac('sha256', $ip, $config['token_key']);

if ($method === 'GET') {
    $stamp = time();
    $signature = hash_hmac('sha256', $stamp . ':' . $key, $config['token_key']);
    respond(200, ['token' => $stamp . '.' . $signature]);
}
if ($method !== 'POST') {
    header('Allow: GET, POST');
    respond(405, ['success' => false, 'message' => 'Método no permitido.']);
}
if (($_SERVER['HTTP_ORIGIN'] ?? '') !== $origin) respond(403, ['success' => false, 'message' => 'Origen no permitido.']);
if (!str_starts_with(strtolower($_SERVER['CONTENT_TYPE'] ?? ''), 'application/json')) respond(415, ['success' => false, 'message' => 'Formato no permitido.']);
if ((int)($_SERVER['CONTENT_LENGTH'] ?? 0) > 16000) respond(413, ['success' => false, 'message' => 'Mensaje demasiado largo.']);
$raw = file_get_contents('php://input', false, null, 0, 16001);
if ($raw === false || strlen($raw) > 16000) respond(413, ['success' => false, 'message' => 'Mensaje demasiado largo.']);
$data = json_decode($raw, true);
if (!is_array($data)) respond(400, ['success' => false, 'message' => 'Datos no válidos.']);
foreach (['name', 'email', 'company', 'message', 'website', 'token'] as $field) {
    if (isset($data[$field]) && !is_string($data[$field])) respond(422, ['success' => false, 'message' => 'Revisa los campos del formulario.']);
}
$token = explode('.', $data['token'] ?? '', 2);
$stamp = $token[0] ?? '';
if (!ctype_digit($stamp) || !isset($token[1]) || !hash_equals(hash_hmac('sha256', $stamp . ':' . $key, $config['token_key']), $token[1]) || time() - (int)$stamp < 2 || time() - (int)$stamp > 3600) {
    respond(403, ['success' => false, 'message' => 'La sesión del formulario ha caducado. Cierra y vuelve a abrir el formulario.']);
}
if (!empty($data['website'])) respond(422, ['success' => false, 'message' => 'No se ha enviado el mensaje.']);
$name = trim($data['name'] ?? '');
$email = trim($data['email'] ?? '');
$company = trim($data['company'] ?? '');
$message = trim($data['message'] ?? '');
if (strlen($name) < 2 || strlen($name) > 160 || strlen($company) > 240 || strlen($email) > 254 || !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($message) < 10 || strlen($message) > 8000 || preg_match('/[\r\n\x00-\x1F\x7F]/', $name . $email . $company) || ($data['consent'] ?? false) !== true) {
    respond(422, ['success' => false, 'message' => 'Revisa nombre, email, mensaje y la autorización para responder.']);
}

// Private, bounded rate state; never store the submitted message on disk.
$stateDir = dirname(__DIR__, 2) . '/contact-rate';
if (!is_dir($stateDir) && !mkdir($stateDir, 0700, true)) respond(503, ['success' => false, 'message' => 'Envío no disponible temporalmente.']);
$handle = fopen($stateDir . '/limits.json', 'c+');
if (!$handle || !flock($handle, LOCK_EX)) respond(503, ['success' => false, 'message' => 'Envío no disponible temporalmente.']);
$state = json_decode(stream_get_contents($handle), true) ?: [];
$now = time();
foreach ($state as $id => $times) {
    $state[$id] = array_values(array_filter($times, fn($time) => $time > $now - 600));
    if (!$state[$id]) unset($state[$id]);
}
$global = $state['global'] ?? [];
$limited = count($state[$key] ?? []) >= 3 || count($global) >= 30;
if (!$limited) { $state[$key][] = $now; $state['global'][] = $now; }
rewind($handle); ftruncate($handle, 0); fwrite($handle, json_encode($state)); fflush($handle); flock($handle, LOCK_UN); fclose($handle);
if ($limited) { header('Retry-After: 600'); respond(429, ['success' => false, 'message' => 'Has alcanzado el límite de envíos. Espera unos minutos o escribe directamente al email.']); }

require __DIR__ . '/lib/Exception.php';
require __DIR__ . '/lib/PHPMailer.php';
require __DIR__ . '/lib/SMTP.php';
try {
    $mail = new PHPMailer\PHPMailer\PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = 'smtp.ionos.es';
    $mail->Port = 587;
    $mail->SMTPAuth = true;
    $mail->Username = 'info@joseantoniocuenca.es';
    $mail->Password = $config['smtp_password'];
    $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Timeout = 15;
    $mail->CharSet = 'UTF-8';
    $mail->setFrom('info@joseantoniocuenca.es', 'José Antonio Cuenca · Web');
    $mail->addAddress('info@joseantoniocuenca.es');
    $mail->addReplyTo($email, $name);
    $mail->Subject = 'Consulta profesional desde joseantoniocuenca.es';
    $mail->Body = "Nombre: {$name}\nEmail: {$email}\nEmpresa: {$company}\n\n{$message}\n\nSolicitud enviada desde la web. Autorización para responder: sí.";
    $mail->send();
    respond(200, ['success' => true, 'message' => 'Mensaje enviado. José Antonio te responderá por email.']);
} catch (Throwable $error) {
    // Never return SMTP diagnostics or credentials to the visitor.
    error_log('Cuenca contact: SMTP send failed.');
    respond(502, ['success' => false, 'message' => 'No se ha podido enviar. Inténtalo más tarde o escribe a info@joseantoniocuenca.es.']);
}
