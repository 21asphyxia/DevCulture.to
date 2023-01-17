<?php
session_start();

class Database {
    public function __construct() {
        return new PDO('mysql:host=localhost;dbname=culturedev', 'root', '');
    }
}