<?php
$pageTitle = 'Login';
include_once '../controllers/LoginController.php';
include_once '../includes/head.php';
?>

<body id="loginRegisterPage" class="h-100 d-flex justify-content-center align-items-center">
<!-- ==================================================== -->
    <div id="loginRegisterBox" class=" p-2 w-75 shadow-5-strong  ">
        <h2 class="my-3 text-center" id="pageTitle">LOGIN</h2>
        <hr>
        <div id="logo" class="w-75 mx-auto d-flex justify-content-center mb-5">
            <img class="" src="../dist/img/logo.png" alt="Origin Gamer Logo" width="300">
        </div>
    <?php
    if (isset($_SESSION['registerSuccess'])){
        echo "<div class='w-75 mx-auto mb-4 text-success' role='alert'>".$_SESSION['registerSuccess']."</div>"; 
        unset($_SESSION['registerSuccess']);
    }
    ?>
        <form method="post">
            <div class="mb-3">
                <input class="w-75 d-block mx-auto rounded px-3 py-2 " type="text" name="email" id="email" placeholder= "&#xf0e0;   E-mail">
                <!-- email error -->
                <?php if (isset($_SESSION['emailError'])){
                    echo "<div class='w-75 mx-auto text-danger' role='alert'>".$_SESSION['emailError']."</div>"; 
                    unset($_SESSION['emailError']);
                } ?>
                <div id="emailError" class="w-75 mx-auto text-danger d-none">Please enter a valid E-mail</div>
            </div>
            <div class="mb-5">
                <input class="w-75 d-block mx-auto rounded px-3 py-2" type="password" name="password" id="password" placeholder= "&#xf084;   Password">
                <!-- password error -->
                <?php if (isset($_SESSION['passwordError'])){
                    echo "<div class='w-75 mx-auto text-danger' role='alert'>".$_SESSION['passwordError']."</div>"; 
                    unset($_SESSION['passwordError']);
                } ?>
            </div>
            <button class="d-flex justify-content-center mx-auto mb-5" type="submit" name="login" id="loginRegisterSubmit">Login</button>
        </form>
        <div class="d-flex-column justify-content-center">
            <p class="text-center mb-2">Don't have an account?</p> 
            <a class="d-block mx-auto" href="register.php"><button class="d-flex justify-content-center mx-auto mb-3" type="button">Register</button></a>

    </div>
</body>
<?php
include_once '../includes/corejs.php';