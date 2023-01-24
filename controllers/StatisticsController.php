<?php
include_once __DIR__.'/../models/Crud.class.php';


$stats = new CRUD;

$totalArticles = $stats->read('articles', 'COUNT(*) as total')[0]['total'];

$totalCategories = $stats->read('categories', 'COUNT(*) as total')[0]['total'];

// get users with number of articles
$allDevs = $stats->read('admins', 'admins.id, admins.username, COUNT(articles.id) as total', ['articles'], ['admins.id = articles.admin_id'], null, 'total DESC', 5);