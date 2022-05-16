$(function () {
  creardatatable("#example1"); //tabla.- dashboard
});

// crear tabla
function creardatatable(nombretabla) {
  var tabla = $(nombretabla).dataTable({
    lengthChange: true,
    responsive: true,
    autoWidth: false,
    language: {
      decimal: "",
      emptyTable: "No hay información",
      info: "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
      infoEmpty: "Mostrando 0 to 0 of 0 Entradas",
      infoFiltered: "(Filtrado de _MAX_ total entradas)",
      infoPostFix: "",
      thousands: ",",
      lengthMenu: "Mostrar _MENU_ Entradas",
      loadingRecords: "Cargando...",
      processing: "Procesando...",
      search: "Buscar:",
      zeroRecords: "Sin resultados encontrados",
      paginate: {
        first: "Primero",
        last: "Ultimo",
        next: "Siguiente",
        previous: "Anterior",
      },
    },
    // lengthMenu: [
    //   [10, 25, 50, -1],
    //   [10, 25, 50, "All"],
    // ],
    lengthMenu: [[4], ["4"]],
    order: [[0, "asc"]],
  });
  return tabla;
}

function clickpuesto(string) {
  $.ajax({
    type: "POST",
    url: "/reclutamiento/mispostulaciones/publicacion_detalle",
    data: { codigo: string },
    beforeSend: function () {
      $("#div-00").html("");
      $("#div-00").append(
        "<div id='div-00'>\
            <div class='d-flex justify-content-center my-1'>\
                <div class='spinner-border' role='status' aria-hidden='true'></div>\
            </div>\
          </div>"
      );
    },
    success: function (res) {
      $("#div-00").html("");
      $("#div-00").append(res.data);
    },
  });

  if (screen.width < 850) {
    var dest = $("#div-00").offset().top;
    $("html, body").animate({ scrollTop: dest }, 300);
  }
}

function clickseguimiento(string) {
  $.ajax({
    type: "POST",
    url: "/reclutamiento/mispostulaciones/seguimiento",
    data: { codigo: string },
    beforeSend: function () {
      $("#div-00").html("");
      $("#div-00").append(
        "<div id='div-00'>\
            <div class='d-flex justify-content-center my-1'>\
                <div class='spinner-border' role='status' aria-hidden='true'></div>\
            </div>\
          </div>"
      );
    },
    success: function (res) {
      $("#div-00").html("");
      $("#div-00").append(res.data);
    },
  });

  if (screen.width < 850) {
    var dest = $("#div-00").offset().top;
    $("html, body").animate({ scrollTop: dest }, 300);
  }
}

// padres
function navegacionmenu(string) {
  $.ajax({
    type: "POST",
    url: "/reclutamiento/dashboard/cambiarsession",
    data: { string: string },
  });
  var dato = ""; //cerrado
  $.ajax({
    type: "POST",
    url: "/reclutamiento/dashboard/cambiaropen",
    data: { string: dato },
  });
}

// hijos
function clicksub(string) {
  $.ajax({
    type: "POST",
    url: "/reclutamiento/dashboard/cambiarsessionsub",
    data: { string: string },
  });
  var dato = "open"; //cerrado
  $.ajax({
    type: "POST",
    url: "/reclutamiento/dashboard/cambiaropen",
    data: { string: dato },
  });
}
