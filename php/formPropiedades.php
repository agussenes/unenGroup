<?php
session_start(); // 🔹 Iniciar sesión para almacenar el tiempo del último envío

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Método no permitido"]);
    exit;
}

// **📌 Limitar envíos: 1 mensaje cada 60 segundos**
$tiempoActual = time();
$ultimoEnvio = $_SESSION['ultimo_envio'] ?? 0;
$limiteTiempo = 60; // Segundos

if ($tiempoActual - $ultimoEnvio < $limiteTiempo) {
    http_response_code(429);
    echo json_encode(["status" => "error", "message" => "Espera 1 minuto antes de enviar otro mensaje."]);
    exit;
}

// Incluir PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../libs/PHPMailer/src/PHPMailer.php';
require '../libs/PHPMailer/src/SMTP.php';
require '../libs/PHPMailer/src/Exception.php';

// Definir encabezado JSON
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// **Validar datos** — campos reales del formulario de propiedades:
// nombre, correo, telefono, propiedadInteres, mensaje
$nombre = filter_input(INPUT_POST, "nombre", FILTER_SANITIZE_STRING);
$email = filter_input(INPUT_POST, "correo", FILTER_VALIDATE_EMAIL);
$telefono = filter_input(INPUT_POST, "telefono", FILTER_SANITIZE_STRING);
$propiedadInteres = filter_input(INPUT_POST, "propiedadInteres", FILTER_SANITIZE_STRING);
$mensaje = filter_input(INPUT_POST, "mensaje", FILTER_SANITIZE_STRING);
$recaptchaResponse = $_POST["g-recaptcha-response"] ?? '';

if (!$nombre || !$email || !$telefono || !$propiedadInteres || !$mensaje || !$recaptchaResponse) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Todos los campos son obligatorios."]);
    exit;
}

// **Verificar reCAPTCHA con Google**
$secretKey = "6LduadcqAAAAAM4kGP1xEzLd7l1m-KjFZwr1jCfU";
$recaptchaUrl = "https://www.google.com/recaptcha/api/siteverify";
$recaptchaData = [
    "secret" => $secretKey,
    "response" => $recaptchaResponse
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $recaptchaUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($recaptchaData));
$response = curl_exec($ch);
curl_close($ch);

$recaptchaVerify = json_decode($response, true);

if (!$recaptchaVerify || !isset($recaptchaVerify["success"]) || !$recaptchaVerify["success"]) {
    http_response_code(403);
    echo json_encode(["status" => "error", "message" => "Error: reCAPTCHA no válido."]);
    exit;
}

// **Enviar correo con PHPMailer**
$mail = new PHPMailer(true);
try {
    $mail->isSMTP();
    $mail->Host = 'smtp.hostinger.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'no-reply@unengroup.com.ar';
    $mail->Password = 'SmptUnenGroup1!';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = 465;

    $mail->setFrom('no-reply@unengroup.com.ar', 'Contacto Web');
    $mail->addAddress('desarrollounengroup@gmail.com', 'info@unengroup.com.ar');

    $mail->Subject = "Nueva consulta de propiedad";
    $mail->Body = "Nombre: $nombre\nEmail: $email\nTeléfono: $telefono\nPropiedad de interés: $propiedadInteres\nMensaje:\n$mensaje";
    $mail->CharSet = 'UTF-8';

    if ($mail->send()) {
        // **Actualizar el tiempo del último envío**
        $_SESSION['ultimo_envio'] = $tiempoActual;

        // **Guardar en Google Sheets (Webhook)**
        $urlWebhook = "https://script.google.com/macros/s/AKfycbxWVBMwZw8cf_91yiZjA7QltyZs5DBnypKgoFCwu4fvPol2Rl3EF5GelgDubRZ5th2C/exec";
        $data = json_encode([
            "nombre" => $nombre,
            "email" => $email,
            "telefono" => $telefono,
            "propiedadInteres" => $propiedadInteres,
            "mensaje" => $mensaje
        ]);

        $ch = curl_init($urlWebhook);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_exec($ch);
        curl_close($ch);

        echo json_encode(["status" => "success", "message" => "Mensaje enviado con éxito."]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Error al enviar el mensaje."]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Error al enviar mensaje: " . $mail->ErrorInfo]);
}
exit;
