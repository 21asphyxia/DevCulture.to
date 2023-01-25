<?php

$pageTitle = 'Categories';
include_once '../includes/head.php';
include_once '../controllers/CategoriesController.php';
(!isset($_SESSION['id'])) ? header('Location: login.php') : NULL;
?>
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.13.1/css/jquery.dataTables.css">

<body class="crudPage" id="categories">
    <!-- Navbar -->
    <?php include_once '../includes/navbar.php'; ?>
    <!-- End of Navbar -->
    <div id="wrapper">
    <!-- Sidebar -->
    <?php include_once '../includes/sidebar.php';?>
    <!-- End of Sidebar -->
    
    <main class="pt-3 mx-auto">
        <div class="box py-4 list overflow-auto">
            <div class="d-flex justify-content-between">
                <span class="fw-bold my-auto ps-3">All Categories</span>
                <button class="btn rounded px-3 me-3" id="addButton"><i class="fa fa-plus pe-3"></i>Add Category</button>
            </div>
            <div class="table-responsive mt-3">
                <table id="myTable" class="table table-borderless">
                    <thead>
                        <tr>
                            <th class="text-secondary fs-7 text-start" scope="col">#</th>
                            <th class="text-secondary fs-7 text-center" scope="col"></th>
                            <th class="text-secondary fs-7 text-center" scope="col">Category Name</th>
                            <th class="text-secondary fs-7 text-right" scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
		<?php
		
		?>
        <form class="modal fade" id="form" tabindex="-1">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header mb-3">
					<h5 id="modalTitle" class="modal-title">Add Category</h5>
					<button type="button" id="close-button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<input type="hidden" name="categoryId" id="categoryId">
					<div class="mb-3">
						<input type="text" name="categoryName" class="form-control" id="categoryName" placeholder="Category Name" >
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn" data-bs-dismiss="modal" id="cancel-button">Cancel</button>
					<button type="button" name="save" id="save-button" class="btn">Save</button>
					<button type="button" name="update" class="btn" id="update-button">Update</button>
				</div>
				
			</div>
		</div>
	</form>
    </main>
	
</div>
<!-- ================== BEGIN core-js ================== -->
    <?php
        include_once '../includes/corejs.php';
    ?>
    <script src="../dist/js/app.min.js"></script>
    <script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.13.1/js/jquery.dataTables.js"></script>
	<!-- ================== END core-js ================== -->

    <script>
        $(document).ready(function() {
            $('#myTable').DataTable({
                "lengthMenu": [[3, 6, 9, 12, -1], [3, 6, 9, 12, "All"]]
            });
        } );
    </script>
</body>