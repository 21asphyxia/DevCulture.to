<?php

$pageTitle = 'Dashboard';
include_once '../controllers/StatisticsController.php';
(!isset($_SESSION['id'])) ? header('Location: login.php') : NULL;
include_once '../includes/head.php';
?>

<body id="dashboardPage">
    <!-- Navbar -->
    <?php include_once '../includes/navbar.php'; ?>
    <!-- End of Navbar -->
    <div id="wrapper">
    <!-- Sidebar -->
    <?php include_once '../includes/sidebar.php';?>
    <!-- End of Sidebar -->
    <main class="container mt-5">
        <div class="mt-2 d-flex justify-content-evenly w-100 mb-5 flex-wrap">
            <div class="ps-3 pe-5 py-3 box mb-4">
                <div class="fs-5 mb-4 fw-bold">Total Articles</div>
                <div class="fs-6"><?php
                
                ?> Articles</div>
            </div>
            <div class="ps-3 pe-5 py-3 box mb-4">
                <div class="fs-5 mb-4 fw-bold">Total Categories</div>
                <div class="fs-6"><?php
                
                ?> Categories</div>
            </div>
        </div>
        <div class="box max-vh-50">
            <span class="fw-bold ps-3">Developers Stats</span>
            <div class="table-responsive mt-3">
                <table class="table table-borderless">
                    <thead>
                        <tr>
                            <th class="text-secondary fs-7 text-center col-2 align-middle" scope="col">#</th>
                            <th class="text-secondary fs-7 text-center col-5 align-middle" scope="col">Developer Name</th>
                            <th class="text-secondary fs-7 text-center col-5 align-middle" scope="col">No. of Articles</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        
                        ?>
                    </tbody>
                </table>
            </div>
        </div>
    </main>
</div>
</body>
<?php include_once '../includes/corejs.php'; ?>
<script src="../dist/js/app.min.js"></script>