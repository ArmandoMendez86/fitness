<?php
include_once '../../config/database.php';

class ClientesModelo
{
    private $pdo;

    public function __construct()
    {
        $this->pdo = Database::getInstance()->getPDO();
    }

    public function obtenerClientes()
    {
        $sql = "SELECT * FROM clientes";
        $stmt = $this->pdo->query($sql);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function create($nombre, $correo, $telefono, $estado)
    {
        $sql = "INSERT INTO clientes (nombre, correo, telefono, estado) VALUES (:nombre, :correo, :telefono, :estado)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([
            ':nombre' => $nombre,
            ':correo' => $correo,
            ':telefono' => $telefono,
            ':estado' => $estado
        ]);
    }




    public function clientesActivos()
    {
        $sql = "SELECT * FROM clientes WHERE estado = 1";
        $stmt = $this->pdo->query($sql);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }


    public function update($id, $nombre, $correo, $telefono, $estado)
    {
        $sql = "UPDATE clientes SET nombre = :nombre, correo = :correo, telefono = :telefono, estado = :estado WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([
            ':id' => $id,
            ':nombre' => $nombre,
            ':correo' => $correo,
            ':telefono' => $telefono,
            ':estado' => $estado
        ]);
    }

    public function delete($id)
    {
        $sql = "DELETE FROM clientes WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([':id' => $id]);
    }
}
