<?php
include_once '../../config/database.php';

class VentaMembresiaModelo
{
    private $pdo;

    public function __construct()
    {
        $this->pdo = Database::getInstance()->getPDO();
    }

    public function detalleMembresias()
    {
        $sql = "SELECT cm.id, c.nombre, c.apellido, c.email, c.telefono, m.tipo, cm.fecha_inicio, cm.fecha_fin, m.precio FROM clientes_membresias AS cm
        INNER JOIN clientes AS c ON c.id = cm.id_cliente
        INNER JOIN membresias AS m ON m.id = cm.id_membresia";
        $stmt = $this->pdo->query($sql);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function ventaMembresia($data)
    {
        $sql = "INSERT INTO clientes_membresias (id_cliente, id_membresia, fecha_inicio, fecha_fin) VALUES (:id_cliente, :id_membresia, :fecha_inicio, :fecha_fin)";
        $stmt = $this->pdo->prepare($sql);

        foreach ($data as $registro) {
            $stmt->execute([
                ':id_cliente' => $registro['id_cliente'],
                ':id_membresia' => $registro['id_membresia'],
                ':fecha_inicio' => $registro['fecha_inicio'],
                ':fecha_fin' => $registro['fecha_fin']
            ]);
        }
    }
}
