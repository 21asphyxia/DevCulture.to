<?php

$pageTitle = 'Articles';
include_once '../includes/head.php';
include_once '../controllers/ArticlesController.php';
(!isset($_SESSION['id'])) ? header('Location: login.php') : NULL;
?>

<body class="crudPage" id="articles">
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
                <span class="fw-bold ps-3">All Articles</span>
                <button class="btn rounded px-3 me-3" id="addButton"><i class="fa fa-plus pe-3"></i>Add Article</button>
            </div>
            <div class="table-responsive mt-3">
                <table class="table table-borderless">
                    <thead>
                        <tr>
                            <th class="text-secondary fs-7 text-start" scope="col">#</th>
                            <th class="text-secondary fs-7 text-center" scope="col"></th>
                            <th class="text-secondary fs-7 text-center" scope="col">Title</th>
                            <th class="text-secondary fs-7 text-center td-truncate" scope="col">Description</th>
                            <th class="text-secondary fs-7 text-center" scope="col">Category</th>
                            <th class="text-secondary fs-7 text-center" scope="col">Author</th>
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
					<h5 id="modalTitle" class="modal-title">Add Article</h5>
					<button type="button" id="close-button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<input type="hidden" name="articleId" id="articleId" >
					<div class="mb-3">
						<input type="text" name="articleTitle" class="form-control" id="articleTitle" placeholder="Article Title" required>
					</div>
                    <div class="mb-3">
                        <select name="articleCategory" class="form-select" id="articleCategory" required></select>
                    </div>
                    <div class="mb-3">
                        <textarea name="articleDescription" class="form-control" id="articleDescription" placeholder="Article Content" required></textarea>
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
	<!-- ================== END core-js ================== -->
</body>

