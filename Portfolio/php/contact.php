<?php
if($_POST){
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    $to = "your-email@example.com";
    $subject = "New Message from Portfolio";
    $headers = "From: ".$email;
    $body = "Name: $name\nEmail: $email\nMessage: $message";
    if(mail($to, $subject, $body, $headers)){
        echo "Message sent successfully!";
    } else {
        echo "Message sending failed.";
    }
}
?>
