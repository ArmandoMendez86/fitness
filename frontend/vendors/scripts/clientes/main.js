document.addEventListener("DOMContentLoaded", obtenerClientes);

async function obtenerClientes() {
  try {
    const clientes = await fetch(
      "backend/clientes/controladores/clientes.controlador.php?uri=clientes"
    );
    const respuesta = await clientes.json();
    return respuesta.data
  } catch (error) {
    console.error("Error en alguna de las peticiones:", error);
  }
}
