$(function () {
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

  var allPages1 = oTable1.fnGetNodes();

  $("body").on("click", "#selectAll", function () {
    if ($(this).hasClass("allChecked")) {
      $("input[id='cbx1']", allPages1).prop("checked", false);
    } else {
      $("input[id='cbx1']", allPages1).prop("checked", true);
    }
    $(this).toggleClass("allChecked");
  });

  // cv revisado
  $("#example1 td").on("click", "a.cv", function () {
    let checks = [];
    let id = $(this).attr("id"); //id de la postulacion
    let post = 5; //post de revision de cv
    checks.push(id); //array de id's.
    let estado = 5; //estado revision de cv

    $.ajax({
      type: "POST",
      url: "/reclutamiento/publicacionesb/mantenimiento_postulantes",
      data: { post: post, checks: checks, estado: estado },
      success: function (res) {
      },
    });

    $(this).removeClass('btn-danger');
    $(this).addClass("btn-warning");

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
          let post = 6; //entrevista aprobada
          let estado = 6; //entrevista personal
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

  // desaprobado a postulantes
  $("#btndesaprobar").on("click", function () {
    let checks = "";
    checks = $.map($("input[id='cbx1']:checkbox:checked"), function (val, i) {
      return parseInt(val.value);
    });

    if (checks.length == null || checks.length == "" || checks.length == 0) {
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
        text: "No olvides que se agruparan en la seccion de abajo!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#61C250",
        cancelButtonColor: "#ea5455",
        confirmButtonText: "Si, aprobar!",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          let post = 7; //entrevista desaprobada
          let estado = 7; //entrevista personal
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

});
