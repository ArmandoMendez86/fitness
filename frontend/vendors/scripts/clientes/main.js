let tablaClientesDatatable = $(".data-table-export").DataTable({
  scrollCollapse: true,
  autoWidth: false,
  responsive: true,
  columnDefs: [
    {
      targets: "datatable-nosort",
      orderable: false,
    },
  ],
  lengthMenu: [
    [10, 25, 50, -1],
    [10, 25, 50, "All"],
  ],
  language: {
    info: "_START_-_END_ of _TOTAL_ entries",
    searchPlaceholder: "Search",
    paginate: {
      next: '<i class="ion-chevron-right"></i>',
      previous: '<i class="ion-chevron-left"></i>',
    },
  },
  dom: "Bfrtp",
  buttons: ["copy", "csv", "pdf", "print"],
  ajax: {
    url: "backend/clientes/controladores/clientes.controlador.php?uri=clientes",
    type: "GET",
    dataType: "json",
  },
  language: {
    url: "frontend/vendors/scripts/mx.json",
  },
  lengthMenu: [
    [10, 15, 20, -1],
    [10, 15, 20, "Todos"],
  ],
  order: [[5, "desc"]],
  columns: [
    {
      data: "id",
      visible: false,
    },
    {
      data: "nombre",
      visible: true,
    },
    {
      data: "apellido",
    },
    {
      data: "email",
    },
    {
      data: "telefono",
    },
    {
      data: "fecha_registro",
      render: function (data, type, row) {
        if (type == "display") {
          return moment(data).format("DD/MM/YY hh:mm A");
        }
        return data;
      },
    },
    {
      data: null,
      className: "dt-center",
      render: function (data, type, row) {
        // Agregar función render
        return `<div class="d-flex justify-content-center">
        <button title="Ticket" type="button" class="editar btn btn-warning btn-sm mr-2" data-toggle="modal" data-target="#Medium-modal"><i class="fa fa-edit"></i></button>
        <button title="Eliminar" type="button" class="eliminar btn btn-danger btn-sm"><i class="fa fa-times"></i></button>
      </div>`;
      },
      orderable: false,
    },
  ],
});

/* Variables */
const tablaClientes = document.querySelector("#tabClientes");

/* Formulario clientes */
const formularioClientes = document.querySelector("#formClientes");
const nuevoCliente = document.querySelector("#nuevoCliente");
const btnCancelarCliente = document.querySelector("#cancelarNuevoCliente");

/* Boton de modal nuevo cliente */
const ModalNuevoCliente = document.querySelector("#btnModalNuevoCliente");

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
    document.querySelector("#myLargeModalLabel").textContent = "Editar Cliente";
  }
  if (eliminar) {
    let row = eliminar.closest("tr");
    let rowData = $("#tabClientes").DataTable().row(row).data();
    data.uri = "eliminarcliente";
    data.id = rowData.id;

    Swal.fire({
      title: "Esta seguro?",
      text: "Esto no se podra revertir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si!",
      cancelButtonText: "No!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Eliminado!",
          text: "Registro eliminado.",
          icon: "success",
        });

        enviarDataCliente(data).then((response) => {
          if (response.status == "ok") {
            tablaClientesDatatable.ajax.reload(null, true);
          }
        });
      }
    });
  }
});

ModalNuevoCliente.addEventListener("click", () => {
  formularioClientes.reset();
  document.querySelector("#myLargeModalLabel").textContent = "Agregar Cliente";
  //console.log("nuevo");
});

nuevoCliente.addEventListener("click", handleAgregarCliente);
btnCancelarCliente.addEventListener("click", hanldeCancelarAgregarCliente);

//Fuciones
async function handleAgregarCliente() {
  // console.log("guardando...");
  const formaData = new FormData(formularioClientes);
  formaData.forEach((valor, clave) => {
    data[clave] = valor.trim();
  });

  if (data.nombre == "" || data.apellido == "") return;

  if (data.id != "") {
    data.uri = "actualizarcliente";
  } else {
    data.uri = "verificarcliente";
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
    }
  }

  let confirmado = await enviarDataCliente(data);
  if (confirmado.status == "ok") {
    tablaClientesDatatable.ajax.reload(null, true);
    $("#Medium-modal").modal("hide");
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
        title: "Actualizando registros",
        showConfirmButton: false,
        timer: 1500,
      });
      formularioClientes.reset();
      data = {};
      return { status: "ok" };
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
    //console.log(respuesta);
    return respuesta.data;
  } catch (error) {}
}

/* async function dibujarTabla() {
  try {
    const clientes = await fetch(
      "backend/clientes/controladores/clientes.controlador.php?uri=clientes"
    );
    const respuesta = await clientes.json();
    return respuesta;
    //console.log(respuesta);
  } catch (error) {
    console.log("Error en la solicitud: " + error);
  }
} */
