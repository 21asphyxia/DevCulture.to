<?php
include_once __DIR__.'/../models/Crud.class.php';
if(isset($_POST['type'])){
    // form validation
    if($_POST['type'] == 'read'){
        $articles = $crud->read('articles', 'articles.id, articles.title, articles.description, admins.username as author, categories.name as category', ['admins','categories'], ['articles.admin_id = admins.id', 'articles.category_id = categories.id']);
        // xss clean
        foreach ($articles as $key => $value) {
            $articles[$key]['title'] = htmlspecialchars($articles[$key]['title']);
            $articles[$key]['description'] = htmlspecialchars($articles[$key]['description']);
            $articles[$key]['author'] = htmlspecialchars($articles[$key]['author']);
            $articles[$key]['category'] = htmlspecialchars($articles[$key]['category']);
        }
        echo json_encode($articles);
        exit();
    }
    else if($_POST['type'] == 'readSingle'){
        $id = $_POST['id'];
        $article = $crud->read('articles', 'id, title, description, category_id as category', null, null, "id = $id");
        echo json_encode($article);
        exit();
    }
    else if($_POST['type'] == 'create'){
        if (empty($_POST['title'])) {
            $error['error']['articleTitle'] = 'Please enter a title name.';
        }
        if (empty($_POST['description'])) {
            $error['error']['articleDescription'] = 'Please enter a description.';
        }
        if (empty($_POST['category'])) {
            $error['error']['articleCategory'] = 'Please enter a category.';
        }
        if (!empty($error)) {
            echo json_encode($error);
            exit();
        }
        $crud->create('articles', ['title' => $_POST['title'], 'description' => $_POST['description'], 'category_id' => $_POST['category'], 'admin_id' => $_SESSION['id']]);
    }
    else if($_POST['type'] == 'update'){
        if (empty($_POST['title'])) {
            $error['error']['articleTitle'] = 'Please enter a title name.';
        }
        if (empty($_POST['description'])) {
            $error['error']['articleDescription'] = 'Please enter a description.';
        }
        if (empty($_POST['category'])) {
            $error['error']['articleCategory'] = 'Please enter a category.';
        }
        if (!empty($error)) {
            echo json_encode($error);
            exit();
        }
        $id = $_POST['id'];
        $article = ['title' => $_POST['title'], 'description' => $_POST['description'], 'category_id' => $_POST['category']];
        echo $crud->update('articles',$article,"id = $id");
    }
    else if($_POST['type'] == 'delete'){
        $id = $_POST['id'];
        echo $crud->delete('articles', "id = $id");
    }
}