<?php

include_once '../modelos/clientes.modelo.php';

class ClientesControlador
{
    private $clientes;

    public function __construct()
    {
        $this->clientes = new ClientesModelo();
    }

    public function obtenerClientes()
    {
        $clientes = $this->clientes->obtenerClientes();
        echo json_encode(['data' => $clientes]);
    }

    public function verificarCliente($data)
    {
        $clientes = $this->clientes->verificarCliente($data);
        echo json_encode(['data' => $clientes]);
    }

    public function crearCliente($data)
    {
        $this->clientes->crearCliente($data);
        echo json_encode(['status' => 'ok']);
    }

   
 /*    public function clientesActivos()
    {
        $clientesActivos = $this->clientes->clientesActivos();
        echo json_encode(['data' => $clientesActivos]);
    } */

  /*   public function update($data)
    {
        $this->clientes->update($data['id'], $data['nombre'], $data['correo'], $data['telefono'], $data['estado']);
        echo json_encode(['status' => 'ok']);
    } */

    public function delete($id)
    {
        $this->clientes->delete($id);
        echo json_encode(['status' => 'ok']);
    }
}



// Manejo de la solicitud HTTP
$method = $_SERVER['REQUEST_METHOD'];

$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);

$uri = $_GET['uri'] ?? ''; // Puedes usar una ruta específica si tu sistema la pasa como query string

$controller = new ClientesControlador();

switch ($method) {

    case 'GET':
        if ($uri === 'clientes') {
            $controller->obtenerClientes();
            break;
        }
      /*   if ($uri === 'clientes_act') {
            $controller->clientesActivos();
            break;
        } */

    case 'POST':
      /*   if ($data[0]['uri'] === 'actualizarcliente') {
            unset($data['uri']);
            $controller->update($data);
            break;
        } */

        if ($data[0]['uri'] === 'crearcliente' ) {
            $controller->crearCliente($data);
            break;
        }

        if ($data[0]['uri'] === 'verificarcliente' ) {
            $controller->verificarCliente($data);
            break;
        }

       /*  if ($data['uri'] === 'eliminar' && isset($data['id'])) {
            unset($data['uri']);
            $id = $data['id'];
            $controller->delete($id);
            break;
        } */

        // Si no se cumple ninguna de las anteriores, error
        http_response_code(400);
        echo json_encode(['error' => 'Solicitud POST no válida']);
        break;


    default:
        http_response_code(405);
        echo json_encode(['error' => 'Método no permitido']);
        break;
}
