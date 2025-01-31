<?php

include_once '../modelos/venta_membresia.modelo.php';

class VentaMembresiaControlador
{
    private $ventaMembresia;

    public function __construct()
    {
        $this->ventaMembresia = new VentaMembresiaModelo();
    }

    public function detalleMembresias()
    {
        $detalles = $this->ventaMembresia->detalleMembresias();
        echo json_encode(['data' => $detalles]);
    }
    
    public function ventaMembresia($data)
    {
        $this->ventaMembresia->ventaMembresia($data);
        echo json_encode(['status' => 'ok']);
    }
}

$method = $_SERVER['REQUEST_METHOD'];

$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);

$uri = $_GET['uri'] ?? '';

$controller = new VentaMembresiaControlador();

switch ($method) {

    case 'GET':
         if ($uri === 'detallesmembresias') {
            $controller->detalleMembresias();
            break;
        }
       /*  if ($uri === 'clientes_act') {
            $controller->clientesActivos();
            break;
        } */

    case 'POST':

        if ($data[0]['uri'] === 'vendermembresia') {
            $controller->ventaMembresia($data);
            break;
        }

        // Si no se cumple ninguna de las anteriores, error
        http_response_code(400);
        echo json_encode(['error' => 'Solicitud POST no válida']);
        break;


    default:
        http_response_code(405);
        echo json_encode(['error' => 'Método no permitido']);
        break;
}
