<?php
include '../scripts.php';
(isset($_SESSION['id'])) ?:  header('Location: login.php');

$pageTitle = 'Dashboard';
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
                <div class="fs-5 mb-4 fw-bold">Total Products</div>
                <div class="fs-6"><?php
                $sql = "SELECT * FROM products";
                $result = mysqli_query($conn, $sql);
                echo mysqli_num_rows($result);
                ?> Products</div>
            </div>
            <div class="ps-3 pe-5 py-3 box">
                <div class="fs-5 mb-4 fw-bold">Total Categories</div>
                <div class="fs-6"><?php
                $sql = "SELECT * FROM category";
                $result = mysqli_query($conn, $sql);
                echo mysqli_num_rows($result);
                ?> Categories</div>
            </div>
        </div>
        <div class="box max-vh-50">
            <span class="fw-bold ps-3">Categories Stats</span>
            <div class="table-responsive mt-3">
                <table class="table table-borderless">
                    <thead>
                        <tr>
                            <th class="text-secondary fs-7 text-center col-2 align-middle" scope="col">#</th>
                            <th class="text-secondary fs-7 text-center col-5 align-middle" scope="col">Category</th>
                            <th class="text-secondary fs-7 text-center col-5 align-middle" scope="col">No. of products</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        // sql query to get categories and count of products
                        $sql = "SELECT category_id,category.category_name, COUNT(products.category) AS product_count FROM category LEFT JOIN products ON category.category_id = products.category GROUP BY category.category_name ORDER BY category_id";
                        $result = mysqli_query($conn, $sql);
                        while ($row = mysqli_fetch_assoc($result)) {
                            echo '<tr>
                            <th class="fs-7 text-center align-middle" scope="row">' . $row['category_id'] . '</th>
                            <td class="fs-7 text-center align-middle">' . $row['category_name'] . '</td>
                            <td class="fs-7 text-center align-middle">' . $row['product_count'] . '</td>';}
                        ?>
                    </tbody>
                </table>
            </div>
        </div>
    </main>
</div>
</body>
<?php include_once '../includes/core-js.php'; ?>
<script src="../dist/js/app.min.js"></script>