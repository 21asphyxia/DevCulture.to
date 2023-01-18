<nav id="header" class="navbar navbar-expand-md d-flex border-bottom-2 ">
        <div class="navbar navbar-header flex-fill p-2">
            <a href="dashboard.php" class="">
                <img src="../dist/img/logo.png" alt="logo" width="200" class=""> 
            </a>
        </div>
        
        <div class="pt-1 pe-2 ">
            <a href="#">
                <span class="d-none d-sm-inline username"><?= $_SESSION['fullName']?></span>
            </a>
        </div>
        <button id="sidebarToggleTop" class="btn btn-link rounded-circle mr-3"><i class="fa fa-bars"></i></button>
    </nav>