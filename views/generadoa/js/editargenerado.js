$(function () {
  $(
    "#codigo,#puesto,#fecha,#responid,#impactoid,#organizacionid,#relacionesid,#complejidadid,#transversalesid,#especificasid,#idiomasid,#programasid"
  ).attr("readonly", true);

  //cargar deshabilitado los campos
  //   $(
  //     "#indicar-otro,#anhio-sector,#anhio-personal-acargo,#anhio-puestos-similares,#desc-otro-licencias,#desc-otro-certificaciones"
  //   ).attr("readonly", true);

  creardatatable("#example");
  creardatatable("#example1");
  creardatatable("#example2");
  creardatatable("#example3");
  creardatatable("#tabletransversales");
  creardatatable("#tableespecificas");
  creardatatable("#example4");
  creardatatable("#example5");
  creardatatable("#example6");

  chek_validate("#chkotros", "#indicar-otro");

  chek_validate("#sector", "#anhio-sector");
  chek_validate("#personal-acargo", "#anhio-personal-acargo");
  chek_validate("#puestos-similares", "#anhio-puestos-similares");

  chek_validate("#otro-licencias", "#desc-otro-licencias");
  chek_validate("#otro-certificaciones", "#desc-otro-certificaciones");

  //#region "modal principal responsabilidades"
  // cargar modal agregar
  $("#btnagregar").on("click", function () {
    $("#acciones").val("");
    $("#resultado").val("");
    $("#modal-agregar").modal("show");
  });

  $("#modal-agregar").on("shown.bs.modal", function () {
    $("#acciones").focus();
  });

  // cancelar
  $("#btncancelar").on("click", function () {
    $("#modal-agregar").modal("hide");
  });

  // insertar nuevo
  $("#btnguardar").on("click", function () {
    let post = 1; //insert
    let correlativo = $("#codigo").val();
    let id = 0;
    let accion = $("#acciones").val();
    let resultado = $("#resultado").val();

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
          url: "/reclutamiento/generadoa/mantenimiento_responsabilidades",
          data: {
            post: post,
            correlativo: correlativo,
            id: id,
            acciones: accion,
            resultados: resultado,
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
  $("#example tbody").on("click", "a.update_responsabilidad", function () {
    let post = 1; // consulta con codigo y id
    let codigo = $("#codigo").val();
    let id = $(this).attr("id");

    $("#responid").val("");
    $("#acciones1").val("");
    $("#resultado1").val("");

    $.ajax({
      type: "POST",
      url: "/reclutamiento/generadoa/consulta_responsabilidades",
      data: {
        post: post,
        codigo: codigo,
        id: id,
      },
      success: function (res) {
        $("#modal-agregar1").modal("show");
        $("#responid").val(res.iid);
        $("#acciones1").val(res.vacciones);
        $("#resultado1").val(res.vresultado);
        $("#modal-agregar1").on("shown.bs.modal", function () {
          $("#acciones1").focus();
        });
      },
    });
  });

  // cancelar
  $("#btncancelar1").on("click", function () {
    $("#modal-agregar1").modal("hide");
  });

  // guardar
  $("#btnguardar1").on("click", function () {
    let post = 2; //actualizar
    let correlativo = $("#codigo").val();
    let id = $("#responid").val();
    let accion = $("#acciones1").val();
    let resultado = $("#resultado1").val();

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
          url: "/reclutamiento/generadoa/mantenimiento_responsabilidades",
          data: {
            post: post,
            correlativo: correlativo,
            id: id,
            acciones: accion,
            resultados: resultado,
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
  $("#example tbody").on("click", "a.delete_responsabilidad", function () {
    let post = 3; //delete
    let correlativo = $("#codigo").val();
    let id = $(this).attr("id");
    let accion = "";
    let resultado = "";

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
          url: "/reclutamiento/generadoa/mantenimiento_responsabilidades",
          data: {
            post: post,
            correlativo: correlativo,
            id: id,
            acciones: accion,
            resultados: resultado,
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

  //#region "modal impacto"
  // cargar modal agregar
  $("#btnagregarimpacto").on("click", function () {
    $("#dimension-impacto").val("");
    $("#magnitud-impacto").val("");
    $("#modal-agregar-impacto").modal("show");
  });

  $("#modal-agregar-impacto").on("shown.bs.modal", function () {
    $("#dimension-impacto").focus();
  });

  // cancelar
  $("#btncancelar-impacto").on("click", function () {
    $("#modal-agregar-impacto").modal("hide");
  });

  // insertar nuevo
  $("#btnguardar-impacto").on("click", function () {
    let post = 1; //insert
    let correlativo = $("#codigo").val();
    let id = 0;
    let dimensiones = $("#dimension-impacto").val();
    let magnitudes = $("#magnitud-impacto").val();

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
          url: "/reclutamiento/generadoa/mantenimiento_impacto",
          data: {
            post: post,
            correlativo: correlativo,
            id: id,
            dimensiones: dimensiones,
            magnitudes: magnitudes,
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
  $("#example1 tbody").on("click", "a.update_impacto", function () {
    let post = 1; // consulta con codigo y id
    let codigo = $("#codigo").val();
    let id = $(this).attr("id");

    $("#impactoid").val("");
    $("#dimension-impacto1").val("");
    $("#magnitud-impacto1").val("");

    $.ajax({
      type: "POST",
      url: "/reclutamiento/generadoa/consulta_impacto",
      data: {
        post: post,
        codigo: codigo,
        id: id,
      },
      success: function (res) {
        $("#modal-agregar-impacto1").modal("show");
        $("#impactoid").val(res.iid);
        $("#dimension-impacto1").val(res.vdimensiones);
        $("#magnitud-impacto1").val(res.vmagnitudes);
        $("#modal-agregar-impacto1").on("shown.bs.modal", function () {
          $("#dimension-impacto1").focus();
        });
      },
    });
  });

  // cancelar
  $("#btncancelar-impacto1").on("click", function () {
    $("#modal-agregar-impacto1").modal("hide");
  });

  // guardar
  $("#btnguardar-impacto1").on("click", function () {
    let post = 2; //actualizar
    let correlativo = $("#codigo").val();
    let id = $("#impactoid").val();
    let dimensiones = $("#dimension-impacto1").val();
    let magnitudes = $("#magnitud-impacto1").val();

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
          url: "/reclutamiento/generadoa/mantenimiento_impacto",
          data: {
            post: post,
            correlativo: correlativo,
            id: id,
            dimensiones: dimensiones,
            magnitudes: magnitudes,
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
              $("#modal-agregar-impacto1").modal("hide");
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
  $("#example1 tbody").on("click", "a.delete_impacto", function () {
    let post = 3; //delete
    let correlativo = $("#codigo").val();
    let id = $(this).attr("id");
    let dimensiones = "";
    let magnitudes = "";

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
          url: "/reclutamiento/generadoa/mantenimiento_impacto",
          data: {
            post: post,
            correlativo: correlativo,
            id: id,
            dimensiones: dimensiones,
            magnitudes: magnitudes,
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

  //#region "modal organizacion"
  // cargar modal agregar
  $("#btnagregarorg").on("click", function () {
    $("#puesto-org").val("");
    $("#reporte-org").val("");
    $("#modal-agregar-org").modal("show");
  });

  $("#modal-agregar-org").on("shown.bs.modal", function () {
    $("#puesto-org").focus();
  });

  // cancelar
  $("#btncancelar-org").on("click", function () {
    $("#modal-agregar-org").modal("hide");
  });

  // insertar nuevo
  $("#btnguardar-org").on("click", function () {
    let post = 1; //insert
    let correlativo = $("#codigo").val();
    let id = 0;
    let puestos = $("#puesto-org").val();
    let reportes = $("#reporte-org").val();

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
          url: "/reclutamiento/generadoa/mantenimiento_organizacion",
          data: {
            post: post,
            correlativo: correlativo,
            id: id,
            puestos: puestos,
            reportes: reportes,
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
              $("#modal-agregar-org").modal("hide");
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
  $("#example2 tbody").on("click", "a.update_organizacion", function () {
    let post = 1; // consulta con codigo y id
    let codigo = $("#codigo").val();
    let id = $(this).attr("id");

    $("#organizacionid").val("");
    $("#puesto-org1").val("");
    $("#reporte-org1").val("");

    $.ajax({
      type: "POST",
      url: "/reclutamiento/generadoa/consulta_organizacion",
      data: {
        post: post,
        codigo: codigo,
        id: id,
      },
      success: function (res) {
        $("#modal-agregar-org1").modal("show");
        $("#organizacionid").val(res.iid);
        $("#puesto-org1").val(res.vpuestos);
        $("#reporte-org1").val(res.vreportes);
        $("#modal-agregar-org1").on("shown.bs.modal", function () {
          $("#puesto-org1").focus();
        });
      },
    });
  });

  // cancelar
  $("#btncancelar-org1").on("click", function () {
    $("#modal-agregar-org1").modal("hide");
  });

  // guardar
  $("#btnguardar-org1").on("click", function () {
    let post = 2; //actualizar
    let correlativo = $("#codigo").val();
    let id = $("#organizacionid").val();
    let puestos = $("#puesto-org1").val();
    let reportes = $("#reporte-org1").val();

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
          url: "/reclutamiento/generadoa/mantenimiento_organizacion",
          data: {
            post: post,
            correlativo: correlativo,
            id: id,
            puestos: puestos,
            reportes: reportes,
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
              $("#modal-agregar-org1").modal("hide");
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
  $("#example2 tbody").on("click", "a.delete_organizacion", function () {
    let post = 3; //delete
    let correlativo = $("#codigo").val();
    let id = $(this).attr("id");
    let puestos = "";
    let reportes = "";

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
          url: "/reclutamiento/generadoa/mantenimiento_organizacion",
          data: {
            post: post,
            correlativo: correlativo,
            id: id,
            puestos: puestos,
            reportes: reportes,
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

  //#region "modal responsabilidad por las relaciones"
  // cargar modal agregar
  $("#btnagregarres").on("click", function () {
    $("#entidad-res").val("");
    $("#cargo-res").val("");
    $("#objetivo-res").val("");
    $("#modal-agregar-res").modal("show");
  });

  $("#modal-agregar-res").on("shown.bs.modal", function () {
    $("#entidad-res").focus();
  });

  // cancelar
  $("#btncancelar-res").on("click", function () {
    $("#modal-agregar-res").modal("hide");
  });

  // insertar nuevo
  $("#btnguardar-res").on("click", function () {
    let post = 1; //insert
    let correlativo = $("#codigo").val();
    let id = 0;
    let entidades = $("#entidad-res").val();
    let cargos = $("#cargo-res").val();
    let objetivos = $("#objetivo-res").val();

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
          url: "/reclutamiento/generadoa/mantenimiento_relaciones",
          data: {
            post: post,
            correlativo: correlativo,
            id: id,
            entidades: entidades,
            cargos: cargos,
            objetivos: objetivos,
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
              $("#modal-agregar-res").modal("hide");
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
  $("#example3 tbody").on("click", "a.update_relaciones", function () {
    let post = 1; // consulta con codigo y id
    let codigo = $("#codigo").val();
    let id = $(this).attr("id");

    $("#relacionesid").val("");
    $("#entidad-res1").val("");
    $("#cargo-res1").val("");
    $("#objetivo-res1").val("");

    $.ajax({
      type: "POST",
      url: "/reclutamiento/generadoa/consulta_relaciones",
      data: {
        post: post,
        codigo: codigo,
        id: id,
      },
      success: function (res) {
        $("#modal-agregar-res1").modal("show");
        $("#relacionesid").val(res.iid);
        $("#entidad-res1").val(res.ventidad);
        $("#cargo-res1").val(res.vcargo);
        $("#objetivo-res1").val(res.vobjetivo);
        $("#modal-agregar-res1").on("shown.bs.modal", function () {
          $("#entidad-res1").focus();
        });
      },
    });
  });

  // cancelar
  $("#btncancelar-res1").on("click", function () {
    $("#modal-agregar-res1").modal("hide");
  });

  // guardar
  $("#btnguardar-res1").on("click", function () {
    let post = 2; //actualizar
    let correlativo = $("#codigo").val();
    let id = $("#relacionesid").val();
    let entidades = $("#entidad-res1").val();
    let cargos = $("#cargo-res1").val();
    let objetivos = $("#objetivo-res1").val();

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
          url: "/reclutamiento/generadoa/mantenimiento_relaciones",
          data: {
            post: post,
            correlativo: correlativo,
            id: id,
            entidades: entidades,
            cargos: cargos,
            objetivos: objetivos,
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
              $("#modal-agregar-res1").modal("hide");
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
  $("#example3 tbody").on("click", "a.delete_relaciones", function () {
    let post = 3; //delete
    let correlativo = $("#codigo").val();
    let id = $(this).attr("id");
    let entidades = "";
    let cargos = "";
    let objetivos = "";

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
          url: "/reclutamiento/generadoa/mantenimiento_relaciones",
          data: {
            post: post,
            correlativo: correlativo,
            id: id,
            entidades: entidades,
            cargos: cargos,
            objetivos: objetivos,
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

  //#region "modal complejidad de la posicion"
  // cargar modal agregar
  $("#btnagregarcom").on("click", function () {
    $("#decisiones-com").val("");
    $("#recomendaciones-com").val("");
    $("#modal-agregar-com").modal("show");
  });

  $("#modal-agregar-com").on("shown.bs.modal", function () {
    $("#decisiones-com").focus();
  });

  // cancelar
  $("#btncancelar-com").on("click", function () {
    $("#modal-agregar-com").modal("hide");
  });

  // insertar nuevo
  $("#btnguardar-com").on("click", function () {
    let post = 1; //insert
    let correlativo = $("#codigo").val();
    let id = 0;
    let decisiones = $("#decisiones-com").val();
    let recomendaciones = $("#recomendaciones-com").val();

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
          url: "/reclutamiento/generadoa/mantenimiento_complejidad",
          data: {
            post: post,
            correlativo: correlativo,
            id: id,
            decisiones: decisiones,
            recomendaciones: recomendaciones,
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
              $("#modal-agregar-com").modal("hide");
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
  $("#example4 tbody").on("click", "a.update_complejidad", function () {
    let post = 1; // consulta con codigo y id
    let codigo = $("#codigo").val();
    let id = $(this).attr("id");

    $("#complejidadid").val("");
    $("#decisiones-com1").val("");
    $("#recomendaciones-com1").val("");

    $.ajax({
      type: "POST",
      url: "/reclutamiento/generadoa/consulta_complejidad",
      data: {
        post: post,
        codigo: codigo,
        id: id,
      },
      success: function (res) {
        $("#modal-agregar-com1").modal("show");
        $("#complejidadid").val(res.iid);
        $("#decisiones-com1").val(res.vdecisiones);
        $("#recomendaciones-com1").val(res.vrecomendaciones);
        $("#modal-agregar-com1").on("shown.bs.modal", function () {
          $("#decisiones-com1").focus();
        });
      },
    });
  });

  // cancelar
  $("#btncancelar-com1").on("click", function () {
    $("#modal-agregar-com1").modal("hide");
  });

  // guardar
  $("#btnguardar-com1").on("click", function () {
    let post = 2; //actualizar
    let correlativo = $("#codigo").val();
    let id = $("#complejidadid").val();
    let decisiones = $("#decisiones-com1").val();
    let recomendaciones = $("#recomendaciones-com1").val();

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
          url: "/reclutamiento/generadoa/mantenimiento_complejidad",
          data: {
            post: post,
            correlativo: correlativo,
            id: id,
            decisiones: decisiones,
            recomendaciones: recomendaciones,
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
              $("#modal-agregar-com1").modal("hide");
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
  $("#example4 tbody").on("click", "a.delete_complejidad", function () {
    let post = 3; //delete
    let correlativo = $("#codigo").val();
    let id = $(this).attr("id");
    let decisiones = "";
    let recomendaciones = "";

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
          url: "/reclutamiento/generadoa/mantenimiento_complejidad",
          data: {
            post: post,
            correlativo: correlativo,
            id: id,
            decisiones: decisiones,
            recomendaciones: recomendaciones,
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

  //#region "modal competencia (transversales)"
  // cargar modal agregar
  $("#btnagregartransver").on("click", function () {
    $("#descripcion-transver").val("");
    $("#modal-agregar-transver").modal("show");
  });

  $("#modal-agregar-transver").on("shown.bs.modal", function () {
    $("#descripcion-transver").focus();
  });

  // cancelar
  $("#btncancelar-transver").on("click", function () {
    $("#modal-agregar-transver").modal("hide");
  });

  // insertar nuevo
  $("#btnguardar-transver").on("click", function () {
    let post = 1; //insert
    let correlativo = $("#codigo").val();
    let id = 0;
    let descripcion = $("#descripcion-transver").val();

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
          url: "/reclutamiento/generadoa/mantenimiento_transversal",
          data: {
            post: post,
            correlativo: correlativo,
            id: id,
            descripcion: descripcion,
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
              $("#modal-agregar-transver").modal("hide");
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
  $("#tabletransversales tbody").on(
    "click",
    "a.update_transversales",
    function () {
      let post = 1; // consulta con codigo y id
      let codigo = $("#codigo").val();
      let id = $(this).attr("id");

      $("#transversalesid").val("");
      $("#descripcion-transver1").val("");

      $.ajax({
        type: "POST",
        url: "/reclutamiento/generadoa/consulta_transversal",
        data: {
          post: post,
          codigo: codigo,
          id: id,
        },
        success: function (res) {
          $("#modal-agregar-transver1").modal("show");
          $("#transversalesid").val(res.iid);
          $("#descripcion-transver1").val(res.vdescripcion);
          $("#modal-agregar-transver1").on("shown.bs.modal", function () {
            $("#descripcion-transver1").focus();
          });
        },
      });
    }
  );

  // cancelar
  $("#btncancelar-transver1").on("click", function () {
    $("#modal-agregar-transver1").modal("hide");
  });

  // guardar
  $("#btnguardar-transver1").on("click", function () {
    let post = 2; //actualizar
    let correlativo = $("#codigo").val();
    let id = $("#transversalesid").val();
    let descripcion = $("#descripcion-transver1").val();

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
          url: "/reclutamiento/generadoa/mantenimiento_transversal",
          data: {
            post: post,
            correlativo: correlativo,
            id: id,
            descripcion: descripcion,
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
              $("#modal-agregar-transver1").modal("hide");
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
  $("#tabletransversales tbody").on(
    "click",
    "a.delete_transversales",
    function () {
      let post = 3; //delete
      let correlativo = $("#codigo").val();
      let id = $(this).attr("id");
      let descripcion = "";

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
            url: "/reclutamiento/generadoa/mantenimiento_transversal",
            data: {
              post: post,
              correlativo: correlativo,
              id: id,
              descripcion: descripcion,
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
    }
  );
  //#endregion

  //#region "modal competencia (especificas)"
  // cargar modal agregar
  $("#btnagregarespeci").on("click", function () {
    $("#descripcion-especi").val("");
    $("#modal-agregar-especi").modal("show");
  });

  $("#modal-agregar-especi").on("shown.bs.modal", function () {
    $("#descripcion-especi").focus();
  });

  // cancelar
  $("#btncancelar-especi").on("click", function () {
    $("#modal-agregar-especi").modal("hide");
  });

  // insertar nuevo
  $("#btnguardar-especi").on("click", function () {
    let post = 1; //insert
    let correlativo = $("#codigo").val();
    let id = 0;
    let descripcion = $("#descripcion-especi").val();

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
          url: "/reclutamiento/generadoa/mantenimiento_especifico",
          data: {
            post: post,
            correlativo: correlativo,
            id: id,
            descripcion: descripcion,
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
              $("#modal-agregar-especi").modal("hide");
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
  $("#tableespecificas tbody").on("click", "a.update_especificas", function () {
    let post = 1; // consulta con codigo y id
    let codigo = $("#codigo").val();
    let id = $(this).attr("id");

    $("#especificasid").val("");
    $("#descripcion-especi1").val("");

    $.ajax({
      type: "POST",
      url: "/reclutamiento/generadoa/consulta_especifico",
      data: {
        post: post,
        codigo: codigo,
        id: id,
      },
      success: function (res) {
        $("#modal-agregar-especi1").modal("show");
        $("#especificasid").val(res.iid);
        $("#descripcion-especi1").val(res.vdescripcion);
        $("#modal-agregar-especi1").on("shown.bs.modal", function () {
          $("#descripcion-especi1").focus();
        });
      },
    });
  });

  // cancelar
  $("#btncancelar-especi1").on("click", function () {
    $("#modal-agregar-especi1").modal("hide");
  });

  // guardar
  $("#btnguardar-especi1").on("click", function () {
    let post = 2; //actualizar
    let correlativo = $("#codigo").val();
    let id = $("#especificasid").val();
    let descripcion = $("#descripcion-especi1").val();

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
          url: "/reclutamiento/generadoa/mantenimiento_especifico",
          data: {
            post: post,
            correlativo: correlativo,
            id: id,
            descripcion: descripcion,
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
              $("#modal-agregar-especi1").modal("hide");
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
  $("#tableespecificas tbody").on("click", "a.delete_especificas", function () {
    let post = 3; //delete
    let correlativo = $("#codigo").val();
    let id = $(this).attr("id");
    let descripcion = "";

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
          url: "/reclutamiento/generadoa/mantenimiento_especifico",
          data: {
            post: post,
            correlativo: correlativo,
            id: id,
            descripcion: descripcion,
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

  //#region "modal idioma"
  // cargar modal agregar
  $("#btnagregarpri").on("click", function () {
    $("#idioma-pri").val("");
    $("#modal-agregar-pri").modal("show");
  });

  $("#modal-agregar-pri").on("shown.bs.modal", function () {
    $("#idioma-pri").focus();
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
    let idioma = $("#idioma-pri").val();

    let ihabla = $("#habla-pri").val();
    let ilee = $("#lee-pri").val();
    let iescribe = $("#escribe-pri").val();

    let vhabla = ShowSelected("habla-pri");
    let vlee = ShowSelected("lee-pri");
    let vescribe = ShowSelected("escribe-pri");

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
          url: "/reclutamiento/generadoa/mantenimiento_idioma",
          data: {
            post: post,
            correlativo: correlativo,
            id: id,
            idioma: idioma,
            ihabla: ihabla,
            ilee: ilee,
            iescribe: iescribe,
            vhabla: vhabla,
            vlee: vlee,
            vescribe: vescribe,
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
  $("#example5 tbody").on("click", "a.update_idiomas", function () {
    let post = 1; // consulta con codigo y id
    let codigo = $("#codigo").val();
    let id = $(this).attr("id");

    $("#idiomasid").val("");

    $.ajax({
      type: "POST",
      url: "/reclutamiento/generadoa/consulta_idioma",
      data: {
        post: post,
        codigo: codigo,
        id: id,
      },
      success: function (res) {
        $("#modal-agregar-pri1").modal("show");
        $("#idiomasid").val(res.iid);
        $("#idioma-pri1").val(res.vidioma);
        $("#habla-pri1").val(res.vhabla);
        $("#lee-pri1").val(res.vlee);
        $("#escribe-pri1").val(res.vescribe);
        $("#modal-agregar-pri1").on("shown.bs.modal", function () {
          $("#idioma-pri1").focus();
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
    let id = $("#idiomasid").val();
    let idioma = $("#idioma-pri1").val();

    let ihabla = $("#habla-pri1").val();
    let ilee = $("#lee-pri1").val();
    let iescribe = $("#escribe-pri1").val();

    let vhabla = ShowSelected("habla-pri1");
    let vlee = ShowSelected("lee-pri1");
    let vescribe = ShowSelected("escribe-pri1");

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
          url: "/reclutamiento/generadoa/mantenimiento_idioma",
          data: {
            post: post,
            correlativo: correlativo,
            id: id,
            idioma: idioma,
            ihabla: ihabla,
            ilee: ilee,
            iescribe: iescribe,
            vhabla: vhabla,
            vlee: vlee,
            vescribe: vescribe,
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
  $("#example5 tbody").on("click", "a.delete_idiomas", function () {
    let post = 3; //delete
    let correlativo = $("#codigo").val();
    let id = $(this).attr("id");
    let idioma = "";

    let ihabla = "";
    let ilee = "";
    let iescribe = "";

    let vhabla = "";
    let vlee = "";
    let vescribe = "";

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
          url: "/reclutamiento/generadoa/mantenimiento_idioma",
          data: {
            post: post,
            correlativo: correlativo,
            id: id,
            idioma: idioma,
            ihabla: ihabla,
            ilee: ilee,
            iescribe: iescribe,
            vhabla: vhabla,
            vlee: vlee,
            vescribe: vescribe,
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

  //#region "modal programas"
  // cargar modal agregar
  $("#btnagregarpro").on("click", function () {
    $("#informatico-pro").val("");
    $("#modal-agregar-pro").modal("show");
  });

  $("#modal-agregar-pro").on("shown.bs.modal", function () {
    $("#informatico-pro").focus();
  });

  // cancelar
  $("#btncancelar-pro").on("click", function () {
    $("#modal-agregar-pro").modal("hide");
  });

  // insertar nuevo
  $("#btnguardar-pro").on("click", function () {
    let post = 1; //insert
    let correlativo = $("#codigo").val();
    let id = 0;
    let programa = $("#informatico-pro").val();
    let inivel = $("#nivel-informatico-pro").val();
    let vnivel = ShowSelected("nivel-informatico-pro");

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
          url: "/reclutamiento/generadoa/mantenimiento_programa",
          data: {
            post: post,
            correlativo: correlativo,
            id: id,
            programa: programa,
            inivel: inivel,
            vnivel: vnivel,
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
              $("#modal-agregar-pro").modal("hide");
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
  $("#example6 tbody").on("click", "a.update_programas", function () {
    let post = 1; // consulta con codigo y id
    let codigo = $("#codigo").val();
    let id = $(this).attr("id");

    $("#programasid").val("");

    $.ajax({
      type: "POST",
      url: "/reclutamiento/generadoa/consulta_programa",
      data: {
        post: post,
        codigo: codigo,
        id: id,
      },
      success: function (res) {
        $("#modal-agregar-pro1").modal("show");
        $("#programasid").val(res.iid);
        $("#informatico-pro1").val(res.vprograma);
        $("#nivel-informatico-pro1").val(res.vnivel);
        $("#modal-agregar-pro1").on("shown.bs.modal", function () {
          $("#informatico-pro1").focus();
        });
      },
    });
  });

  // cancelar
  $("#btncancelar-pro1").on("click", function () {
    $("#modal-agregar-pro1").modal("hide");
  });

  // guardar
  $("#btnguardar-pro1").on("click", function () {
    let post = 2; //actualizar
    let correlativo = $("#codigo").val();
    let id = $("#programasid").val();
    let programa = $("#informatico-pro1").val();
    let inivel = $("#nivel-informatico-pro1").val();
    let vnivel = ShowSelected("nivel-informatico-pro1");

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
          url: "/reclutamiento/generadoa/mantenimiento_programa",
          data: {
            post: post,
            correlativo: correlativo,
            id: id,
            programa: programa,
            inivel: inivel,
            vnivel: vnivel,
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
              $("#modal-agregar-pro1").modal("hide");
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
  $("#example6 tbody").on("click", "a.delete_programas", function () {
    let post = 3; //delete
    let correlativo = $("#codigo").val();
    let id = $(this).attr("id");
    let programa = "";
    let inivel = "";
    let vnivel = "";

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
          url: "/reclutamiento/generadoa/mantenimiento_programa",
          data: {
            post: post,
            correlativo: correlativo,
            id: id,
            programa: programa,
            inivel: inivel,
            vnivel: vnivel,
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

  $("#btngrabarmon").on("click", function () {
    
    let post = 2; // update
    let codigo = $("#codigo").val();

    let estado = $("#estado").val();

    let puesto = 0;
    let fecha = "";
    let elaborado = $("#elaborado").val();
    let revisado = $("#revisado").val();
    let gerencia = $("#gerencia").val();
    let reporta = $("#reporta").val();

    if (elaborado == "" || elaborado == null) {
      $("#elaborado").focus();
      Swal.fire({
        icon: "info",
        title: "Campo Elaborado por... no puede quedar vacío...",
        text: "Favor de completar el campo!",
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    if (revisado == "" || revisado == null) {
      $("#revisado").focus();
      Swal.fire({
        icon: "info",
        title: "Campo Revisado por... no puede quedar vacío...",
        text: "Favor de completar el campo!",
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    if (gerencia == "" || gerencia == null) {
      $("#gerencia").focus();
      Swal.fire({
        icon: "info",
        title: "Campo Gerencia... no puede quedar vacío...",
        text: "Favor de completar el campo!",
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    if (reporta == "" || reporta == null) {
      $("#reporta").focus();
      Swal.fire({
        icon: "info",
        title: "Campo Posición a la que reporta... no puede quedar vacío...",
        text: "Favor de completar el campo!",
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    let mision = $("#mision").val();

    if (mision == "" || mision == null) {
      $("#mision").focus();
      Swal.fire({
        icon: "info",
        title:
          "No ha ingresado la misión del puesto... el campo no puede quedar vacío...",
        text: "Favor de completar el campo!",
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    let organizacion = $("#posicion").val();

    if (organizacion == "" || organizacion == null) {
      $("#posicion").focus();
      Swal.fire({
        icon: "info",
        title:
          "No ha ingresado la posición del jefe directo... el campo no puede quedar vacío...",
        text: "Favor de completar el campo!",
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    let complejidad = $("#descripcion-com").val();

    if (complejidad == "" || complejidad == null) {
      $("#descripcion-com").focus();
      Swal.fire({
        icon: "info",
        title:
          "No ha ingresado la complejidad del puesto... el campo no puede quedar vacío...",
        text: "Favor de completar el campo!",
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    let chktecnico = check_true("#chktecnico");
    let chkuniversitario = check_true("#chkuniversitario");
    let chkpostgrado = check_true("#chkpostgrado");
    let chkotros = check_true("#chkotros");

    if (
      check_true("#chktecnico") !== true &&
      check_true("#chkuniversitario") !== true &&
      check_true("#chkpostgrado") !== true &&
      check_true("#chkotros") !== true
    ) {
      Swal.fire({
        icon: "info",
        title: "No ha ckeckeado ningun nivel de instrucción...",
        text: "Favor de ckeckear al menos uno!",
        timer: 4000,
        timerProgressBar: true,
      });
      return;
    }

    let indicar_otro = $("#indicar-otro").val();

    if (check_true("#chkotros") == true) {
      if (indicar_otro == "" || indicar_otro == null) {
        $("#indicar-otro").focus();
        Swal.fire({
          icon: "info",
          title:
            "Favor de ingresar otra instrucción... campo no puede quedar vacío...",
          text: "Favor de completar el campo!",
          timer: 4000,
          timerProgressBar: true,
        });
        return;
      }
    }

    let profesion = $("#profesion").val();

    if (profesion == "" || profesion == null) {
      $("#profesion").focus();
      Swal.fire({
        icon: "info",
        title:
          "No ha ingresado la carrera profesional y/o técnica... el campo no puede quedar vacío...",
        text: "Favor de completar el campo!",
        timer: 4000,
        timerProgressBar: true,
      });
      return;
    }

    let rd1 = "";
    if ($("#customRadio1").is(":checked")) {
      rd1 = "true";
    } else {
      rd1 = "false";
    }

    let rd2 = "";
    if ($("#customRadio2").is(":checked")) {
      rd2 = "true";
    } else {
      rd2 = "false";
    }

    if (
      check_true("#sector") !== true &&
      check_true("#personal-acargo") !== true &&
      check_true("#puestos-similares") !== true
    ) {
      Swal.fire({
        icon: "info",
        title: "No ha ckeckeado ningun experiencia previa...",
        text: "Favor de ckeckear al menos uno!",
        timer: 4000,
        timerProgressBar: true,
      });
      return;
    }

    if (check_true("#sector") == true) {
      if ($("#anhio-sector").val() == "" || $("#anhio-sector").val() == null) {
        $("#anhio-sector").focus();
        Swal.fire({
          icon: "info",
          title:
            "Favor de ingresar los años en el sector... campo no puede quedar vacío...",
          text: "Favor de completar el campo!",
          timer: 4000,
          timerProgressBar: true,
        });
        return;
      }
    }

    if (check_true("#personal-acargo") == true) {
      if (
        $("#anhio-personal-acargo").val() == "" ||
        $("#anhio-personal-acargo").val() == null
      ) {
        $("#anhio-personal-acargo").focus();
        Swal.fire({
          icon: "info",
          title:
            "Favor de ingresar los años con personal a cargo... campo no puede quedar vacío...",
          text: "Favor de completar el campo!",
          timer: 4000,
          timerProgressBar: true,
        });
        return;
      }
    }

    if (check_true("#puestos-similares") == true) {
      if (
        $("#anhio-puestos-similares").val() == "" ||
        $("#anhio-puestos-similares").val() == null
      ) {
        $("#anhio-puestos-similares").focus();
        Swal.fire({
          icon: "info",
          title:
            "Favor de ingresar los años en puestos similares... campo no puede quedar vacío...",
          text: "Favor de completar el campo!",
          timer: 4000,
          timerProgressBar: true,
        });
        return;
      }
    }

    let sector = check_true("#sector");
    let anhio_sector = $("#anhio-sector").val();

    let personal_acargo = check_true("#personal-acargo");
    let anhio_personal = $("#anhio-personal-acargo").val();

    let puestos_similares = check_true("#puestos-similares");
    let anhio_puestos = $("#anhio-puestos-similares").val();

    let conocimiento = $("#conocimientos").val();

    if (conocimiento == "" || conocimiento == null) {
      $("#conocimientos").focus();
      Swal.fire({
        icon: "info",
        title:
          "No ha ingresado los conocimiento específicos del puesto... el campo no puede quedar vacío...",
        text: "Favor de completar el campo!",
        timer: 4000,
        timerProgressBar: true,
      });
      return;
    }

    if (check_true("#otro-licencias") == true) {
      if (
        $("#desc-otro-licencias").val() == "" ||
        $("#desc-otro-licencias").val() == null
      ) {
        $("#desc-otro-licencias").focus();
        Swal.fire({
          icon: "info",
          title:
            "Favor de ingresar las licencias para el cargo... campo no puede quedar vacío...",
          text: "Favor de completar el campo!",
          timer: 4000,
          timerProgressBar: true,
        });
        return;
      }
    }

    if (check_true("#otro-certificaciones") == true) {
      if (
        $("#desc-otro-certificaciones").val() == "" ||
        $("#desc-otro-certificaciones").val() == null
      ) {
        $("#desc-otro-certificaciones").focus();
        Swal.fire({
          icon: "info",
          title:
            "Favor de ingresar las otras certificaciones para el cargo... campo no puede quedar vacío...",
          text: "Favor de completar el campo!",
          timer: 4000,
          timerProgressBar: true,
        });
        return;
      }
    }

    let otro_licencias = check_true("#otro-licencias");
    let desc_licencias = $("#desc-otro-licencias").val();

    let otro_certificaciones = check_true("#otro-certificaciones");
    let desc_certificaciones = $("#desc-otro-certificaciones").val();

    Swal.fire({
      title: "Estas seguro de Guardar el siguiente puesto?",
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
});

// crear tabla
function creardatatable(nombretabla) {
  var tabla = $(nombretabla).dataTable({
    lengthChange: true,
    responsive: true,
    autoWidth: false,
    bAutoWidth: false,
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
    lengthMenu: [
      [10, 25, 50, -1],
      ["10", "25", "50", "Todo"],
    ],
  });
  return tabla;
}

// validador de campos checked
function chek_validate(check, campo) {
  if ($(check).is(":checked")) {
    $(campo).attr("readonly", false);
  } else {
    $(campo).attr("readonly", true);
  }
}

// Comprobar cuando cambia un checkbox (Instrucción)
$("input[id='chkotros']").on("change", function () {
  if ($(this).is(":checked")) {
    $("#indicar-otro").attr("readonly", false);
  } else {
    $("#indicar-otro").attr("readonly", true);
    $("#indicar-otro").val("");
  }
});

// Comprobar cuando cambia un checkbox (Experiencia previa)
$("input[id='sector']").on("change", function () {
  if ($(this).is(":checked")) {
    $("#anhio-sector").attr("readonly", false);
  } else {
    $("#anhio-sector").attr("readonly", true);
    $("#anhio-sector").val("");
  }
});

$("input[id='personal-acargo']").on("change", function () {
  if ($(this).is(":checked")) {
    $("#anhio-personal-acargo").attr("readonly", false);
  } else {
    $("#anhio-personal-acargo").attr("readonly", true);
    $("#anhio-personal-acargo").val("");
  }
});

$("input[id='puestos-similares']").on("change", function () {
  if ($(this).is(":checked")) {
    $("#anhio-puestos-similares").attr("readonly", false);
  } else {
    $("#anhio-puestos-similares").attr("readonly", true);
    $("#anhio-puestos-similares").val("");
  }
});

// Licencias
$("input[id='otro-licencias']").on("change", function () {
  if ($(this).is(":checked")) {
    $("#desc-otro-licencias").attr("readonly", false);
  } else {
    $("#desc-otro-licencias").attr("readonly", true);
    $("#desc-otro-licencias").val("");
  }
});

// Certificaciones
$("input[id='otro-certificaciones']").on("change", function () {
  if ($(this).is(":checked")) {
    $("#desc-otro-certificaciones").attr("readonly", false);
  } else {
    $("#desc-otro-certificaciones").attr("readonly", true);
    $("#desc-otro-certificaciones").val("");
  }
});

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

$(".char-textarea-complejidad").on("keyup", function (event) {
  checkTextAreaMaxLength(
    this,
    event,
    ".textarea-counter-value",
    ".char-textarea-complejidad",
    ".char-count-complejidad"
  );
  $(this).addClass("active");
});

$(".char-textarea-conocimientos").on("keyup", function (event) {
  checkTextAreaMaxLength(
    this,
    event,
    ".textarea-counter-value",
    ".char-textarea-conocimientos",
    ".char-count-conocimientos"
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

function check_true(id) {
  if ($(id).prop("checked")) {
    return true;
  } else {
    return false;
  }
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

function ShowSelected(dato) {
  /* Para obtener el texto */
  var combo = document.getElementById(dato);
  return (selected = combo.options[combo.selectedIndex].text);
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
