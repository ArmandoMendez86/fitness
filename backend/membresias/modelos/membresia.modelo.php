<?php
include_once '../../config/database.php';

class MembresiaModelo
{
    private $pdo;

    public function __construct()
    {
        $this->pdo = Database::getInstance()->getPDO();
    }

    public function obtenerMembresias()
    {
        $sql = "SELECT * FROM membresias";
        $stmt = $this->pdo->query($sql);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }


  /*   public function create($data)
    {
        $sql = "INSERT INTO clientes (nombre, correo, telefono, estado) VALUES (:nombre, :correo, :telefono, :estado)";
        $stmt = $this->pdo->prepare($sql);

        foreach ($data as $registro) {
            $stmt->execute([
                ':nombre' => $nombre,
                ':correo' => $correo,
                ':telefono' => $telefono,
                ':estado' => $estado
            ]);
        }


       
    } */
}
