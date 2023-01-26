<?php
include_once __DIR__.'/../models/Users.class.php';


$users = new Users();

if (isset($_POST['register'])){
    // get form data
    $email = $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $fullName = $_POST['fullName'];
    $password = $_POST['password'];
    $confirmPassword = $_POST['confirmPassword'];

    // form validation
    if (empty($email)) {
        $_SESSION['emailError'] = 'Please enter your email.';
    } else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $_SESSION['emailError'] = 'Please enter a valid email.';
    } else if (empty($fullName)) {
        $_SESSION['fullNameError'] = 'Please enter your full name.';
    } else if (empty($password)) {
        $_SESSION['passwordError'] = 'Please enter your password.';
    } else if (empty($confirmPassword)) {
        $_SESSION['confirmPasswordError'] = 'Please confirm your password.';
    } else if ($password !== $confirmPassword) {
        $_SESSION['confirmPasswordError'] = 'Passwords do not match.';
    } else{
        //password regex
        $uppercase = preg_match('/[A-Z]/', $password);
        $lowercase = preg_match('/[a-z]/', $password);
        $number    = preg_match('/[0-9]/', $password);

        if(!$uppercase || !$lowercase || !$number || strlen($password) < 8) {
            $_SESSION['passwordError'] = 'Password should be at least 8 characters in length and should include at least one upper case letter, and one number.';
        }
        else {
            $password = password_hash($password,PASSWORD_DEFAULT);
            // register the user
            $users->register($email, $password, $fullName);
        }
    }   
}
?>