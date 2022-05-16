$(function () {
  //cargar input solo lectura
  $("#email").attr("readonly", true);

  //validar correo
  $("#btnregistrarse").on("click", function () {
    var nombre = $("#nombres").val();
    var apellidos = $("#apellidos").val();
    var correo = $("#correo").val();
    var password = $("#password").val();

    var espacios = false;
    var cont = 0;

    while (!espacios && cont < password.length) {
      if (password.charAt(cont) == " ") espacios = true;
      cont++;
    }

    function validarcorreo(correo) {
      var expReg =
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
      var valor = expReg.test(correo);
      if (valor == true) {
        return true;
      } else {
        return false;
      }
    }

    function validar_clave(contrasenna) {
      if (contrasenna.length >= 8) {
        var mayuscula = false;
        var minuscula = false;
        var numero = false;
        var caracter_raro = false;

        for (var i = 0; i < contrasenna.length; i++) {
          if (
            contrasenna.charCodeAt(i) >= 65 &&
            contrasenna.charCodeAt(i) <= 90
          ) {
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

    if (nombre == "") {
      Swal.fire({
        icon: "info",
        title: "Ingrese sus nombres...",
        timer: 2000,
      });
      return false;
    }

    if (apellidos == "") {
      Swal.fire({
        icon: "info",
        title: "Ingrese sus apellidos...",
        timer: 2000,
      });
      return false;
    }

    if (validarcorreo(correo) == false) {
      Swal.fire({
        icon: "info",
        title: "Ingrese un correo válido...",
        timer: 2000,
      });
      return false;
    }

    if (password == "" || password.length == 0) {
      Swal.fire({
        icon: "info",
        title: "Contraseña no puede estar vacía...",
        timer: 2000,
      });
    } else if (password.length < 8) {
      Swal.fire({
        icon: "info",
        title: "Contraseña no puede tener menos de 8 dígitos...",
        timer: 2000,
      });
      return false;
    } else if (espacios) {
      Swal.fire({
        icon: "info",
        title: "Contraseña no puede tener espacios en blanco...",
        timer: 2000,
      });
      return false;
    } else if (validar_clave(password) == true) {
      $.ajax({
        type: "POST",
        url: "/reclutamiento/index/nuevoregistro",
        data: {
          nombre: nombre,
          apellidos: apellidos,
          correo: correo,
          password: password,
        },
        beforeSend: function () {
          $("#btnregistrarse").attr("disabled", true);
          $("#btnregistrarse").html(
            "<span class='spinner-border spinner-border-sm'></span> \
                              <span class='ml-25 align-middle'>Espere por favor...</span>"
          );
          // $('#modal-correo').css('opacity', '.2');
        },
        success: function (res) {
          if (res.registro == 2 && res.correo == 1) {
            //registro de cuenta y envío de correo
            $("#modal-validar").modal("show"); // ir a clic del boton validar para revisar los datos
            $("#email").val("");
            $("#email").val(correo);

            $("#modal-validar").on("shown.bs.modal", function () {
              $("#codigo").focus();
            });
          } else if (res.registro == 0) {
            //falta activar cuenta
            Swal.fire({
              icon: "info",
              title: "Cuenta aun no activa",
              text: "Ir a activar correo para completar el último paso..!!",
              timer: 4000,
              timerProgressBar: true,
              showCancelButton: false,
              showConfirmButton: false,
            });
            $("#btnregistrarse").prop("disabled", false);
            $("#btnregistrarse").html("Crear cuenta");
          } else {
            //cuenta ya existe
            Swal.fire({
              icon: "error",
              title: "Cuenta ya existe",
              text: "Si ha olvidado su contraseña, puede recuperarlo..!!",
              timer: 4000,
              timerProgressBar: true,
              showCancelButton: false,
              showConfirmButton: false,
            });
            $("#btnregistrarse").prop("disabled", false);
            $("#btnregistrarse").html("Crear cuenta");
          }
        },
      });
    } else {
      Swal.fire({
        icon: "info",
        title: "Contraseña no segura, ingrese mayúsculas y números...",
        timer: 4000,
      });
      return false;
    }
  });

  $("#btnvalidacion").on("click", function () {
    var codigo = $("#codigo").val();
    var email = $("#email").val();

    if (codigo == null || codigo == "") {
      Swal.fire({
        icon: "info",
        title: "Código vacío",
        text: "No ha ingresado el código válido..!!",
        timer: 3000,
        timerProgressBar: true,
        // showCancelButton: false,
        // showConfirmButton: false,
      });
    } else {
      $.ajax({
        type: "POST",
        url: "/reclutamiento/index/validarcodigo",
        data: { codigo: codigo, email: email },
        success: function (res) {
          // alert(res.validacion);
          switch (res.validacion) {
            case 0: //codigo incorrecto
              Swal.fire({
                icon: "error",
                title: "Codigo incorrecto",
                text: "Favor de ingresar el código correcto enviado a su correo..!!",
                timer: 4000,
                timerProgressBar: true,
                // showCancelButton: false,
                // showConfirmButton: false,
              });
              break;
            case 1: //codigo correcto
              Swal.fire({
                icon: "success",
                title: "Correo Validado",
                text: "Favor de inciar sesion con su correo y clave, gracias..!!",
                timer: 4000,
                timerProgressBar: true,
                showCancelButton: false,
                showConfirmButton: false,
              });
              $("#modal-agregar").modal("hide");
              var id = setInterval(function () {
                location.href = "http://localhost/reclutamiento/index/index";
                clearInterval(id);
              }, 4000);
              break;
          }
        },
      });
    }
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

// $(function () {
//   $(".validanumericos")
//     .keypress(function (e) {
//       if (e.charCode >= 48 && e.charCode <= 57) return true;
//     })
//     .on("cut copy paste", function (e) {
//       e.preventDefault();
//     });
// });

// function pulsar(e) {
//     if (e.keyCode === 13 && !e.shiftKey) {
//         $("#btn_login").click();
//     }
// }
