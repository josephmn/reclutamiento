$(function () {
  $("#codigo,#tareaid,#perfilid").attr("readonly", true);

  creardatatable("#example1"); //tabla.- tareas
  creardatatable("#example2"); //tabla.- perfil
  creardatatable("#example3"); //tabla.- solicitudes

  //#region "modal tarea"
  // cargar modal agregar
  $("#btntareas").on("click", function () {
    $("#tarea").val("");
    $("#modal-agregar").modal("show");
  });

  $("#modal-agregar").on("shown.bs.modal", function () {
    $("#tarea").focus();
  });

  // cancelar
  $("#btncancelartarea").on("click", function () {
    $("#modal-agregar").modal("hide");
  });

  // insertar nuevo
  $("#btnguardartarea").on("click", function () {
    let post = 1; //insert
    let correlativo = $("#codigo").val();
    let id = 0;
    let tarea = $("#tarea").val();

    Swal.fire({
      title: "Estas seguro de agregar los siguientes datos?",
      text: "Favor de confirmar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#61C250",
      cancelButtonColor: "#ea5455",
      confirmButtonText: "Si, agregar!", //<i class="fa fa-smile-wink"></i>
      cancelButtonText: "No", //<i class="fa fa-frown"></i>
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: "POST",
          url: "/reclutamiento/publicacionesb/mantenimiento_tarea",
          data: {
            post: post,
            correlativo: correlativo,
            id: id,
            tarea: tarea,
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
            }
          },
        });
      }
    });
  });

  // cargar modal editar
  // editar
  $("#example1 tbody").on("click", "a.update_tarea", function () {
    let post = 1; // consulta con codigo y id
    let codigo = $("#codigo").val();
    let id = $(this).attr("id");

    $("#tareaid").val("");
    $("#tarea1").val("");

    $.ajax({
      type: "POST",
      url: "/reclutamiento/publicacionesb/consulta_tarea",
      data: {
        post: post,
        codigo: codigo,
        id: id,
      },
      success: function (res) {
        $("#modal-agregar1").modal("show");
        $("#tareaid").val(res.iid);
        $("#tarea1").val(res.vtarea);
        $("#modal-agregar1").on("shown.bs.modal", function () {
          $("#tarea1").focus();
        });
      },
    });
  });

  // cancelar
  $("#btncancelartarea1").on("click", function () {
    $("#modal-agregar1").modal("hide");
  });

  // guardar
  $("#btnguardartarea1").on("click", function () {
    let post = 2; //actualizar
    let correlativo = $("#codigo").val();
    let id = $("#tareaid").val();
    let tarea = $("#tarea1").val();

    Swal.fire({
      title: "Estas seguro de actualizar los siguientes cambios?",
      text: "Favor de confirmar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#61C250",
      cancelButtonColor: "#ea5455",
      confirmButtonText: "Si, actualizar!", //<i class="fa fa-smile-wink"></i>
      cancelButtonText: "No", //<i class="fa fa-frown"></i>
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: "POST",
          url: "/reclutamiento/publicacionesb/mantenimiento_tarea",
          data: {
            post: post,
            correlativo: correlativo,
            id: id,
            tarea: tarea,
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
              $("#modal-agregar1").modal("hide");
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

  // mensaje para eliminar
  // eliminar
  $("#example1 tbody").on("click", "a.delete_tarea", function () {
    let post = 3; //delete
    let correlativo = $("#codigo").val();
    let id = $(this).attr("id");
    let tarea = "";

    Swal.fire({
      title: "Estas seguro de eliminar el siguiente registro?",
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
          url: "/reclutamiento/publicacionesb/mantenimiento_tarea",
          data: {
            post: post,
            correlativo: correlativo,
            id: id,
            tarea: tarea,
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
  //#endregion

  //#region "modal perfil"
  // cargar modal agregar
  $("#btnperfil").on("click", function () {
    $("#perfil-pri").val("");
    $("#modal-agregar-pri").modal("show");
  });

  $("#modal-agregar-pri").on("shown.bs.modal", function () {
    $("#perfil-pri").focus();
  });

  // cancelar
  $("#btncancelar-pri").on("click", function () {
    $("#modal-agregar-pri").modal("hide");
  });

  // insertar nuevo
  $("#btnguardar-pri").on("click", function () {
    let post = 1; //insert
    let correlativo = $("#codigo").val();
    let id = 0;
    let perfil = $("#perfil-pri").val();

    Swal.fire({
      title: "Estas seguro de agregar los siguientes datos?",
      text: "Favor de confirmar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#61C250",
      cancelButtonColor: "#ea5455",
      confirmButtonText: "Si, agregar!", //<i class="fa fa-smile-wink"></i>
      cancelButtonText: "No", //<i class="fa fa-frown"></i>
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: "POST",
          url: "/reclutamiento/publicacionesb/mantenimiento_perfil",
          data: {
            post: post,
            correlativo: correlativo,
            id: id,
            perfil: perfil,
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
              $("#modal-agregar-pri").modal("hide");
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

  // cargar modal editar
  // editar
  $("#example2 tbody").on("click", "a.update_perfil", function () {
    let post = 1; // consulta con codigo y id
    let codigo = $("#codigo").val();
    let id = $(this).attr("id");

    $("#perfilid").val("");
    $("#perfil-pri1").val("");

    $.ajax({
      type: "POST",
      url: "/reclutamiento/publicacionesb/consulta_perfil",
      data: {
        post: post,
        codigo: codigo,
        id: id,
      },
      success: function (res) {
        $("#modal-agregar-pri1").modal("show");
        $("#perfilid").val(res.iid);
        $("#perfil-pri1").val(res.vperfil);
        $("#modal-agregar-pri1").on("shown.bs.modal", function () {
          $("#perfil-pri1").focus();
        });
      },
    });
  });

  // cancelar
  $("#btncancelar-pri1").on("click", function () {
    $("#modal-agregar-pri1").modal("hide");
  });

  // guardar
  $("#btnguardar-pri1").on("click", function () {
    let post = 2; //actualizar
    let correlativo = $("#codigo").val();
    let id = $("#perfilid").val();
    let perfil = $("#perfil-pri1").val();

    Swal.fire({
      title: "Estas seguro de actualizar los siguientes cambios?",
      text: "Favor de confirmar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#61C250",
      cancelButtonColor: "#ea5455",
      confirmButtonText: "Si, actualizar!", //<i class="fa fa-smile-wink"></i>
      cancelButtonText: "No", //<i class="fa fa-frown"></i>
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: "POST",
          url: "/reclutamiento/publicacionesb/mantenimiento_perfil",
          data: {
            post: post,
            correlativo: correlativo,
            id: id,
            perfil: perfil,
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
              $("#modal-agregar-pri1").modal("hide");
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

  // mensaje para eliminar
  // eliminar
  $("#example2 tbody").on("click", "a.delete_perfil", function () {
    let post = 3; //delete
    let correlativo = $("#codigo").val();
    let id = $(this).attr("id");
    let perfil = "";

    Swal.fire({
      title: "Estas seguro de eliminar el siguiente registro?",
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
          url: "/reclutamiento/publicacionesb/mantenimiento_perfil",
          data: {
            post: post,
            correlativo: correlativo,
            id: id,
            perfil: perfil,
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

  //#endregion

  // PARA LISTAR LAS PROVINCIAS
  $("#departamento").change(function () {
    let departamento = $("#departamento").val();
    $.ajax({
      type: "POST",
      url: "/reclutamiento/adaptacionb/cargar_provincia",
      data: { departamento: departamento },
      success: function (res) {
        $("#provincia").html("");
        $("#provincia").append(res.data);
      },
    });
    let provincia = 0;
    $.ajax({
      type: "POST",
      url: "/reclutamiento/adaptacionb/cargar_distritos",
      data: { provincia: provincia },
      success: function (res) {
        $("#distrito").html("");
        $("#distrito").append(res.data);
      },
    });
  });

  // PARA LISTAR LOS DISTRITOS
  $("#provincia").change(function () {
    let provincia = $("#provincia").val();

    $.ajax({
      type: "POST",
      url: "/reclutamiento/adaptacionb/cargar_distritos",
      data: { provincia: provincia },
      success: function (res) {
        $("#distrito").html("");
        $("#distrito").append(res.data);
      },
    });
  });

  $("#btnregistrar").on("click", function () {
    let post = 2; //actualizar
    let titulo = $("#titulo").val();
    let complemento = $("#complemento").val();

    if (titulo == "" || titulo == null) {
      $("#titulo").focus();
      Swal.fire({
        icon: "info",
        title: "Campo título no puede quedar vacío...",
        text: "Favor de completar el campo!",
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    if (complemento == "" || complemento == null) {
      $("#complemento").focus();
      Swal.fire({
        icon: "info",
        title: "Campo complemento no puede quedar vacío...",
        text: "Favor de completar el campo!",
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    let descripcion = $("#mision").val();

    if (descripcion == "" || descripcion == null) {
      $("#mision").focus();
      Swal.fire({
        icon: "info",
        title:
          "No ha ingresado una descripcion para el puesto... el campo no puede quedar vacío...",
        text: "Favor de completar el campo!",
        timer: 4000,
        timerProgressBar: true,
      });
      return;
    }

    let pais = $("#pais").val();

    if (pais == 0 || pais == null) {
      $("#pais").focus();
      Swal.fire({
        icon: "info",
        title: "No ha seleccionado un pais correcto...",
        text: "Favor de seleccionado uno!",
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    let departamento = $("#departamento").val();

    if (departamento == 0 || departamento == null) {
      $("#departamento").focus();
      Swal.fire({
        icon: "info",
        title: "No ha seleccionado un departamento...",
        text: "Favor de seleccionado uno!",
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    let provincia = $("#provincia").val();

    if (provincia == 0 || provincia == null) {
      $("#provincia").focus();
      Swal.fire({
        icon: "info",
        title: "No ha seleccionado una provincia...",
        text: "Favor de seleccionado uno!",
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    let distrito = $("#distrito").val();

    if (distrito == 0 || distrito == null) {
      $("#distrito").focus();
      Swal.fire({
        icon: "info",
        title: "No ha seleccionado un distrito...",
        text: "Favor de seleccionado uno!",
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    let jornada = $("#jornada").val();
    let desc_jornada = ShowSelected("jornada");

    let contrato = $("#contrato").val();

    if (contrato == 0 || contrato == null) {
      $("#contrato").focus();
      Swal.fire({
        icon: "info",
        title: "No ha seleccionado un tipo de contrato...",
        text: "Favor de seleccionado uno!",
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    let salario1 = $("#salario1").val();
    let salario2 = $("#salario2").val();

    if (quitarcomas(salario2) < quitarcomas(salario1)) {
      $("#salario2").focus();
      Swal.fire({
        icon: "info",
        title: "Salario 2 no puede ser menor al salario 1...",
        text: "Favor de ingresar un salario correcto!",
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    let mostrarsalario = check_true("#mostrarsal");

    let fecha = $("#fecha").val();

    if (fecha == "" || fecha == null) {
      $("#fecha").focus();
      Swal.fire({
        icon: "info",
        title: "No ha ingresado una fecha para el puesto...",
        text: "Favor de ingresar una!",
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    let vacantes = $("#vacantes").val();

    if (vacantes == "" || vacantes == null) {
      $("#vacantes").focus();
      Swal.fire({
        icon: "info",
        title: "No ha ingresado la cantidad de vacantes para el puesto...",
        text: "Favor de ingresar una cantidad!",
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    if (vacantes == 0) {
      $("#vacantes").focus();
      Swal.fire({
        icon: "info",
        title: "Cantidad de vacantes no puede ser 0...",
        text: "Favor de ingresar una cantidad válida!",
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    var experiencia = $("#experiencia").val();

    if (experiencia == "" || experiencia == null) {
      experiencia = 0;
    }

    let edadmin = $("#edad-min").val();
    let edadmax = $("#edad-max").val();
    let mostraredad = check_true("#mostraredad");

    if (edadmin == "" || edadmin == null) {
      $("#edad-min").focus();
      Swal.fire({
        icon: "info",
        title: "Edad mínima no puede estar vacía...",
        text: "Favor de ingresar una edad mínima correcta!",
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    if (edadmax == "" || edadmax == null) {
      $("#edad-max").focus();
      Swal.fire({
        icon: "info",
        title: "Edad máxima no puede estar vacía...",
        text: "Favor de ingresar una edad máxima correcta!",
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    if (edadmin < 18) {
      $("#edad-min").focus();
      Swal.fire({
        icon: "info",
        title: "Edad mínima no puede ser menor a 18 años...",
        text: "Favor de ingresar una edad correcta!",
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    if (edadmax > 65) {
      $("#edad-max").focus();
      Swal.fire({
        icon: "info",
        title:
          "Edad máxima no puede superar 65 años...es una personal jubilada",
        text: "Favor de ingresar una edad menor!",
        timer: 4000,
        timerProgressBar: true,
      });
      return;
    }

    let estudios = $("#estudios").val();
    let desc_estudios = ShowSelected("estudios");

    let rdviaje1 = check_true("#rdviajar1");
    let rdviaje2 = check_true("#rdviajar2");

    let rdresidencia1 = check_true("#rdresidencia1");
    let rdresidencia2 = check_true("#rdresidencia2");

    let rddiscapacidad1 = check_true("#discapacidad1");
    let rddiscapacidad2 = check_true("#discapacidad2");

    let correlativo = $("#codigo").val();

    let puesto = 0;

    Swal.fire({
      title: "Estas seguro de actualizar los siguientes cambios?",
      text: "Favor de confirmar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#61C250",
      cancelButtonColor: "#ea5455",
      confirmButtonText: "Si, actualizar!", //<i class="fa fa-smile-wink"></i>
      cancelButtonText: "No", //<i class="fa fa-frown"></i>
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: "POST",
          url: "/reclutamiento/publicacionesb/mantenimiento_publicacionB",
          data: {
            post: post,
            correlativo: correlativo,
            titulo: titulo,
            complemento: complemento,
            descripcion: descripcion,
            pais: pais,
            departamento: departamento,
            provincia: provincia,
            distrito: distrito,
            jornada: jornada,
            descjornada: desc_jornada,
            contrato: contrato,
            salario1: salario1,
            salario2: salario2,
            mostrarsalario: mostrarsalario,
            fecha: fecha,
            vacantes: vacantes,
            experiencia: experiencia,
            edadmin: edadmin,
            edadmax: edadmax,
            mostraredad: mostraredad,
            estudios: estudios,
            descestudios: desc_estudios,
            rdviaje1: rdviaje1,
            rdviaje2: rdviaje2,
            rdresidencia1: rdresidencia1,
            rdresidencia2: rdresidencia2,
            rddiscapacidad1: rddiscapacidad1,
            rddiscapacidad2: rddiscapacidad2,
            puesto: puesto,
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

function quitarcomas(str) {
  var newstr = str.replace(/,/g, "");
  return newstr;
}

function check_true(id) {
  if ($(id).prop("checked")) {
    return true;
  } else {
    return false;
  }
}

function ShowSelected(dato) {
  /* Para obtener el texto */
  var combo = document.getElementById(dato);
  return (selected = combo.options[combo.selectedIndex].text);
}

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
