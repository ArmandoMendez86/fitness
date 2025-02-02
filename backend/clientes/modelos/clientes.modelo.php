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

    public function verificarCliente($data)

    {
        $email = $data[0]['email'];
        $telefono = $data[0]['telefono'];

        $sql = "SELECT * FROM clientes WHERE email = '$email' OR  telefono = '$telefono'";
        $stmt = $this->pdo->query($sql);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function crearCliente($data)
    {
        $sql = "INSERT INTO clientes (nombre, apellido, email, telefono) VALUES (:nombre, :apellido, :email, :telefono)";
        $stmt = $this->pdo->prepare($sql);

        foreach ($data as $registro) {
            $stmt->execute([
                ':nombre' => $registro['nombre'],
                ':apellido' => $registro['apellido'],
                ':email' => $registro['email'],
                ':telefono' => $registro['telefono'],
            ]);
        }
    }


    /*     public function clientesActivos()
    {
        $sql = "SELECT * FROM clientes WHERE estado = 1";
        $stmt = $this->pdo->query($sql);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    } */


    public function actualizarCliente($data)
    {
        $sql = "UPDATE clientes SET nombre = :nombre, apellido = :apellido, email = :email, telefono = :telefono WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);

        foreach ($data as $registro) {
            $stmt->execute([
                ':id' => $registro['id'],
                ':nombre' => $registro['nombre'],
                ':apellido' => $registro['apellido'],
                ':email' => $registro['email'],
                ':telefono' => $registro['telefono'],
            ]);
        }
    }

    public function delete($data)
    {
        $sql = "DELETE FROM clientes WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);

        foreach ($data as $registro) {
            $stmt->execute([':id' => $registro['id']]);
        }
    }
}
