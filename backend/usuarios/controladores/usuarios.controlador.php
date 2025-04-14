<?php

include_once '../modelos/usuarios.modelo.php';

class UsuariosControlador
{
    private $usuarios;

    public function __construct()
    {
        $this->usuarios = new UsuariosModelo();
    }

    public function obtenerUsuarios()
    {
        $usuarios = $this->usuarios->obtenerUsuarios();
        echo json_encode(['data' => $usuarios]);
    }

    public function verificarUsuario($data)
    {
        $usuarios = $this->usuarios->verificarUsuario($data);
        echo json_encode(['data' => $usuarios]);
    }

    public function crearUsuario($data)
    {
        $this->usuarios->crearUsuario($data);
        echo json_encode(['status' => 'ok']);
    }


    public function actualizarUsuario($data)
    {
        $this->usuarios->actualizarUsuario($data);
        echo json_encode(['status' => 'ok']);
    }

    public function delete($data)
    {
        $this->usuarios->delete($data);
        echo json_encode(['status' => 'ok']);
    }
}


$method = $_SERVER['REQUEST_METHOD'];

$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);

$uri = $_GET['uri'] ?? '';

$controller = new UsuariosControlador();

switch ($method) {

    case 'GET':
        if ($uri === 'usuarios') {
            $controller->obtenerUsuarios();
            break;
        }

    case 'POST':


        if ($data[0]['uri'] === 'crearusuario') {
            $controller->crearUsuario($data);
            break;
        }

        if ($data[0]['uri'] === 'verificarusuario' ) {
            $controller->verificarUsuario($data);
            break;
        }

        if ($data[0]['uri'] === 'actualizarusuario') {
            $controller->actualizarUsuario($data);
            break;
        }

        if ($data[0]['uri'] === 'eliminarusuario') {
            $controller->delete($data);
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
