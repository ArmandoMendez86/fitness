<?php

class Database
{
    private static $instance = null;
    private $pdo;

    private function __construct()
    {
        $host = 'localhost';
        $dbname = 'gym';
        $username = 'root';
        $password = 'linux';
        /* $host = 'localhost';
        $dbname = 'u916760597_parking';
        $username = 'u916760597_parking';
        $password = 'Parking861215#-'; */

        try {
            $this->pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // Modo de errores
        } catch (PDOException $e) {
            echo "Conexión fallida: " . $e->getMessage();
        }
    }

    public static function getInstance()
    {
        if (self::$instance === null) {
            self::$instance = new Database();
        }
        return self::$instance;
    }

    public function getPDO()
    {
        return $this->pdo;
    }
}
