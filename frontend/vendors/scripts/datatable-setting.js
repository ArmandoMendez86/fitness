$("document").ready(function () {
  $(".data-table").DataTable({
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
  });

  $(".data-table-export").DataTable({
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
    /* order: [[7, "desc"]], */
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

  $("#tabDetalleMembresias").DataTable({
    scrollCollapse: true,
    autoWidth: false,
    responsive: true,
    columnDefs: [
      {
        targets: "datatable-nosort",
        orderable: false,
      },
    ],
    dom: "Bfrtp",
    buttons: ["copy", "csv", "pdf", "print"],
    ajax: {
      url: "backend/venta_membresias/controladores/venta_membresia.controlador.php?uri=detallesmembresias",
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
    /* order: [[7, "desc"]], */
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
        data: "tipo",
      },
      {
        data: "fecha_inicio",
        render: function (data, type, row) {
          if (type == "display") {
            return moment(data).format("DD/MM/YY hh:mm A");
          }
          return data;
        },
      },
      {
        data: "fecha_fin",
        render: function (data, type, row) {
          if (type == "display") {
            return moment(data).format("DD/MM/YY hh:mm A");
          }
          return data;
        },
      },
      {
        data: "precio",
      },
    ],
    footerCallback: function (row, data, start, end, display) {
      let api = this.api();
  
      let total = api
        .column(8, { page: "current" })
        .data()
        .reduce(function (a, b) {
          // Convertir a número, o usar 0 si no es un número
          const valorA = parseFloat(a) || 0;
          const valorB = parseFloat(b) || 0;
          return valorA + valorB;
        }, 0);
  
      let formato = total.toLocaleString("es-MX", {
        style: "currency",
        currency: "MXN",
      });
      $(api.column(8).footer()).html(
        "<p style='width:7rem;margin:0 auto;font-size:1rem;'>" +
          formato +
          "</p>"
      );
    },
  });

  var table = $(".select-row").DataTable();
  $(".select-row tbody").on("click", "tr", function () {
    if ($(this).hasClass("selected")) {
      $(this).removeClass("selected");
    } else {
      table.$("tr.selected").removeClass("selected");
      $(this).addClass("selected");
    }
  });

  var multipletable = $(".multiple-select-row").DataTable();
  $(".multiple-select-row tbody").on("click", "tr", function () {
    $(this).toggleClass("selected");
  });
  var table = $(".checkbox-datatable").DataTable({
    scrollCollapse: true,
    autoWidth: false,
    responsive: true,
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
    columnDefs: [
      {
        targets: 0,
        searchable: false,
        orderable: false,
        className: "dt-body-center",
        render: function (data, type, full, meta) {
          return (
            '<div class="dt-checkbox"><input type="checkbox" name="id[]" value="' +
            $("<div/>").text(data).html() +
            '"><span class="dt-checkbox-label"></span></div>'
          );
        },
      },
    ],
    order: [[1, "asc"]],
  });

  $("#example-select-all").on("click", function () {
    var rows = table.rows({ search: "applied" }).nodes();
    $('input[type="checkbox"]', rows).prop("checked", this.checked);
  });

  $(".checkbox-datatable tbody").on(
    "change",
    'input[type="checkbox"]',
    function () {
      if (!this.checked) {
        var el = $("#example-select-all").get(0);
        if (el && el.checked && "indeterminate" in el) {
          el.indeterminate = true;
        }
      }
    }
  );
});
