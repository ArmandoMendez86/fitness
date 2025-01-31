/* Variables */
const listaClientes = document.querySelector("#selectClientes");
const listaMembresias = document.querySelector("#selectMembresias");

document.addEventListener("DOMContentLoaded", () => {
  cargarClientes();
  cargarMembresias();
});

async function cargarClientes() {
  const clientes = await obtenerClientes();
  clientes.forEach((cliente) => {
    let option = document.createElement("option");
    option.value = cliente.id;
    option.textContent = cliente.nombre;
    listaClientes.appendChild(option);
  });
}

async function cargarMembresias() {
  const membresias = await obtenerMembresias();
  membresias.forEach((membresia) => {
    let option = document.createElement("option");
    option.value = membresia.id;
    option.textContent = membresia.tipo;
    listaMembresias.appendChild(option);
  });
}

async function obtenerClientes() {
  try {
    const clientes = await fetch(
      "backend/clientes/controladores/clientes.controlador.php?uri=clientes"
    );
    const respuesta = await clientes.json();
    return respuesta.data;
  } catch (error) {
    console.error("Error en alguna de las peticiones:", error);
  }
}
async function obtenerMembresias() {
  try {
    const membresias = await fetch(
      "backend/membresias/controladores/membresia.controlador.php?uri=membresias"
    );
    const respuesta = await membresias.json();
    return respuesta.data;
  } catch (error) {
    console.error("Error en alguna de las peticiones:", error);
  }
}
