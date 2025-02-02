/* Variables */
const listaClientes = document.querySelector("#id_cliente");
const listaMembresias = document.querySelector("#id_membresia");
const formularioClientes = document.querySelector("#formClientes");
const nuevoCliente = document.querySelector("#nuevoCliente");
const btnCancelarCliente = document.querySelector("#cancelarNuevoCliente");

const formularioVentaMembresia = document.querySelector("#formVentaMembresia");
const venderMembresiaBtn = document.querySelector("#ventaMembresia");
const cancelarVenta = document.querySelector("#cancelarVentaMembresia");
const data = {};

let arrayClientes = [];
let arrayMembresias = [];

/* Eventos */
document.addEventListener("DOMContentLoaded", () => {
  cargarClientes();
  cargarMembresias();
});

venderMembresiaBtn.addEventListener("click", handleVenderMembresia);
cancelarVenta.addEventListener("click", handleCancelarVentaMembresia);
nuevoCliente.addEventListener("click", handleAgregarCliente);
btnCancelarCliente.addEventListener("click", hanldeCancelarAgregarCliente);

/* Funciones */
async function cargarClientes() {
  listaClientes.innerHTML = "";
  const clientes = await obtenerClientes();
  let defauloption = document.createElement("option");
  defauloption.value = "";
  defauloption.textContent = "Elige al cliente";

  listaClientes.appendChild(defauloption);

  clientes.forEach((cliente) => {
    let option = document.createElement("option");
    option.value = cliente.id;
    option.textContent = cliente.nombre;
    listaClientes.appendChild(option);
  });

  arrayClientes = clientes;
}

async function cargarMembresias() {
  const membresias = await obtenerMembresias();
  let defauloption = document.createElement("option");
  defauloption.value = "";
  defauloption.textContent = "Elige tipo de membresia";
  listaMembresias.appendChild(defauloption);
  membresias.forEach((membresia) => {
    let option = document.createElement("option");
    option.value = membresia.id;
    option.textContent = membresia.tipo;
    listaMembresias.appendChild(option);
  });

  arrayMembresias = membresias;
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

async function handleVenderMembresia() {
  const formaData = new FormData(formularioVentaMembresia);
  formaData.forEach((valor, clave) => {
    data[clave] = valor;
  });

  data.uri = "vendermembresia";
  const fechaInicio = moment().format("YYYY-MM-DDTHH:mm:ss");

  data.fecha_inicio = fechaInicio;

  let [membresia] = arrayMembresias.filter(
    (membresia) => membresia.id == data.id_membresia
  );

  let fechaFin = calcularFechaFinal(fechaInicio, membresia.duracion_dias);
  if (membresia.duracion_dias == 1) {
    fechaFin = fechaInicio;
  }
  data.fecha_fin = fechaFin;
  enviarDataVentaMembresia(data);
}

function handleCancelarVentaMembresia() {
  console.log("cancelando");
}

function calcularFechaFinal(fechaInicio, dias) {
  if (typeof dias !== "number" || isNaN(dias)) {
    throw new Error('El parámetro "dias" debe ser un número.');
  }

  const fechaFinal = moment(fechaInicio).add(dias, "days");
  return fechaFinal.format("YYYY-MM-DD h:mm:ss");
}

async function enviarDataVentaMembresia(data) {
  try {
    const hacerVentaMembresia = await fetch(
      "backend/venta_membresias/controladores/venta_membresia.controlador.php",
      {
        method: "POST",
        body: JSON.stringify([data]),
      }
    );

    const respuesta = await hacerVentaMembresia.json();
    if (respuesta.status == "ok") {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Venta realizada",
        showConfirmButton: false,
        timer: 1500,
      });

      $("#id_cliente").val(null).trigger("change");
      $("#id_membresia").val(null).trigger("change");
      document.getElementById("descuento").value = "0";
      data = {};
    }
  } catch (error) {
    console.log("Error en la solicitud: " + error);
  }
}

async function handleAgregarCliente() {
  const formaData = new FormData(formularioClientes);
  formaData.forEach((valor, clave) => {
    data[clave] = valor;
  });

  data.uri = "verificarcliente";

  if (data.nombre == "" || data.apellido == "") return;

  let existe = await verificarUsuario(data);
  if (existe.length > 0) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "El usuario ya existe!",
    });
    return;
  } else {
    data.uri = "crearcliente";
    enviarDataCliente(data);
  }
}

function hanldeCancelarAgregarCliente() {
  formularioClientes.reset();
}

async function enviarDataCliente(data) {
  try {
    const agregarCliente = await fetch(
      "backend/clientes/controladores/clientes.controlador.php",
      {
        method: "POST",
        body: JSON.stringify([data]),
      }
    );

    const respuesta = await agregarCliente.json();
    if (respuesta.status == "ok") {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Cliente agregado",
        showConfirmButton: false,
        timer: 1500,
      });

      formularioClientes.reset();
      document.getElementById("faq1").classList.remove("show");
      document.querySelector("#btnAcordion").classList.add("collapsed");
      data = {};
      cargarClientes();
    }
  } catch (error) {
    console.log("Error en la solicitud: " + error);
  }
}

async function verificarUsuario(data) {
  try {
    const usuario = await fetch(
      "backend/clientes/controladores/clientes.controlador.php",
      {
        method: "POST",
        body: JSON.stringify([data]),
      }
    );
    const respuesta = await usuario.json();
    return respuesta.data;
  } catch (error) {}
}
