<?php
require "PHPMailer-master/src/PHPMailer.php";
require "PHPMailer-master/src/Exception.php";
require "PHPMailer-master/src/SMTP.php";

$title = "[Обратный звонок Blanchard]";
// тело письма
$body = '<h1>Заявка на звонок</h1>';
if (trim(!empty($_POST['fio']))) {
  $body .= '<p><strong>Имя:</strong> ' . $_POST['fio'] . '</p>';
}
if (trim(!empty($_POST['tel']))) {
  $body .= '<p><strong>Телефон:</strong> ' . $_POST['tel'] . '</p>';
}

$mail = new PHPMailer\PHPMailer\PHPMailer(true);

// server settings
$mail->isSMTP();
$mail->CharSet = 'UTF-8';
$mail->SMTPAuth = true;
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->Host = 'smtp.gmail.com';
$mail->Username = 'lnek10.1990@gmail.com';
$mail->Password = 'svmvlblxxulbikdk';
$mail->SMTPSecure = 'ssl';
$mail->Port = 465;
// recipients
$mail->setFrom('lnek10.1990@gmail.com', 'Blanchard');
$mail->addAddress('lnek10.1990@gmail.com');
// content
$mail->IsHTML(true);
$mail->Subject = $title;
$mail->Body = $body;
// проверяем отправлено ли сообщение
if (!$mail->send()) {
  $message = "Сообщение не было отправлено! Причина ошибки: {$mail->ErrorInfo}";
} else {
  $message = 'Сообщение успешно отправлено!';
}
// возвращаем ответ
$response = ["message" => $message];
// ответ в формате JSON
header('Content-type: application/json');
echo json_encode($response);

?>
