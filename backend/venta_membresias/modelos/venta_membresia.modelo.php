<?php
include_once '../../config/database.php';

class VentaMembresiaModelo
{
    private $pdo;

    public function __construct()
    {
        $this->pdo = Database::getInstance()->getPDO();
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
