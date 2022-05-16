$(function () {
  $("#correo").attr("readonly", true);

  $("#btnregistros").on("click", function () {
    let post = 0; // actualiza datos sin foto
    let nombres = $("#nombres").val();
    let apellidos = $("#apellidos").val();

    $.ajax({
      type: "POST",
      url: "/reclutamiento/perfil/mantenimiento_login",
      data: { post: post, nombre: nombres, apellido: apellidos },
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
  });

  $("#btnpassword").on("click", function () {
    var p1 = document.getElementById("passwd").value;
    var p2 = document.getElementById("passwd2").value;

    var espacios = false;
    var cont = 0;

    while (!espacios && cont < p1.length) {
      if (p1.charAt(cont) == " ") espacios = true;
      cont++;
    }

    if (p1.length < 8 || p1.length < 8) {
      Swal.fire({
        icon: "info",
        title: "La contraseña no puede tener menos de 8 digitos...",
        text: "Favor de ingresar una clave correcta!",
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    if (espacios) {
      Swal.fire({
        icon: "info",
        title: "La contraseña no puede contener espacios en blanco...",
        text: "Favor de ingresar una clave correcta!",
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    if (p1.length == 0 || p2.length == 0) {
      Swal.fire({
        icon: "info",
        title: "Los campos del password no pueden quedar vacios...",
        text: "Favor de ingresar una clave!",
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    if (p1 != p2) {
      Swal.fire({
        icon: "info",
        title: "Las contraseñas ingresadas no coinciden...",
        text: "Favor de verificarlas y vuelva a ingresarlas!",
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    } else {
      if (validar_clave(p1) == true) {
        var newpasswd = $("#passwd").val();

        $.ajax({
          type: "POST",
          url: "/reclutamiento/perfil/cambiar_clave",
          data: { newpasswd: newpasswd },
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
      } else {
        Swal.fire({
          icon: "info",
          title: "Contraseña no segura, ingrese mayúsculas y números...",
          text: "Favor de verificar su contraseña nuevamente!",
          timer: 3000,
          timerProgressBar: true,
        });
      }
    }
  });

  $("#btnsubir").on("click", function () {
    var formData = new FormData();
    var files = $("#archivo")[0].files[0];
    formData.append("archivo", files);
    $.ajax({
      url: "/reclutamiento/perfil/subir_archivo",
      type: "POST",
      data: formData,
      contentType: false,
      processData: false,
      success: function (res) {
        if (res.icase != 0) {
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
  });
});

function validar_clave(contrasenna) {
  if (contrasenna.length >= 8) {
    var mayuscula = false;
    var minuscula = false;
    var numero = false;
    var caracter_raro = false;

    for (var i = 0; i < contrasenna.length; i++) {
      if (contrasenna.charCodeAt(i) >= 65 && contrasenna.charCodeAt(i) <= 90) {
        mayuscula = true;
      } else if (
        contrasenna.charCodeAt(i) >= 97 &&
        contrasenna.charCodeAt(i) <= 122
      ) {
        minuscula = true;
      } else if (
        contrasenna.charCodeAt(i) >= 48 &&
        contrasenna.charCodeAt(i) <= 57
      ) {
        numero = true;
      } else {
        caracter_raro = true;
      }
    }
    if (
      (mayuscula == true && minuscula == true && numero == true) ||
      caracter_raro == true
    ) {
      return true;
    }
  }
  return false;
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
