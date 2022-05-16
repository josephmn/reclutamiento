$(function () {
  $("#example1").DataTable({
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
    order: [
      [0, "asc"],
      [1, "asc"],
    ],
    lengthMenu: [
      [10, 25, 50, -1],
      ["10", "25", "50", "Todo"],
    ],
  });
});

// mensaje para eliminar
// eliminar
$("#example1 tbody td").on("click", "a.delete", function () {
  let post = 3; //delete
  let codigo = $(this).attr("id");
  let nombre = $(this).attr("puestoa");
  let puesto = 0;
  let estado = 1;
  let fecha = "";
  let elaborado = "";
  let revisado = "";
  let gerencia = "";
  let reporta = "";
  let mision = "";
  let organizacion = "";
  let complejidad = "";
  let chktecnico = false;
  let chkuniversitario = false;
  let chkpostgrado = false;
  let chkotros = false;
  let indicar_otro = "";
  let profesion = "";
  let rd1 = false;
  let rd2 = false;
  let sector = false;
  let anhio_sector = 0;
  let personal_acargo = false;
  let anhio_personal = 0;
  let puestos_similares = false;
  let anhio_puestos = 0;
  let conocimiento = "";
  let otro_licencias = false;
  let desc_licencias = "";
  let otro_certificaciones = false;
  let desc_certificaciones = false;

  Swal.fire({
    title: "Estas seguro de eliminar el puesto: " + nombre +" ?",
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
        url: "/reclutamiento/generadoa/mantenimiento_puestoagen",
        data: {
          post: post,
          correlativo: codigo,
          estado: estado,
          puesto: puesto,
          fecha: fecha,
          elaborado: elaborado,
          revisado: revisado,
          gerencia: gerencia,
          reporta: reporta,
          mision: mision,
          organizacion: organizacion,
          complejidad: complejidad,
          chktecnico: chktecnico,
          chkuniversitario: chkuniversitario,
          chkpostgrado: chkpostgrado,
          chkotros: chkotros,
          indicar_otro: indicar_otro,
          profesion: profesion,
          rd1: rd1,
          rd2: rd2,
          sector: sector,
          anhio_sector: anhio_sector,
          personal_acargo: personal_acargo,
          anhio_personal: anhio_personal,
          puestos_similares: puestos_similares,
          anhio_puestos: anhio_puestos,
          conocimiento: conocimiento,
          otro_licencias: otro_licencias,
          desc_licencias: desc_licencias,
          otro_certificaciones: otro_certificaciones,
          desc_certificaciones: desc_certificaciones,
        },
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
});

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
