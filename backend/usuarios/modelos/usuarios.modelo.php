<?php
include_once '../../config/database.php';

class UsuariosModelo
{
    private $pdo;

    public function __construct()
    {
        $this->pdo = Database::getInstance()->getPDO();
    }

    public function obtenerUsuarios()
    {
        $sql = "SELECT * FROM empleados";
        $stmt = $this->pdo->query($sql);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }


    public function crearUsuario($data)
    {
        $password_hash = password_hash($data[0]["password"], PASSWORD_DEFAULT);
        $sql = "INSERT INTO empleados (nombre, apellido, email, telefono, rol, password, registro) VALUES (:nombre, :apellido, :email, :telefono, :rol, :password, :registro)";
        $stmt = $this->pdo->prepare($sql);

        foreach ($data as $registro) {
            $stmt->execute([
                ':nombre' => $registro['nombre'],
                ':apellido' => $registro['apellido'],
                ':email' => $registro['email'],
                ':telefono' => $registro['telefono'],
                ':rol' => $registro['rol'],
                ':password' => $password_hash,
                ':registro' => $registro['registro'],
            ]);
        }
    }

    public function verificarUsuario($data)

    {
        $email = $data[0]['email'];
        $telefono = $data[0]['telefono'];

        $sql = "SELECT * FROM empleados WHERE email = '$email' OR  telefono = '$telefono'";
        $stmt = $this->pdo->query($sql);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }


    public function actualizarUsuario($data)
    {
        if ($data[0]['password'] != "") {
            $sql = "UPDATE empleados SET nombre = :nombre, apellido = :apellido, email = :email, telefono = :telefono, rol = :rol, password = :password WHERE id = :id";
            $stmt = $this->pdo->prepare($sql);

            foreach ($data as $registro) {
                $stmt->execute([
                    ':id' => $registro['id'],
                    ':nombre' => $registro['nombre'],
                    ':apellido' => $registro['apellido'],
                    ':email' => $registro['email'],
                    ':telefono' => $registro['telefono'],
                    ':rol' => $registro['rol'],
                    ':password' => $registro['password'],
                ]);
            }
        } else {
            $sql = "UPDATE empleados SET nombre = :nombre, apellido = :apellido, email = :email, telefono = :telefono, rol = :rol WHERE id = :id";
            $stmt = $this->pdo->prepare($sql);

            foreach ($data as $registro) {
                $stmt->execute([
                    ':id' => $registro['id'],
                    ':nombre' => $registro['nombre'],
                    ':apellido' => $registro['apellido'],
                    ':email' => $registro['email'],
                    ':telefono' => $registro['telefono'],
                    ':rol' => $registro['rol'],
                ]);
            }
        }
    }

    public function delete($data)
    {
        $sql = "DELETE FROM empleados WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);

        foreach ($data as $registro) {
            $stmt->execute([':id' => $registro['id']]);
        }
    }
}
