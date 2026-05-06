<?php
// 1. CORS Headers must be at the very top
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
header('Content-Type: application/json');

// 2. Handle Preflight OPTIONS Request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// 3. Check if PHPMailer exists before requiring
if (!file_exists('../vendor/autoload.php')) {
    echo json_encode([
        'success' => false, 
        'message' => 'PHPMailer not found. Please run "composer require phpmailer/phpmailer" in the project root.'
    ]);
    exit;
}

require '../vendor/autoload.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    if (!$data) {
        echo json_encode(['success' => false, 'message' => 'No data received']);
        exit;
    }

    $name = $data['name'];
    $email = $data['email'];
    $subject = $data['subject'];
    $message = $data['message'];

    $mail = new PHPMailer(true);

    try {
        // SMTP Settings
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com'; // Replace with your SMTP host
        $mail->SMTPAuth   = true;
        $mail->Username   = 'jeromethree12@gmail.com'; // Your email
        $mail->Password   = 'dkzcnhtnalabshcq'; // Your app password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // Recipients
        $mail->setFrom($email, $name);
        $mail->addAddress('matugasjerome@gmail.com', 'Jerome'); // Where you want to receive emails

        // Content
        $mail->isHTML(true);
        $mail->Subject = "New Portfolio Message: $subject";
        $mail->Body    = "
            <h3>New Message from Portfolio</h3>
            <p><strong>Name:</strong> $name</p>
            <p><strong>Email:</strong> $email</p>
            <p><strong>Subject:</strong> $subject</p>
            <p><strong>Message:</strong><br>$message</p>
        ";

        $mail->send();
        echo json_encode(['success' => true, 'message' => 'Message has been sent']);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}"]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>
