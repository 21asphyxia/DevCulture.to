<?php
    isset($_SESSION['user']) ? header('Location: views/dashboard.php') : header('Location: views/login.php');
?>