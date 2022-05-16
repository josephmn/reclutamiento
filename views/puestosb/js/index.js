$(function () {
  $("#codigo").attr("readonly", true);

  creardatatable("#example1", 10, 0); //tabla.- index

  $("#example1 tbody").on("click", "a.editar", function () {
    let id = $(this).attr("id");
    let nombre = $(this).attr("nombre");
    let dias = $(this).attr("dias");

    $("#idtabla").html("");
    $("#idtabla").html(id);

    $("#codigo").val("");
    $("#codigo").val(id);
    $("#cargo").val("");
    $("#cargo").val(nombre);
    $("#dias").val("");
    $("#dias").val(dias);

    $("#modal-editar").modal("show");
  });

  $("#modal-editar").on("shown.bs.modal", function () {
    $("#dias").focus();
  });

  // guardar cambios
  $("#btnguardar").on("click", function () {
    let post = 2; //update
    let codigo = $("#codigo").val(); //codigo de puesto
    let cargo = $("#cargo").val(); //nombre del puesto
    let chk = 0; //no se usa
    let dias = $("#dias").val(); //cantidad de dias

    if (dias == null || dias == "" || dias == 0) {
      Swal.fire({
        icon: "info",
        title: "No ha ingresado la cantidad de dias de proceso",
        text: "Favor de ingresar una cantidad válida para registrar...!!",
        timer: 4000,
        timerProgressBar: true,
        showCancelButton: false,
        showConfirmButton: false,
      });
      return;
    }

    Swal.fire({
      title: "Estas seguro de asignar " +dias +" dia(s) para el puesto " +cargo +"?",
      text: "Favor de confirmar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#61C250",
      cancelButtonColor: "#ea5455",
      confirmButtonText: "Si, solicitar!", //<i class="fa fa-smile-wink"></i>
      cancelButtonText: "No", //<i class="fa fa-frown"></i>
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: "POST",
          url: "/reclutamiento/puestosb/mantenimiento_cargos",
          data: {
            post: post,
            codigo: codigo,
            cargo: cargo,
            chk: chk,
            dias: dias,
          },
          success: function (res) {
            if (res.icase < 4) {
              Swal.fire({
                icon: res.vicon,
                title: res.vtitle,
                text: res.vtext,
                timer: res.itimer,
                timerProgressBar: res.vprogressbar,
                showCancelButton: false,
                showConfirmButton: false,
              });
              var id = setInterval(function () {
                location.reload();
                clearInterval(id);
              }, res.itimer);
              $("#modal-editar").modal("hide");
            } else {
              Swal.fire({
                icon: res.vicon,
                title: res.vtitle,
                text: res.vtext,
                timer: res.itimer,
                timerProgressBar: res.vprogressbar,
                showCancelButton: false,
                showConfirmButton: false,
              });
              $("#modal-editar").modal("hide");
            }
          },
        });
      }
    });
  });

  $("#btncancelar").on("click", function () {
    $("#modal-editar").modal("hide");
  });
});

// crear tabla
function creardatatable(nombretabla, row, orden) {
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
    lengthMenu: [row],
    order: [[orden, "asc"]],
  });
  return tabla;
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
