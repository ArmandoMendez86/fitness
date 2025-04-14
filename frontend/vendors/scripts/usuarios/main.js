let tabUsuarios = $(".tabUsuarios").DataTable({
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
    url: "backend/usuarios/controladores/usuarios.controlador.php?uri=usuarios",
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
  order: [[6, "desc"]],
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
      data: "rol",
    },
    {
      data: "registro",
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
const tablaUsuarios = document.querySelector("#tabUsuarios");

/* Formulario clientes */
const formularioUsuarios = document.querySelector("#formUsuarios");
const nuevoUsuario = document.querySelector("#nuevoUsuario");
const btnCancelarUsuario = document.querySelector("#cancelarNuevoUsuario");

/* Boton de modal nuevo cliente */
const ModalNuevoUsuario = document.querySelector("#btnModalNuevoUsuario");

/* Datos para enviar */
let data = {};

/* Eventos */

tablaUsuarios.addEventListener("click", (e) => {
  let editar = e.target.closest(".editar");
  let eliminar = e.target.closest(".eliminar");

  if (editar) {
    let row = editar.closest("tr");
    let rowData = $("#tabUsuarios").DataTable().row(row).data();
    for (const key in rowData) {
      if (rowData.hasOwnProperty(key)) {
        const input = document.getElementById(key);

        if (input) {
          input.value = rowData[key];
        }
      }
    }
    document.querySelector("#myLargeModalLabel").textContent = "Editar Usuario";
  }
  if (eliminar) {
    let row = eliminar.closest("tr");
    let rowData = $("#tabUsuarios").DataTable().row(row).data();
    data.uri = "eliminarusuario";
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
        enviarDataUsuario(data).then((response) => {
          if (response.status == "ok") {
            tabUsuarios.ajax.reload(null, true);
          }
        });
      }
    });
  }
});

ModalNuevoUsuario.addEventListener("click", () => {
  formularioUsuarios.reset();
  document.querySelector("#myLargeModalLabel").textContent = "Agregar Usuario";
  //console.log("nuevo");
});

nuevoUsuario.addEventListener("click", handleAgregarUsuario);
btnCancelarUsuario.addEventListener("click", hanldeCancelarAgregarUsuario);

//Fuciones
async function handleAgregarUsuario() {
  // console.log("guardando...");
  const formaData = new FormData(formularioUsuarios);
  formaData.forEach((valor, clave) => {
    data[clave] = valor.trim().toLowerCase();
  });

  if (data.nombre == "" || data.apellido == "" || data.rol == "") return;

  if (data.id != "") {
    data.uri = "actualizarusuario";
  } else {
    data.uri = "verificarusuario";
    let existe = await verificarUsuario(data);

    if (existe.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El usuario ya existe!",
      });
      return;
    } else {
      data.uri = "crearusuario";
      data.registro = moment().format("YYYY-MM-DD h:mm:ss");
    }
  }

  let confirmado = await enviarDataUsuario(data);
  if (confirmado.status == "ok") {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Actualizando registros",
      showConfirmButton: false,
      timer: 1500,
    });
    formularioUsuarios.reset();
    tabUsuarios.ajax.reload(null, true);
    $("#Medium-modal").modal("hide");
    for (let key in data) {
      delete data[key];
    }
    console.log(data);
  }
}

function hanldeCancelarAgregarUsuario() {
  formularioUsuarios.reset();
}

async function enviarDataUsuario(data) {
  try {
    const agregarUsuario = await fetch(
      "backend/usuarios/controladores/usuarios.controlador.php",
      {
        method: "POST",
        body: JSON.stringify([data]),
      }
    );
    const respuesta = await agregarUsuario.json();
    if (respuesta.status == "ok") {
      return { status: "ok" };
    }
  } catch (error) {
    console.log("Error en la solicitud: " + error);
  }
}

async function verificarUsuario(data) {
  try {
    const usuario = await fetch(
      "backend/usuarios/controladores/usuarios.controlador.php",
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
