<?php
include_once __DIR__.'/../config/db.php';

class Users extends Database {
    private $id;
    private $email;
    private $password;
    private $fullName;
    private $conn;
    public function __construct() {
        $this->conn = parent::__construct();
    }

    public function register($email, $password, $fullName) {
        $this->email = $email;
        $this->password = $password;
        $this->fullName = $fullName;
        //check if email already exists
        $sql = "SELECT * FROM admins WHERE email = :email";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':email', $this->email);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($result) {
            $_SESSION['emailError'] = 'Email already exists.';
        } else {
            $sql = "INSERT INTO admins (email, password, username) VALUES (:email, :password, :username)";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':email', $this->email);
            $stmt->bindParam(':password', $this->password);
            $stmt->bindParam(':username', $this->fullName);
            $stmt->execute();
            $_SESSION['registerSuccess'] = 'Registration successful. Please login.';
            header('Location: /DevCulture.to/views/login.php');
        }

        
    }
    public function login($email, $password) {
        $this->email = $email;
        $this->password = $password;
        $sql = "SELECT * FROM admins WHERE email = :email";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':email', $this->email);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($result) {
            if (password_verify($this->password, $result['password'])) {
                $_SESSION['id'] = $result['id'];
                $_SESSION['email'] = $result['email'];
                $_SESSION['fullName'] = $result['username'];
                header('Location: /DevCulture.to/views/dashboard.php');
            } else {
                $_SESSION['passwordError'] = 'Wrong password.';
            }
        } else {
            $_SESSION['emailError'] = 'This email does not exist.';
        }
    }
    public function logout() {
        session_destroy();
        header('Location: /DevCulture.to/index.php');
    }
}