$(function () {
  $("#codigo,#cargo").attr("readonly", true);

  creardatatable("#example1", 10, 0); //tabla.- index
  creardatatable("#example2", 10, 0); //tabla.- index

  $("#example1 tbody").on("click", "a.editar", function () {
    let id = $(this).attr("id");
    let nombre = $(this).attr("nombre");

    $("#idtabla").html("");
    $("#idtabla").html(id);

    $("#codigo").val("");
    $("#codigo").val(id);
    $("#cargo").val("");
    $("#cargo").val(nombre);
    $("#cantidad").val("");
    $("#cantidad").val(1);

    $("#modal-agregar").modal("show");
  });

  $("#modal-agregar").on("shown.bs.modal", function () {
    $("#cantidad").focus();
  });

  // guardar cambios
  $("#btnguardar").on("click", function () {
    let post = 1; //insert
    let codigo = $("#codigo").val(); //codigo de puesto
    let nombre = $("#cargo").val(); //nombre del puesto
    let cantidad = $("#cantidad").val(); //cantidad de postulantes
    let solicitud = 0; //id de la solicitud (no se usa)

    if (cantidad == null || cantidad == "" || cantidad == 0) {
      Swal.fire({
        icon: "info",
        title: "No ha ingresado la cantidad de postulantes",
        text: "Favor de ingresar una cantidad válida para registrar...!!",
        timer: 3000,
        timerProgressBar: true,
        showCancelButton: false,
        showConfirmButton: false,
      });
      return;
    }

    Swal.fire({
      title: "Estas seguro de solicitar " + cantidad + " personal(les) para el puesto de " + nombre +"?",
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
          url: "/reclutamiento/solicitud/mantenimiento_solicitudes",
          data: {
            post: post,
            codigo: codigo,
            cantidad: cantidad,
            solicitud: solicitud,
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
              $("#modal-agregar").modal("hide");
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
              $("#modal-agregar").modal("hide");
            }
          },
        });
      }
    });
  });

  $("#btncancelar").on("click", function () {
    $("#modal-agregar").modal("hide");
  });

  $("#example2 tbody").on("click", "a.delete", function () {
    let post = 3; //delete
    let codigo = 0 //no se usa
    let nombre = $(this).attr("nombre");
    let cantidad = 0; //no se usa
    let solicitud = $(this).attr("id");

    Swal.fire({
      title:"Estas seguro de eliminar la solicitud # " +solicitud+" del puesto " +nombre+"?",
      text: "Favor de confirmar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#61C250",
      cancelButtonColor: "#ea5455",
      confirmButtonText: "Si, eliminar!", //<i class="fa fa-smile-wink"></i>
      cancelButtonText: "No", //<i class="fa fa-frown"></i>
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: "POST",
          url: "/reclutamiento/solicitud/mantenimiento_solicitudes",
          data: {
            post: post,
            codigo: codigo,
            cantidad: cantidad,
            solicitud: solicitud,
          },
          success: function (res) {
            if (res.icase != 4) {
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
            }
          },
        });
      }
    });
  });
});

function valideKey(evt) {
  // code is the decimal ASCII representation of the pressed key.
  var code = evt.which ? evt.which : evt.keyCode;

  if (code == 8) {
    // backspace.
    return true;
  } else if (code >= 48 && code <= 57) {
    // is a number.
    return true;
  } else {
    // other keys.
    return false;
  }
}

$(function () {
  $(".validanumericos")
    .keypress(function (e) {
      if (isNaN(this.value + String.fromCharCode(e.charCode))) return false;
    })
    .on("cut copy paste", function (e) {
      e.preventDefault();
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
