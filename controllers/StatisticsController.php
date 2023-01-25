<?php
include_once __DIR__.'/../models/Crud.class.php';


$stats = new CRUD;

$totalArticles = $stats->read('articles', 'COUNT(*) as total')[0]['total'];

$totalCategories = $stats->read('categories', 'COUNT(*) as total')[0]['total'];

// get admins with number of articles
$allDevs = $stats->read('articles', "COUNT(*) as total, admins.username, admins.id", ['admins'], ['admins.id = articles.admin_id'], null, "total DESC", null, "admins.id");