<?php
include_once __DIR__.'/../models/Crud.class.php';
if(isset($_POST['type'])){
    // form validation
    if($_POST['type'] == 'read'){
        $categories = $crud->read('categories');
        // xss clean
        foreach ($categories as $key => $value) {
            $categories[$key]['name'] = htmlspecialchars($categories[$key]['name']);
        }
        echo json_encode($categories);
        exit();
    }
    else if($_POST['type'] == 'readSingle'){
        $id = $_POST['id'];
        $category = $crud->read('categories', '*', null, null, "id = $id");
        echo json_encode($category);
        exit();
    }
    else if($_POST['type'] == 'create'){
        if (empty($_POST['categoryName'])) {
            $error['error']['categoryName'] = 'Please enter a category name.';
            echo json_encode($error);
            exit();
        }
        $category = $_POST['categoryName'];
        $crud->create('categories', ['name' => $category]);
    }
    else if($_POST['type'] == 'update'){
        if (empty($_POST['categoryName'])) {
            $error['error']['categoryName'] = 'Please enter a category name.';
            echo json_encode($error);
            exit();
        }
        $id = $_POST['id'];
        $category = $_POST['categoryName'];
        echo $crud->update('categories',['name' => $category],"id = $id");
    }
    else if($_POST['type'] == 'delete'){
        $id = $_POST['id'];
        echo $crud->delete('categories', "id = $id");
    }
}

