<ul class="navbar-nav sidebar md-sm-dis toggled" id="sidebar">
        <li class="nav-item my-5 d-flex-column">
                <!-- <div class="mx-auto username mb-3"><img class ="" src="../dist/img/user1pfp.png" alt="Profile Picture"></div>  -->
                <p class="username mx-auto"><?= $_SESSION['fullName']?></p>
        </li>
        <!-- dashboard button -->
        <li class="nav-item mt-5 mx-auto">
            <a class="" href="../index.php">
                <button class="nav-btn <?php if($pageTitle=='Dashboard'){echo "active";} ?>">
                <i class="bi bi-clipboard-data-fill"></i>
                <span>Dashboard</span></button></a>
        </li>

        <!-- Articles button -->
        <li class="nav-item  mt-5 mx-auto">
            <a class="" href="articles.php">
            <button class="nav-btn <?php if($pageTitle=='Articles'){echo "active";} ?>">
                <i class="bi bi-file-text-fill"></i>
                <span>Articles</span></button></a>
            
        </li>
        
        <li class="nav-item  mt-5 mx-auto mb-5">
            <a class="" href="categories.php">
                <button class="nav-btn <?php if($pageTitle=='Categories'){echo "active";} ?>">
                <i class="bi bi-tag-fill"></i>
                <span>Categories</span></button></a>
        </li>
        <li class="nav-item  mt-5 mx-auto">
            <a class="" href="../controllers/LogoutController.php">
                <button class="nav-btn">
                <i class="bi bi-box-arrow-right"></i>
                <span>Log Out</span></button></a>
    </ul>