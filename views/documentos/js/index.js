$(function () {
  creardatatable("#example1"); //tabla.- tareas

  $("#btnsubir").on("click", function () {
    let $inputArchivos = document.querySelector("#archivo");
    let formData = new FormData();
    let files = $("#archivo")[0].files[0];

    if (files == null || files == "") {
      Swal.fire({
        icon: "info",
        title: "No ha seleccionado un archivo...",
        text: "Favor de seleccionar uno!",
        timer: 4000,
        timerProgressBar: true,
        showCancelButton: false,
        showConfirmButton: true,
      });
      $inputArchivos.value = null;
      $("#nombre_inicio").html("");
      $("#nombre_inicio").html("Ningun archivo seleccionado");
      return;
    }

    let extension = files.type;
    let tipoarchivo = extension.split("/");

    // alert(tipoarchivo[1]);

    if (tipoarchivo[1] !== "pdf" || tipoarchivo[1] != "pdf") {
      Swal.fire({
        icon: "info",
        title: "No ha seleccionado un archivo pdf...",
        text: "Favor de seleccionar uno para cargar!",
        timer: 4000,
        timerProgressBar: true,
        showCancelButton: false,
        showConfirmButton: true,
      });
      $inputArchivos.value = null;
      $("#nombre_inicio").html("");
      $("#nombre_inicio").html("Ningun archivo seleccionado");
      return;
    }

    if (files.size >= 2098000) {
      Swal.fire({
        icon: "info",
        title: "El archivo seleccionado es muy grande...",
        text: "Tamaño maximo por archivo de 2 MB (2097 Kb)",
        timer: 4000,
        timerProgressBar: true,
        showCancelButton: false,
        showConfirmButton: false,
      });
      $inputArchivos.value = null;
      $("#nombre_inicio").html("");
      $("#nombre_inicio").html("Ningun archivo seleccionado");
    } else {
      formData.append("archivo", files);
      $.ajax({
        url: "/reclutamiento/documentos/subir_archivos",
        type: "POST",
        data: formData,
        contentType: false,
        processData: false,
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

  // CARGAR MODAL ELIMINAR
  $("#example1 tbody").on("click", "a.eliminar", function () {
    let cod = $(this).attr("id");
    let nombre = $(this).attr("name");

    $("#cod_eliminar").html("");
    $("#cod_eliminar").html(cod + "/" + nombre);
    $("#modal-eliminar").modal("show");
  });

  //---> SI LA RESPUESTA ES "SI"
  $("#btn_si_eliminar").on("click", function () {
    let archivo = $("#cod_eliminar").text();
    let desarchivo = archivo.split("/");

    let post = 3; //eliminar
    let id = desarchivo[0]; //codigo del item
    let nombre = desarchivo[1]; //nombre del archivo

    $.ajax({
      type: "POST",
      url: "/reclutamiento/documentos/mantenimiento_archivos",
      data: { post: post, id: id, nombre: nombre },
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
    $("#modal-eliminar").modal("hide");
  });

  //---> SI LA RESPUESTA ES "NO"
  $("#btn_no_eliminar").on("click", function () {
    $("#modal-eliminar").modal("hide");
  });
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
    order: [[0, "asc"]],
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
