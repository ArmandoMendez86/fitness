<?php

include_once '../modelos/clientes.modelo.php';

class VentaMembresiaControlador
{
    private $ventaMembresia;

    public function __construct()
    {
        $this->ventaMembresia = new VentaMembresiaModelo();
    }

    public function ventaMembresia($data){

    }
}



// Manejo de la solicitud HTTP
$method = $_SERVER['REQUEST_METHOD'];

$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);

$uri = $_GET['uri'] ?? ''; // Puedes usar una ruta específica si tu sistema la pasa como query string

$controller = new VentaMembresiaControlador();

switch ($method) {

    case 'GET':
       /*  if ($uri === 'clientes') {
            $controller->obtenerClientes();
            break;
        }
        if ($uri === 'clientes_act') {
            $controller->clientesActivos();
            break;
        } */

    case 'POST':

        if ($data['uri'] === 'vendermembresia') {
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
