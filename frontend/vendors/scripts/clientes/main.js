/* Variables */
const tablaClientes = document.querySelector("#tabClientes");

/* Formulario clientes */
const formularioClientes = document.querySelector("#formClientes");
const nuevoCliente = document.querySelector("#nuevoCliente");
const btnCancelarCliente = document.querySelector("#cancelarNuevoCliente");

/* Boton de modal nuevo cliente */
const ModalNuevoCliente = document.querySelector("#btnModalNuevoCliente")

/* Datos para enviar */
const data = {};

/* Eventos */

tablaClientes.addEventListener("click", (e) => {
  let editar = e.target.closest(".editar");
  let eliminar = e.target.closest(".eliminar");

  if (editar) {
    let row = editar.closest("tr");
    let rowData = $("#tabClientes").DataTable().row(row).data();
    for (const key in rowData) {
      if (rowData.hasOwnProperty(key)) {
        const input = document.getElementById(key);

        if (input) {
          input.value = rowData[key];
        }
      }
    }
  }
  if (eliminar) {
    console.log("contienen la clase eliminar");
  }
});


ModalNuevoCliente.addEventListener("click", ()=>{
  formularioClientes.reset()
})
nuevoCliente.addEventListener("click", handleAgregarCliente);
btnCancelarCliente.addEventListener("click", hanldeCancelarAgregarCliente);

//Fuciones
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
