/* Variables */
const tablaClientes = document.querySelector("#tabClientes");
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
