<?php
include_once __DIR__.'/../config/db.php';

class CRUD extends Database {
    private $conn;
    public function __construct() {
        $this->conn = parent::__construct();
    }

    public function create($table, $data){
        $sql = "INSERT INTO $table SET ";
        $i = 1;
        foreach ($data as $key => $value) {
            if ($i == count($data)) {
                $sql .= "$key = :$key";
            } else {
                $sql .= "$key = :$key, ";
            }
            $i++;
        }
        $stmt = $this->conn->prepare($sql);
        foreach ($data as $key => $value) {
            $stmt->bindValue(":$key", $value);
        }
        $stmt->execute();
        return $this->conn->lastInsertId();
    }

    public function read($table, $where = null, $order = null, $limit = null) {
        $sql = "SELECT * FROM $table";
        if ($where) {
            $sql .= " WHERE $where";
        }
        if ($order) {
            $sql .= " ORDER BY $order";
        }
        if ($limit) {
            $sql .= " LIMIT $limit";
        }
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function update($table, $data, $where) {
        $sql = "UPDATE $table SET ";
        $i = 1;
        foreach ($data as $key => $value) {
            if ($i == count($data)) {
                $sql .= "$key = :$key";
            } else {
                $sql .= "$key = :$key, ";
            }
            $i++;
        }
        $sql .= " WHERE $where";
        $stmt = $this->conn->prepare($sql);
        foreach ($data as $key => $value) {
            $stmt->bindValue(":$key", $value);
        }
        $stmt->execute();
        return $stmt->rowCount();
    }

    public function delete($table, $where) {
        $sql = "DELETE FROM $table WHERE $where";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        return $stmt->rowCount();
    }
}