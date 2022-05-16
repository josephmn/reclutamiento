$(function () {
  //cargar deshabilitado los input
  $("#codigo,#nombres,#apellidos,#clavecon,#postpara").attr("readonly", true);

  creardatatable("#example1", 10, 0); //tabla.- index

  $("#example1 tbody").on("click", "a.editar", function () {
    let post = 2; // consultar por id
    let id = $(this).attr("id");

    $("#idtabla").html("");
    $("#idtabla").html(id);

    $.ajax({
      type: "POST",
      url: "/reclutamiento/conusuarios/consulta_usuario",
      data: { post: post, id: id },
      success: function (res) {
        $("#codigo").val(res.icodigo);
        $("#nombres").val(res.vnombre);
        $("#apellidos").val(res.vapellido);
        $("#correo").val(res.vcorreo);
        $("#estado").val(res.iestado);
        comboperfil(res.iperfil);
        $("#confirmar").val(res.iconfirmar);
        $("#clavecon").val(res.iclaveconfirmacion);
        $("#foto").html("");
        $("#foto").attr("src", res.vfoto);
      },
    });

    $("#modal-editar").modal("show");
  });

  $("#modal-editar").on("shown.bs.modal", function () {
    $("#correo").focus();
  });

  $("#btncancelar").on("click", function () {
    $("#modal-editar").modal("hide");
  });

  // guardar cambios
  $("#btnguardar").on("click", function () {
    let post = 2; //update
    let codigo = $("#codigo").val(); //id del usuario
    let nombres = $("#nombres").val();
    let apellidos = $("#apellidos").val();
    let correo = $("#correo").val();
    let estado = $("#estado").val(); //activo
    let perfil = $("#perfil").val(); //se lleva el id perfil a actualizar
    let confirmar = $("#confirmar").val(); //se lleva el id perfil a actualizar

    Swal.fire({
      title:
        "Estas seguro de actualizar los datos del usuario " +
        nombres +
        " " +
        apellidos +
        "?",
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
          url: "/reclutamiento/conusuarios/mantenimiento_usuarios",
          data: {
            post: post,
            codigo: codigo,
            nombres: nombres,
            apellidos: apellidos,
            correo: correo,
            estado: estado,
            perfil: perfil,
            confirmar: confirmar,
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
            }
          },
        });
      }
    });
  });

  // modal enviar correo
  $("#example1 tbody").on("click", "a.correo", function () {
    let post = 3; // consultar con formato para enviar correo por id
    let id = $(this).attr("id");

    $("#postasunto").val("");
    $("#mensaje").val("");

    $.ajax({
      type: "POST",
      url: "/reclutamiento/conusuarios/consulta_usuario",
      data: { post: post, id: id },
      success: function (res) {
        $("#postnombre").html(res.vnombre);
        $("#postpara").val(res.vcorreo);
        combocorreos(4, id);
      },
    });

    $("#modal-correo").modal("show");
  });

  $("#modal-correo").on("shown.bs.modal", function () {
    $("#postasunto").focus();
  });

  $("#btncancelarcorreo").on("click", function () {
    $("#modal-correo").modal("hide");
  });

  var arr = [];
  // seleccion de correo
  $(".select2").change(function () {
    arr = $(this).val();
    // arr = {id:$(this).val()};
    // datosaci.push({ id: countaci, acciones: accion, resultados: resultado });
    // console.log(arr);
    // console.log(JSON.stringify(arr));
  });

  // enviar correo
  $("#btnenviarcorreo").on("click", function () {
    let cnombre = $("#postnombre").text();
    let cpara = $("#postpara").val();
    let ccopia = arr;
    let casunto = $("#postasunto").val();
    let cmensaje = $("#mensaje").val();

    Swal.fire({
      title: "Estas seguro de enviar el correo al usuario " + cnombre + "?",
      text: "Favor de confirmar!",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#61C250",
      cancelButtonColor: "#ea5455",
      confirmButtonText: "Si, enviar!", //<i class="fa fa-smile-wink"></i>
      cancelButtonText: "No", //<i class="fa fa-frown"></i>
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: "POST",
          url: "/reclutamiento/conusuarios/enviarcorreo",
          data: {
            cnombre: cnombre,
            cpara: cpara,
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
                                <span class='ml-25 align-middle'>Enviando...</span>"
            );
            // $('#modal-correo').css('opacity', '.2');
          },
          success: function (res) {
            if ((res.correo = 1)) {
              Swal.fire({
                icon: "success",
                title: "Correo enviado correctamente",
                timer: 2000,
                timerProgressBar: true,
                showCancelButton: false,
                showConfirmButton: false,
              });
              var id = setInterval(function () {
                location.reload();
                clearInterval(id);
              }, 2000);
              $("#modal-correo").modal("hide");
            } else {
              Swal.fire({
                icon: "error",
                title: "Error al enviar correo",
                text: "Correo no enviado, intentelo mas tarde",
                timer: 3000,
                timerProgressBar: true,
                showCancelButton: false,
                showConfirmButton: false,
              });
              var id = setInterval(function () {
                location.reload();
                clearInterval(id);
              }, 3000);
              $("#modal-correo").modal("hide");
            }
          },
        });
      }
    });
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
    lengthMenu: [
      [25, 50, 100, -1],
      [25, 50, 100, "All"],
    ],
    order: [[orden, "asc"]],
  });
  return tabla;
}

$(".char-textarea-mision").on("keyup", function (event) {
  checkTextAreaMaxLength(
    this,
    event,
    ".textarea-counter-value",
    ".char-textarea-mision",
    ".char-count-mision"
  );
  $(this).addClass("active");
});

function checkTextAreaMaxLength(textBox, e, x, y, z) {
  var maxLength = parseInt($(textBox).data("length")),
    counterValue = $(x),
    charTextarea = $(y);

  if (!checkSpecialKeys(e)) {
    if (textBox.value.length < maxLength - 1)
      textBox.value = textBox.value.substring(0, maxLength);
  }
  $(z).html(textBox.value.length);
  // if (textBox.value.length > maxLength) {
  //   counterValue.css("background-color", window.colors.solid.danger);
  //   charTextarea.css("color", window.colors.solid.danger);
  //   charTextarea.addClass("max-limit");
  // } else {
  //   counterValue.css("background-color", window.colors.solid.primary);
  //   charTextarea.css("color", $textcolor);
  //   charTextarea.removeClass("max-limit");
  // }
  return true;
}

function checkSpecialKeys(e) {
  if (
    e.keyCode != 8 &&
    e.keyCode != 46 &&
    e.keyCode != 37 &&
    e.keyCode != 38 &&
    e.keyCode != 39 &&
    e.keyCode != 40
  )
    return false;
  else return true;
}

// crear combo menu
function comboperfil(perfil) {
  $.ajax({
    type: "POST",
    url: "/reclutamiento/conusuarios/comboperfil",
    data: { perfil: perfil },
    success: function (res) {
      $("#perfil").html("");
      $("#perfil").append(res.data);
    },
  });
}

// crear combo menu
function combocorreos(post, id) {
  $.ajax({
    type: "POST",
    url: "/reclutamiento/conusuarios/combocorreos",
    data: { post: post, id: id },
    success: function (res) {
      $("#postcc").html("");
      $("#postcc").append(res.data);
    },
  });
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
