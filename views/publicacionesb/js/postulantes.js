$(function () {
  //cargar deshabilitado los input
  $("#postnombre,#postcorreo").attr("readonly", true);

  //creardatatable("#example1"); //tabla.- tareas

  var oTable1 = $("#example1").dataTable({
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
    lengthMenu: [[-1], ["All"]],
    // order: [[0, "asc"]],
  });

  var oTable2 = $("#example2").dataTable({
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
    lengthMenu: [[-1], ["All"]],
    // order: [[0, "asc"]],
  });

  var oTable3 = $("#example3").dataTable({
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
    lengthMenu: [[-1], ["All"]],
    // order: [[0, "asc"]],
  });

  var oTable4 = $("#example4").dataTable({
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
    lengthMenu: [[-1], ["All"]],
    // order: [[0, "asc"]],
  });

  var oTable5 = $("#example5").dataTable({
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
    lengthMenu: [[-1], ["All"]],
    // order: [[0, "asc"]],
  });

  var oTable6 = $("#example6").dataTable({
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
    lengthMenu: [[-1], ["All"]],
    // order: [[0, "asc"]],
  });

  var allPages1 = oTable1.fnGetNodes();

  $("body").on("click", "#selectAll", function () {
    if ($(this).hasClass("allChecked")) {
      $("input[id='cbx1']", allPages1).prop("checked", false);
    } else {
      $("input[id='cbx1']", allPages1).prop("checked", true);
    }
    $(this).toggleClass("allChecked");
  });

  var allPages2 = oTable2.fnGetNodes();

  $("body").on("click", "#selectAllapro", function () {
    if ($(this).hasClass("allChecked")) {
      $("input[id='cbx2']", allPages2).prop("checked", false);
    } else {
      $("input[id='cbx2']", allPages2).prop("checked", true);
    }
    $(this).toggleClass("allChecked");
  });

  var allPages3 = oTable3.fnGetNodes();

  $("body").on("click", "#selectAlldesapro", function () {
    if ($(this).hasClass("allChecked")) {
      $("input[id='cbx3']", allPages3).prop("checked", false);
    } else {
      $("input[id='cbx3']", allPages3).prop("checked", true);
    }
    $(this).toggleClass("allChecked");
  });

  // aprobar a postulantes
  $("#btnaprobar").on("click", function () {
    let checks = "";
    checks = $.map($("input[id='cbx1']:checkbox:checked"), function (val, i) {
      return parseInt(val.value);
    });

    if (checks.length == null || checks.length == "" || checks.length == 0) {
      Swal.fire({
        icon: "info",
        title: "No a seleccionado a ningun postulante para aprobar...",
        text: "Favor de seleccionar uno por lo menos para realizar cambios!",
        timer: 5000,
        timerProgressBar: true,
      });
    } else {
      Swal.fire({
        title: "Estas seguro de aprobar al(los) siguiente(s) postulante(s)?",
        text: "No olvides que se agruparan en la seccion de abajo (izquierda)!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#61C250",
        cancelButtonColor: "#ea5455",
        confirmButtonText: "Si, aprobar!",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          let post = 2; //actualizar
          let estado = 2; //aprobado
          $.ajax({
            type: "POST",
            url: "/reclutamiento/publicacionesb/mantenimiento_postulantes",
            data: { post: post, checks: checks, estado: estado },
            success: function (res) {
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
            },
          });
        }
      });
    }
  });

  // desaprobar a postulantes
  $("#btndesaprobar").on("click", function () {
    let cheks = "";
    cheks = $.map($("input[id='cbx1']:checkbox:checked"), function (val, i) {
      return parseInt(val.value);
    });

    if (cheks.length == null || cheks.length == "" || cheks.length == 0) {
      Swal.fire({
        icon: "info",
        title: "No a seleccionado a ningun postulante para desaprobar...",
        text: "Favor de seleccionar uno por lo menos para realizar cambios!",
        timer: 5000,
        timerProgressBar: true,
      });
    } else {
      Swal.fire({
        title: "Estas seguro de desaprobar al(los) siguiente(s) postulante(s)?",
        text: "No olvides que se agruparan en la seccion de abajo (derecha)!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#61C250",
        cancelButtonColor: "#ea5455",
        confirmButtonText: "Si, desaprobar!",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          let post = 2; //actualizar
          let estado = 3; //aprobado
          $.ajax({
            type: "POST",
            url: "/reclutamiento/publicacionesb/mantenimiento_postulantes",
            data: { post: post, checks: cheks, estado: estado },
            success: function (res) {
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
            },
          });
        }
      });
    }
  });

  // desaprobar a postulantes
  $("#btndesaprobar2").on("click", function () {
    let cheks = "";
    cheks = $.map($("input[id='cbx2']:checkbox:checked"), function (val, i) {
      return parseInt(val.value);
    });

    if (cheks.length == null || cheks.length == "" || cheks.length == 0) {
      Swal.fire({
        icon: "info",
        title: "No a seleccionado a ningun postulante para desaprobar...",
        text: "Favor de seleccionar uno por lo menos para realizar cambios!",
        timer: 5000,
        timerProgressBar: true,
      });
    } else {
      Swal.fire({
        title: "Estas seguro de desaprobar al(los) siguiente(s) postulante(s)?",
        text: "No olvides que se agruparan en la seccion derecha!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#61C250",
        cancelButtonColor: "#ea5455",
        confirmButtonText: "Si, desaprobar!",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          let post = 2; //actualizar
          let estado = 3; //aprobado
          $.ajax({
            type: "POST",
            url: "/reclutamiento/publicacionesb/mantenimiento_postulantes",
            data: { post: post, checks: cheks, estado: estado },
            success: function (res) {
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
            },
          });
        }
      });
    }
  });

  // aprobar a postulantes
  $("#btnaprobar3").on("click", function () {
    let checks = "";
    checks = $.map($("input[id='cbx3']:checkbox:checked"), function (val, i) {
      return parseInt(val.value);
    });

    if (checks.length == null || checks.length == "" || checks.length == 0) {
      Swal.fire({
        icon: "info",
        title: "No a seleccionado a ningun postulante para aprobar...",
        text: "Favor de seleccionar uno por lo menos para realizar cambios!",
        timer: 5000,
        timerProgressBar: true,
      });
    } else {
      Swal.fire({
        title: "Estas seguro de aprobar al(los) siguiente(s) postulante(s)?",
        text: "No olvides que se agruparan en la seccion izquierda!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#61C250",
        cancelButtonColor: "#ea5455",
        confirmButtonText: "Si, aprobar!",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          let post = 2; //actualizar
          let estado = 2; //aprobado
          $.ajax({
            type: "POST",
            url: "/reclutamiento/publicacionesb/mantenimiento_postulantes",
            data: { post: post, checks: checks, estado: estado },
            success: function (res) {
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
            },
          });
        }
      });
    }
  });

  // envio de cv
  $("#btnenviocv").on("click", function () {
    let checks = "";
    checks = $.map($("input[id='cbx2']:checkbox:checked"), function (val, i) {
      return parseInt(val.value);
    });

    if (checks.length == null || checks.length == "" || checks.length == 0) {
      Swal.fire({
        icon: "info",
        title: "No a seleccionado a ningun postulante para enviar CV...",
        text: "Favor de seleccionar uno por lo menos para realizar cambios!",
        timer: 5000,
        timerProgressBar: true,
      });
    } else {
      Swal.fire({
        title: "Estas seguro de enviar los CV seleccionado(s)?",
        text: "No olvides que se actualizar el estado en la tabla!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#61C250",
        cancelButtonColor: "#ea5455",
        confirmButtonText: "Si, eviar!",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          let post = 4; //post de envio de cv
          let estado = 4; //estado envio de cv
          $.ajax({
            type: "POST",
            url: "/reclutamiento/publicacionesb/mantenimiento_postulantes",
            data: { post: post, checks: checks, estado: estado },
            success: function (res) {
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
            },
          });
        }
      });
    }
  });

  //#region ENVIO DE CORREO A USUARIO (inicio)
  // CARGAR MODAL //
  $("#example1 tbody").on("click", "a.email", function () {
    let id = $(this).attr("id");

    $.ajax({
      type: "POST",
      url: "/reclutamiento/publicacionesb/datos_correo",
      data: { id: id },
      success: function (res) {
        $("#postnombre").val(res.postulante);
        $("#postcorreo").val(res.correo);
        $("#postasunto").val("Notificación de postulación a: " + res.titulo);
      },
    });

    $("#idtabla").html("");
    // $("#idtabla").html(id + "/" + nombre);

    $("#modal-ecorreo").modal("show");
  });

  $("#modal-ecorreo").on("shown.bs.modal", function () {
    $("#mensaje").focus();
  });

  // BOTON ENVIAR //
  $("#btnaceptar").on("click", function () {
    alert("hola");
  });

  // BOTON CANCELAR //
  $(document).ready(function () {
    $("#btncancelar").on("click", function () {
      $("#modal-ecorreo").modal("hide");
    });
  });
  //#endregion ENVIO DE CORREO A USUARIO (fin)
});

function caracteres_mision() {
  var total = 1200;
  setTimeout(function () {
    var valor = document.getElementById("mensaje");
    var cantidad = valor.value.length;
    document.getElementById("res").innerHTML =
      "<small><b>" +
      cantidad +
      " caractere/s, te quedan " +
      (total - cantidad) +
      "</b></small>";
  }, 10);
}

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
    lengthMenu: [[-1], ["All"]],
    order: [[0, "asc"]],
  });
  return tabla;
}

// padres menu
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

// hijos submenu
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
