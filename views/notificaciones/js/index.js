$(function () {
  // guardar cambios configuracion incial
  $("#btnconfiguracioninicial").on("click", function () {
    let ruc = $("#cmpruc").val(); //id del usuario
    let razon = $("#cmprazon").val();
    let dominio = $("#cmpdominio").val();

    Swal.fire({
      html:
        "Estas seguro de guardar los datos de compañia <b>" +
        $.trim(razon) +
        "</b>?",
      text: "Favor de confirmar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#61C250",
      cancelButtonColor: "#ea5455",
      confirmButtonText: "Si, guardar!", //<i class="fa fa-smile-wink"></i>
      cancelButtonText: "No", //<i class="fa fa-frown"></i>
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: "POST",
          url: "/reclutamiento/notificaciones/mantenimiento_compania",
          data: {
            ruc: ruc,
            razon: razon,
            dominio: dominio,
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

  // guardar configuracion de correo
  $("#btnguardarcorreo").on("click", function () {
    let correosalida = $("#correosalida").val();
    let password = $("#password").val();
    let nombresalida = $("#nombresalida").val();
    let servidorentrante = $("#servidorentrante").val();
    let puerto = $("#puerto").val();

    Swal.fire({
      html: "Estas seguro de guardar los datos de envio de correo?",
      text: "Favor de confirmar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#61C250",
      cancelButtonColor: "#ea5455",
      confirmButtonText: "Si, guardar!", //<i class="fa fa-smile-wink"></i>
      cancelButtonText: "No", //<i class="fa fa-frown"></i>
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: "POST",
          url: "/reclutamiento/notificaciones/mantenimiento_correo",
          data: {
            correosalida: correosalida,
            password: password,
            nombresalida: nombresalida,
            servidorentrante: servidorentrante,
            puerto: puerto,
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

  $("#valorx").html("< br >");

  var arr = [];
  // seleccion de correo
  $(".select2").change(function () {
    arr = $(this).val();
  });

  $.ajax({
    type: "POST",
    url: "/reclutamiento/notificaciones/consulta_usuario",
    success: function (res) {
      //construir array
      let array1 = res.cccorreo.map((x) => x.v_codigo);
      arr = array1;
    },
  });

  // guardar cambios modelo correo finalista
  $("#btncorreofinalista").on("click", function () {
    let ccopia = arr;
    let casunto = $("#postasunto").val();
    let cmensaje = $("#mensaje").val();

    Swal.fire({
      title: "Estas seguro de guardar el modelo de correo?",
      text: "Favor de confirmar!",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#61C250",
      cancelButtonColor: "#ea5455",
      confirmButtonText: "Si, guardar!", //<i class="fa fa-smile-wink"></i>
      cancelButtonText: "No", //<i class="fa fa-frown"></i>
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: "POST",
          url: "/reclutamiento/notificaciones/mantenimiento_correofinalista",
          data: {
            ccopia: ccopia,
            casunto: casunto,
            cmensaje: cmensaje,
          },
          beforeSend: function () {
            // setting a timeout
            $("#btnenviarcorreo").attr("disabled", "disabled");
            $("#btncancelarcorreo").attr("disabled", "disabled");
            $("#btnenviarcorreo").html(
              "<span class='spinner-border spinner-border-sm'></span> \
                                  <span class='ml-25 align-middle'>Guardando...</span>"
            );
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

function pulsar(e) {
  if (e.keyCode === 13 && !e.shiftKey) {
    $("#btnlogin").click();
  }
}
