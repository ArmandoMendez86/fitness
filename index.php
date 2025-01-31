<?php

//include 'vistas/incluir/auth.php';

// Configurar cabeceras para evitar problemas con caracteres
header("Content-Type: text/html; charset=UTF-8");

// Definir la ruta base (sin la barra al final)
$baseDir = '/fitness';

// Obtener la URL solicitada
$requestUri = trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');

// Verificar si la ruta incluye el directorio base
if (strpos($requestUri, trim($baseDir, '/')) === 0) {
    // Quitar el directorio base de la URL
    $requestUri = substr($requestUri, strlen(trim($baseDir, '/')));
}
$requestUri = trim($requestUri, '/'); // Normalizar la ruta


// Definir las rutas disponibles y sus vistas asociadas
$routes = [

    'clientes' => 'frontend/vistas/clientes.php',
    'configuracion' => 'frontend/vistas/configuracion.php',
    'membresias' => 'frontend/vistas/membresias.php',
    'venta_membresia' => 'frontend/vistas/venta_membresia.php',
    'detalle_membresias' => 'frontend/vistas/detalle_membresias.php',
   

];

// Verificar si la ruta existe en el arreglo
if (array_key_exists($requestUri, $routes)) {
    require_once $routes[$requestUri];
} else {
    // Si la ruta no existe, mostrar página de error
    http_response_code(404);
    require_once 'vistas/404.php';
}
