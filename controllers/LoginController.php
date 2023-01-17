<?php
include_once __DIR__.'/../models/Users.class.php';


$users = new Users();

if (isset($_POST['login'])) {
    // get form data
    $email = $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $password = $_POST['password'];


    // form validation
    if (empty($email)) {
        $_SESSION['emailError'] = 'Please enter your email.';
    } else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $_SESSION['emailError'] = 'Please enter a valid email.';
    } else if (empty($password)) {
        $_SESSION['passwordError'] = 'Please enter your password.';
    } else {
        // login the user
        $users->login($email, $password);
    }
}