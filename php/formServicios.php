<?php
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    die("Método no permitido");
}

// Incluir PHPMailer desde la ubicación correcta
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../libs/PHPMailer/src/PHPMailer.php';
require '../libs/PHPMailer/src/SMTP.php';
require '../libs/PHPMailer/src/Exception.php';

// Validar y limpiar datos
$nombre = filter_input(INPUT_POST, "nombre", FILTER_SANITIZE_STRING);
$email = filter_input(INPUT_POST, "email", FILTER_VALIDATE_EMAIL);
$tipoContacto = filter_input(INPUT_POST, "tipoContacto", FILTER_SANITIZE_STRING);
$mensaje = filter_input(INPUT_POST, "mensaje", FILTER_SANITIZE_STRING);
$recaptchaResponse = $_POST["g-recaptcha-response"] ?? '';

// 📌 Verificar reCAPTCHA con Google
$secretKey = "6LduadcqAAAAAM4kGP1xEzLd7l1m-KjFZwr1jCfU"; // ✅ Sustituir por tu clave secreta
$recaptchaUrl = "https://www.google.com/recaptcha/api/siteverify";
$recaptchaData = [
    "secret" => $secretKey,
    "response" => $recaptchaResponse
];

$options = [
    "http" => [
        "header" => "Content-Type: application/x-www-form-urlencoded",
        "method" => "POST",
        "content" => http_build_query($recaptchaData)
    ]
];

$recaptchaVerify = json_decode(file_get_contents($recaptchaUrl, false, stream_context_create($options)), true);

if (!$recaptchaVerify["success"]) {
    die("Error: reCAPTCHA no válido.");
}

// 📌 Enviar correo con PHPMailer (SMTP de Hostinger)
$mail = new PHPMailer(true);
try {
    $mail->isSMTP();
    $mail->Host = 'smtp.hostinger.com';  // ✅ SMTP de Hostinger
    $mail->SMTPAuth = true;
    $mail->Username = 'info@unengroup.com.ar';  // ✅ TU CORREO
    $mail->Password = '!UnenGroup17';  // ✅ CONTRASEÑA DEL CORREO
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // ✅ TLS (prueba también con SSL en 465)
    $mail->Port = 587;  // ✅ Puerto SMTP de Hostinger (usa 465 si hay problemas)

    // Configuración del remitente y destinatario
    $mail->setFrom('info@unengroup.com.ar', 'Contacto Web');
    $mail->addAddress('desarrollounengroup@gmail.com');  // 📌 A quién enviar el correo

    // Contenido del correo
    $mail->Subject = "Nuevo mensaje de contacto";
    $mail->Body = "Nombre: $nombre\nEmail: $email\nTipo de Contacto: $tipoContacto\nMensaje:\n$mensaje";

    if ($mail->send()) {
        echo "Mensaje enviado con éxito.";
    } else {
        echo "Error al enviar el mensaje.";
    }

    // 📌 Guardar en Google Sheets (Webhook)
    $urlWebhook = "https://script.google.com/macros/s/AKfycbyNHz05j2geEt-2nS8ezNW8YHe0qQmwzoL08LwmU86dzgN5Ico_pWBAvK6n1UOKm4Etaw/exec";
    $data = json_encode([
        "nombre" => $nombre,
        "email" => $email,
        "tipoContacto" => $tipoContacto,
        "mensaje" => $mensaje
    ]);

    file_get_contents($urlWebhook, false, stream_context_create([
        "http" => [
            "header" => "Content-Type: application/json",
            "method" => "POST",
            "content" => $data
        ]
    ]));

} catch (Exception $e) {
    echo "Error al enviar mensaje: " . $mail->ErrorInfo;
}
