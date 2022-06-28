$(function () {
  //cargar bloqueado los botones
  $(
    "#postulante,#publicacion,#estado,#fsalida,#frsalida,#icontrato,#fcontrato,#codvendedor,#codessalud,#codafp,#codigoeps"
  ).attr("readonly", true);

  creardatatable("#example1"); //tabla.- agregar hijos

  //combos disabled
  $("#regimen,#puesto").attr("disabled", true);

  // PARA LISTAR LAS PROVINCIAS
  $("#departamento").change(function () {
    let departamento = $("#departamento").val();
    $.ajax({
      type: "POST",
      url: "/reclutamiento/entrevistab/cargar_provincia",
      data: { departamento: departamento },
      success: function (res) {
        $("#provincia").html("");
        $("#provincia").append(res.data);
      },
    });
    let provincia = 0;
    $.ajax({
      type: "POST",
      url: "/reclutamiento/entrevistab/cargar_distritos",
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
      url: "/reclutamiento/entrevistab/cargar_distritos",
      data: { provincia: provincia },
      success: function (res) {
        $("#distrito").html("");
        $("#distrito").append(res.data);
      },
    });
  });

  $("#btnagregar").on("click", function () {
    $("#nombrehijos").val("");
    $("#fechahijos").val("");
    $("#modal-agregar").modal("show");
  });

  $("#modal-agregar").on("shown.bs.modal", function () {
    $("#nombrehijos").focus();
  });

  var counthijos = 1;
  var datoshijos = [];
  // guardar
  $("#btnguardar").on("click", function () {
    let nomhijo = $("#nombrehijos").val();
    let fecha = $("#fechahijos").val();

    if (nomhijo == "" || nomhijo == null) {
      $("#nomhijo").focus();
      Swal.fire({
        icon: "info",
        title: "No ha ingresado el nombre de su hijo(a) ",
        text: "Favor de ingresarlo!",
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    if (fecha == "" || fecha == null) {
      $("#fechahijos").focus();
      Swal.fire({
        icon: "info",
        title: "No ha ingresado la fecha de nacimiento de su hijo " + nomhijo,
        text: "Favor de ingresarlo y aceptar!",
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    $("#example1").dataTable().fnDestroy();

    let nombrehijos = $("#nombrehijos").val();
    let fechahijos = $("#fechahijos").val();
    let edadhijo = calcularEdad(fechahijos);

    let fila =
      "<tr>\
          <td class='text-center'>" +
      counthijos +
      "</td>\
          <td class='text-left'>" +
      nombrehijos +
      "</td>\
          <td class='text-center'>" +
      fechahijos +
      "</td>\
          <td class='text-center'>" +
      edadhijo +
      "</td>\
          <td class='text-center'>\
            <a id=" +
      counthijos +
      " class='btn btn-danger btn-sm text-white delete'>\
              <span><b>Eliminar</b></span>\
            </a>\
          </td>\
        </tr>";

    let btn = document.createElement("tr");
    btn.innerHTML = fila;
    document.getElementById("tablita-hijos").appendChild(btn);

    datoshijos.push({
      id: counthijos,
      nombre: nombrehijos,
      fecha: fechahijos,
      edad: edadhijo,
    });

    console.log(datoshijos);
    // console.log(JSON.stringify(datoshijos));

    counthijos = counthijos + 1;

    creardatatable("#example1");

    $("#modal-agregar").modal("hide");
  });

  // cancelar guardar
  $("#btncancelar").on("click", function () {
    $("#modal-agregar").modal("hide");
  });

  //eliminar datos
  $("#example1 tbody").on("click", "a.delete", function () {
    let id = parseInt($(this).attr("id"));

    Swal.fire({
      title: "Estas seguro de eliminar el registro?",
      text: "Favor de confirmar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#61C250",
      cancelButtonColor: "#ea5455",
      confirmButtonText: "Si, eliminar!", //<i class="fa fa-smile-wink"></i>
      cancelButtonText: "No", //<i class="fa fa-frown"></i>
    }).then((result) => {
      if (result.isConfirmed) {
        $("#example1").dataTable().fnDestroy();
        // luego buscamos el dato dentro del array de objetos
        let index = datoshijos.findIndex((item) => item.id === id);

        // aqui se elimina el objeto
        datoshijos.splice(index, 1);

        // quitamos las lineas
        $("#tablita-hijos").children().remove();

        // recorremos el array de objetos para rearmar la tabla nuevamente
        let myArray = [];
        let contador = 1;

        for (const property in datoshijos) {
          let nombreshijos = datoshijos[property].nombre;
          let fechahijos = datoshijos[property].fecha;
          let edadhijos = datoshijos[property].edad;

          let fila =
            "<tr>\
            <td class='text-center'>" +
            contador +
            "</td>\
            <td class='text-left'>" +
            nombreshijos +
            "</td>\
            <td class='text-center'>" +
            fechahijos +
            "</td>\
            <td class='text-center'>" +
            edadhijos +
            "</td>\
            <td class='text-center'>\
              <a id=" +
            contador +
            " class='btn btn-danger btn-sm text-white delete'>\
                <span><b>Eliminar</b></span>\
              </a>\
            </td>\
          </tr>";

          let btn = document.createElement("tr");
          btn.innerHTML = fila;
          document.getElementById("tablita-hijos").appendChild(btn);

          myArray.push({
            id: contador,
            nombre: nombreshijos,
            fecha: fechahijos,
            edad: edadhijos,
          });

          contador = contador + 1;
        }

        creardatatable("#example1");

        datoshijos.splice(0, datoshijos.length);

        datoshijos = myArray;
        counthijos = contador;
      }
    });
  });

  //registrar datos
  $("#btngrabar").on("click", function () {
    let post = 1; //insert
    let postulante = $("#postulante").val();
    let publicacion = $("#publicacion").val();
    let puesto = $("#puesto").val(); //NO

    let nombres = $("#nombres").val();
    let paterno = $("#paterno").val();
    let materno = $("#materno").val();
    let fecha = $("#fecha").val();
    let tipodocumento = $("#tipodocumento").val(); //NO
    let dni = $("#dni").val();
    let sexo = $("#sexo").val();
    let civil = $("#civil").val(); //NO
    let pais = $("#pais").val();
    let departamento = $("#departamento").val();
    let provincia = $("#provincia").val();
    let distrito = $("#distrito").val();
    let domicilio_actual = $("#domicilio_actual").val();
    let celular = $("#celular").val();
    let correo = $("#correo").val();

    let acepto = check_true("#acepto");

    if (nombres == "" || nombres == null) {
      $("#bt1").trigger("click");
      $("#nombres").focus();
      Swal.fire({
        icon: "info",
        title: "No ha ingresado sus nombres...",
        text: "Favor de completar el campo!",
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    if (paterno == "" || paterno == null) {
      $("#bt1").trigger("click");
      $("#paterno").focus();
      Swal.fire({
        icon: "info",
        title: "No ha ingresado su apellido paterno...",
        text: "Favor de completar el campo!",
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    if (materno == "" || materno == null) {
      $("#bt1").trigger("click");
      $("#materno").focus();
      Swal.fire({
        icon: "info",
        title: "No ha ingresado su apellido materno...",
        text: "Favor de completar el campo!",
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    if (fecha == "" || fecha == null) {
      $("#bt1").trigger("click");
      $("#fecha").focus();
      Swal.fire({
        icon: "info",
        title: "No ha ingresado su fecha de nacimiento...",
        text: "Favor de completar el campo!",
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    if (dni == "" || dni == null) {
      $("#bt1").trigger("click");
      $("#dni").focus();
      Swal.fire({
        icon: "info",
        title: "No ha ingresado su dni/ce...",
        text: "Favor de completar el campo!",
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    if (sexo == 0) {
      $("#bt1").trigger("click");
      $("#sexo").focus();
      Swal.fire({
        icon: "info",
        title: "No ha seleccionado su sexo...",
        text: "Favor de seleccionar uno!",
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    if (pais == 0) {
      $("#bt1").trigger("click");
      $("#pais").focus();
      Swal.fire({
        icon: "info",
        title: "No ha seleccionado su pais...",
        text: "Favor de seleccionar uno!",
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    if (departamento == 0) {
      $("#bt1").trigger("click");
      $("#departamento").focus();
      Swal.fire({
        icon: "info",
        title: "No ha seleccionado un departamento...",
        text: "Favor de seleccionar uno!",
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    if (provincia == 0) {
      $("#bt1").trigger("click");
      $("#provincia").focus();
      Swal.fire({
        icon: "info",
        title: "No ha seleccionado una provincia...",
        text: "Favor de seleccionar uno!",
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    if (distrito == 0) {
      $("#bt1").trigger("click");
      $("#distrito").focus();
      Swal.fire({
        icon: "info",
        title: "No ha seleccionado un distrito...",
        text: "Favor de seleccionar uno!",
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    if (domicilio_actual == "" || domicilio_actual == null) {
      $("#bt1").trigger("click");
      $("#domicilio_actual").focus();
      Swal.fire({
        icon: "info",
        title: "No ha ingresado su domicilio actual...",
        text: "Favor de completar el campo!",
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    if (celular == "" || celular == null) {
      $("#bt1").trigger("click");
      $("#celular").focus();
      Swal.fire({
        icon: "info",
        title: "No ha ingresado su numero de celular...",
        text: "Favor de completar el campo!",
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    if (correo == "" || correo == null) {
      $("#bt1").trigger("click");
      $("#correo").focus();
      Swal.fire({
        icon: "info",
        title: "No ha ingresado su correo...",
        text: "Favor de completar el campo!",
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    let tieneseguro = $("#tieneseguro").val();
    let codessalud = $("#codessalud").val();
    let domiciliado = $("#domiciliado").val();
    let afp = $("#afp").val();
    let comfluapf = $("#comfluapf").val();
    let codafp = $("#codafp").val();

    let regimen = $("#regimen").val(); //NO
    let niveleducacion = $("#niveleducacion").val();
    let discapacidad = $("#discapacidad").val();

    if (niveleducacion == 0) {
      $("#bt4").trigger("click");
      $("#niveleducacion").focus();
      Swal.fire({
        icon: "info",
        title: "No ha seleccionado un nivel de educación...",
        text: "Favor de seleccionar uno!",
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    if (check_true("#acepto") == false) {
      $("#bt5").trigger("click");
      $("#acepto").focus();
      Swal.fire({
        icon: "info",
        title: "No ha aceptado nuestros terminos y condiciones...",
        text: "Favor de marcar el check!",
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    if (datoshijos.length == "" || datoshijos.length == null) {
      Swal.fire({
        title: "Estas seguro de continuar?",
        text: "No ha ingresado ningun hijo en la pestaña 2!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#61C250",
        cancelButtonColor: "#ea5455",
        confirmButtonText: "Si, continuar!", //<i class="fa fa-smile-wink"></i>
        cancelButtonText: "No", //<i class="fa fa-frown"></i>
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Estas seguro de guardar los datos ingresado?",
            text: "Esta acción no se puede deshacer!",
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
                url: "/reclutamiento/entrevistab/mantenimiento_personal",
                data: {
                  post: post,
                  postulante: postulante,
                  publicacion: publicacion,
                  puesto: puesto,
                  nombres: nombres,
                  paterno: paterno,
                  materno: materno,
                  fecha: fecha,
                  tipodocumento: tipodocumento,
                  dni: dni,
                  sexo: sexo,
                  civil: civil,
                  pais: pais,
                  departamento: departamento,
                  provincia: provincia,
                  distrito: distrito,
                  domicilio_actual: domicilio_actual,
                  celular: celular,
                  correo: correo,
                  datoshijos: datoshijos, //array hijos
                  tieneseguro: tieneseguro,
                  codessalud: codessalud,
                  domiciliado: domiciliado,
                  afp: afp,
                  comfluapf: comfluapf,
                  codafp: codafp,
                  regimen: regimen,
                  niveleducacion: niveleducacion,
                  discapacidad: discapacidad,
                  acepto: acepto,
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
                      location.href =
                        "https://verdum.com/reclutamiento/mispostulaciones/index";
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
        }
      });
    } else {
      Swal.fire({
        title: "Estas seguro de guardar los datos ingresado?",
        text: "Esta acción no se puede deshacer!",
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
            url: "/reclutamiento/entrevistab/mantenimiento_personal",
            data: {
              post: post,
              postulante: postulante,
              publicacion: publicacion,
              puesto: puesto,
              nombres: nombres,
              paterno: paterno,
              materno: materno,
              fecha: fecha,
              tipodocumento: tipodocumento,
              dni: dni,
              sexo: sexo,
              civil: civil,
              pais: pais,
              departamento: departamento,
              provincia: provincia,
              distrito: distrito,
              domicilio_actual: domicilio_actual,
              celular: celular,
              correo: correo,
              datoshijos: datoshijos, //array hijos
              tieneseguro: tieneseguro,
              codessalud: codessalud,
              domiciliado: domiciliado,
              afp: afp,
              comfluapf: comfluapf,
              codafp: codafp,
              regimen: regimen,
              niveleducacion: niveleducacion,
              discapacidad: discapacidad,
              acepto: acepto,
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
                  location.href =
                    "https://verdum.com/reclutamiento/mispostulaciones/index";
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
                var id = setInterval(function () {
                  location.href =
                    "https://verdum.com/reclutamiento/reclutamiento/mispostulaciones/index";
                  clearInterval(id);
                }, res.itimer);
              }
            },
          });
        }
      });
    }

    // console.log(puesto);
    // console.log(nombres);
    // console.log(paterno);
    // console.log(materno);

    // console.log(fecha);
    // console.log(tipodocumento);
    // console.log(dni);
    // console.log(sexo);
    // console.log(civil);
    // console.log(pais);
    // console.log(departamento);

    // console.log(provincia);
    // console.log(distrito);
    // console.log(domicilio_actual);
    // console.log(celular);
    // console.log(correo);

    // console.log(datoshijos); //array

    // console.log(tieneseguro);
    // console.log(codessalud);
    // console.log(domiciliado);
    // console.log(afp);
    // console.log(comfluapf);
    // console.log(codafp);

    // console.log(regimen);
    // console.log(niveleducacion);
    // console.log(discapacidad);
  });
});

function check_true(id) {
  if ($(id).prop("checked")) {
    return true;
  } else {
    return false;
  }
}

function calcularEdad(fecha) {
  var hoy = new Date();
  var cumpleanos = new Date(fecha);
  var edad = hoy.getFullYear() - cumpleanos.getFullYear();
  var m = hoy.getMonth() - cumpleanos.getMonth();

  if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
    edad--;
  }

  return edad;
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
    order: [[0, "asc"]],
  });
  return tabla;
}

// SOLO LETRAS
function sololetras(event) {
  var regex = new RegExp("^[a-zA-Z ]+$");
  var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
  if (!regex.test(key)) {
    event.preventDefault();
    return false;
  }
}

// SOLO NÚMEROS
function solonumero(event) {
  var regex = new RegExp("^[0-9]+$");
  var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
  if (!regex.test(key)) {
    event.preventDefault();
    return false;
  }
}

// HABILITAR CODIGO ESSALUD
$("#tieneseguro").change(function () {
  if ($(this).val() == 2) {
    $("#codessalud").attr("readonly", true);
    $("#codessalud").val("");
  } else {
    $("#codessalud").attr("readonly", false);
  }
});

// HABILITAR COMISION / FLUJO Y CODIGO AFP
$("#afp").change(function () {
  if ($(this).val() == 0) {
    $("#codafp").attr("readonly", true);
    $("#codafp").val("");
    $("#comfluapf").val("0");
    $("#comfluapf").prop("disabled", true);
  } else if ($(this).val() == "SNP" || $(this).val() == "SRP") {
    $("#codafp").attr("readonly", true);
    $("#codafp").val("");
    $("#comfluapf").val("0");
    $("#comfluapf").prop("disabled", true);
  } else {
    $("#codafp").attr("readonly", false);
    $("#comfluapf").prop("disabled", false);
  }
});
