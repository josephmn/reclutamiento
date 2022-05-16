$(function () {
  //cargar deshabilitado los input
  $(
    "#postulacion,#puesto,#codigo,#postulante,#dpostulacion,#dpuesto,#dcodigo,#dpostulante,#ucita,#upostulacion,#upuesto,#ucodigo,#upostulante,#ecita-id,#xpostulacion,#xpuesto,#xcodigo,#xpostulante"
  ).attr("readonly", true);

  //cargar deshabilitado los input
  $(
    "#codigo,#nombres,#apellidos,#clavecon,#pospublicacion,#posid,#postpara"
  ).attr("readonly", true);

  creardatatable("#example1", 10, 1, "asc"); //tabla.- index
  creardatatable("#example2", 5, 0, "asc"); //tabla.- categoria
  creardatatable("#example3", 5, 0, "asc"); //tabla.- nota
  creardatatable("#example4", 5, 0, "asc"); //tabla.- archivo

  // MODAL CONTROL (inicio) //
  $("#example1 tbody").on("click", "a.control", function () {
    let id = $(this).attr("id");
    let titulo = $(this).attr("vtitulo");
    let codigo = $(this).attr("vpublicacion");
    let postulante = $(this).attr("ipostulante");

    //notas
    $("#postulacion").val(codigo);
    $("#puesto").val(titulo);
    $("#codigo").val("");
    $("#postulante").val("");
    $("#nota").val("");
    $("#div-00").html("");
    $("#dcategoria").html("");

    //agenda
    $("#dpostulacion").val(codigo);
    $("#dpuesto").val(titulo);
    $("#dcategoria").val(0);
    $("#dfechainicio").val("");
    $("#dfechafin").val("");
    $("#mision").val("");

    //archivo
    $("#xpostulacion").val(codigo);
    $("#xpuesto").val(titulo);
    $("#xcodigo").val("");
    $("#xpostulante").val("");

    // obtener datos del postulante
    $.ajax({
      type: "POST",
      url: "/reclutamiento/entrevistab/obtenerdatos",
      data: { id: id },
      success: function (res) {
        $("#codigo").val(res.vid);
        $("#postulante").val(res.vpostulante);
        $("#dcodigo").val(res.vid);
        $("#dpostulante").val(res.vpostulante);
        $("#mision").val(res.vdescripcion);
        $("#xcodigo").val(res.vid);
        $("#xpostulante").val(res.vpostulante);
        cargar_notas(codigo, res.vid);
        // console.log(res.vid);
        // console.log(codigo);
        listar_archivos(res.vid, codigo);
      },
    });

    // obtener seguimiento al postulante
    $.ajax({
      type: "POST",
      url: "/reclutamiento/entrevistab/seguimiento",
      data: { id: postulante, codigo: codigo },
      success: function (res) {
        $("#div-00").append(res.data);
      },
    });

    // cargar combo categoria
    $.ajax({
      type: "POST",
      url: "/reclutamiento/entrevistab/combo_categoria",
      success: function (res) {
        $("#dcategoria").append(res.data);
      },
    });

    $("#home-notas").trigger("click");
    $("#modal-control").modal("show");
  });

  $("#modal-control").on("shown.bs.modal", function () {
    $("#nota").focus();
  });

  $(".nav-tabs a").on("shown.bs.tab", function () {
    $("#nota").focus();
    $("#dcategoria").focus();
    $("#cita-categoria").focus();
    $("#ecita-categoria").focus();
  });

  // GUARDAR NOTA
  $("#btnguardar1").on("click", function () {
    let post = 1; //insert
    let id = 0; // nose requiere id
    let nota = $("#nota").val();
    let publicacion = $("#postulacion").val();
    let idpostulacion = $("#codigo").val();

    if (nota == null || nota.trim() == "") {
      Swal.fire({
        icon: "info",
        title: "No ha ingresado ninguna nota",
        text: "Favor de completar el campo!",
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }
    Swal.fire({
      title: "Estas seguro de guardar la siguiente nota?",
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
          url: "/reclutamiento/entrevistab/mantenimiento_notas",
          data: {
            post: post,
            id: id,
            publicacion: publicacion,
            idpostulacion: idpostulacion,
            nota: nota,
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
            $("#modal-control").modal("hide");
          },
        });
      }
    });
  });

  // ELIMINAR NOTA
  $("#example3 tbody").on("click", "a.deletenota", function () {
    let post = 3; //delete
    let id = $(this).attr("id"); // nose requiere id
    let nota = "";
    let publicacion = $("#postulacion").val();
    let idpostulacion = $("#codigo").val();

    Swal.fire({
      title: "Estas seguro de eliminar la siguiente nota?",
      text: "Esta acción no se puede deshacer!",
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
          url: "/reclutamiento/entrevistab/mantenimiento_notas",
          data: {
            post: post,
            id: id,
            publicacion: publicacion,
            idpostulacion: idpostulacion,
            nota: nota,
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

  // GUARDAR CITA
  $("#btnguardar2").on("click", function () {
    let post = 1; // insert
    let id = 0; // no se necesita id
    let publicacion = $("#dpostulacion").val();
    let idpostulacion = $("#dcodigo").val();
    let idcategoria = $("#dcategoria").val();
    let descripcion = ""; //$("#ddescripcion").val();
    let finicio = $("#dfechainicio").val();
    let ffin = $("#dfechafin").val();

    if (idcategoria == 0 || idcategoria == null) {
      Swal.fire({
        icon: "info",
        title: "No ha seleccionado una categoría...",
        text: "Favor de ingresar uno!",
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    if (finicio == null || finicio == "") {
      Swal.fire({
        icon: "info",
        title: "No ha ingresar una fecha de inicio a la cita...",
        text: "Favor de ingresar uno!",
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    if (ffin == null || ffin == "") {
      Swal.fire({
        icon: "info",
        title: "No ha ingresar una fecha fin a la cita...",
        text: "Favor de ingresar uno!",
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    Swal.fire({
      title: "Estas seguro de guardar la cita en el calendario?",
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
          url: "/reclutamiento/entrevistab/mantenimiento_calendario",
          data: {
            post: post,
            id: id,
            publicacion: publicacion,
            idpostulacion: idpostulacion,
            idcategoria: idcategoria,
            descripcion: descripcion,
            finicio: finicio,
            ffin: ffin,
          },
          success: function (res) {
            if (res.icase != 1) {
              Swal.fire({
                icon: res.vicon,
                title: res.vtitle,
                text: res.vtext,
                timer: res.itimer,
                timerProgressBar: res.vprogressbar,
                showCancelButton: false,
                showConfirmButton: false,
              });
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
                location.reload();
                clearInterval(id);
              }, res.itimer);
              $("#modal-control").modal("hide");
            }
          },
        });
      }
    });
  });
  // MODAL CONTROL (fin) //

  // MODAL CATEGORIA (inicio) //
  $("#btncategoria").on("click", function () {
    $("#cita-categoria").val("");
    $("#cita-color").val("#61C250");

    $("#home-categoria").trigger("click");
    $("#ecita-id").val("");
    $("#ecita-categoria").val("");
    $("#ecita-color").val("#61C250");

    $("#modal-categoria").modal("show");
  });

  $("#modal-categoria").on("shown.bs.modal", function () {
    $("#cita-categoria").focus();
  });

  // GUARDAR CATEGORIA
  $("#btnguardarcategoria").on("click", function () {
    let post = 1; // insert
    let id = 0; // como post = 1, es insert no se necesita id
    let categoria = $("#cita-categoria").val();
    let color = $("#cita-color").val();

    if (categoria == null || categoria == "") {
      Swal.fire({
        icon: "info",
        title: "No ha ingresado un nombre de categoría...",
        text: "Favor de ingresar uno!",
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    Swal.fire({
      title: "Estas seguro de guardar la siguiente categoria?",
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
          url: "/reclutamiento/entrevistab/mantenimiento_categoria",
          data: { post: post, id: id, categoria: categoria, color: color },
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
            $("#modal-categoria").modal("hide");
          },
        });
      }
    });
  });

  $("#example2 tbody").on("click", "a.editar-cat", function () {
    let id = $(this).attr("id");
    let categoria = $(this).attr("cate");
    let color = $(this).attr("colo");

    $("#ecita-id").val(id);
    $("#ecita-categoria").val(categoria);
    $("#ecita-color").val(color);

    const el = document.querySelector("#home-categoria-editar");
    el.classList.remove("disabled");
    $("#home-categoria-editar").trigger("click");
  });

  $("#home-categoria").on("click", function () {
    const el = document.querySelector("#home-categoria-editar");
    el.classList.add("disabled");
  });

  // EDITAR CATEGORIA
  $("#btnactualizarcategoria").on("click", function () {
    let post = 2; // update
    let id = $("#ecita-id").val(); // como post = 2, es update, se necesita id
    let categoria = $("#ecita-categoria").val();
    let color = $("#ecita-color").val();

    if (categoria == null || categoria == "") {
      Swal.fire({
        icon: "info",
        title: "No ha ingresado un nombre de categoría...",
        text: "Favor de ingresar uno!",
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    Swal.fire({
      title: "Estas seguro de actualizar la siguiente categoria?",
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
          url: "/reclutamiento/entrevistab/mantenimiento_categoria",
          data: { post: post, id: id, categoria: categoria, color: color },
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
            $("#modal-categoria").modal("hide");
          },
        });
      }
    });
  });
  // MODAL CATEGORIA (fin) //

  // MODAL ACTUALIZAR CITA (inicio) //
  $("#btnguardar3").on("click", function () {
    let post = 2; // update
    let id = $("#idcita").html(); // no se necesita id
    let publicacion = $("#upostulacion").val();
    let idpostulacion = $("#ucodigo").val();
    let idcategoria = $("#ucategoria").val();
    let descripcion = ""; //$("#ddescripcion").val();
    let finicio = $("#ufechainicio").val();
    let ffin = $("#ufechafin").val();

    if (idcategoria == 0 || idcategoria == null) {
      Swal.fire({
        icon: "info",
        title: "No ha seleccionado una categoría...",
        text: "Favor de ingresar uno!",
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    if (finicio == null || finicio == "") {
      Swal.fire({
        icon: "info",
        title: "No ha ingresar una fecha de inicio a la cita...",
        text: "Favor de ingresar uno!",
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    if (ffin == null || ffin == "") {
      Swal.fire({
        icon: "info",
        title: "No ha ingresar una fecha fin a la cita...",
        text: "Favor de ingresar uno!",
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    Swal.fire({
      title: "Estas seguro de actualizar la cita en el calendario?",
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
          url: "/reclutamiento/entrevistab/mantenimiento_calendario",
          data: {
            post: post,
            id: id,
            publicacion: publicacion,
            idpostulacion: idpostulacion,
            idcategoria: idcategoria,
            descripcion: descripcion,
            finicio: finicio,
            ffin: ffin,
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
            $("#modal-cita").modal("hide");
          },
        });
      }
    });
  });

  $("#btnguardar4").on("click", function () {
    let post = 3; // delete
    let id = $("#idcita").html(); // se necesita id
    let publicacion = "";
    let idpostulacion = 0;
    let idcategoria = 0;
    let descripcion = ""; //$("#ddescripcion").val();
    let finicio = "";
    let ffin = "";

    Swal.fire({
      title: "Estas seguro de eliminar la cita en el calendario?",
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
          url: "/reclutamiento/entrevistab/mantenimiento_calendario",
          data: {
            post: post,
            id: id,
            publicacion: publicacion,
            idpostulacion: idpostulacion,
            idcategoria: idcategoria,
            descripcion: descripcion,
            finicio: finicio,
            ffin: ffin,
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
            $("#modal-cita").modal("hide");
          },
        });
      }
    });
  });

  // MODAL ACTUALIZAR CITA (fin) //

  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    // themeSystem: 'Sandstone',
    // themeSystem: 'bootstrap',
    // timeZone: 'UTC-5',
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
    },
    // initialDate: "2020-09-12",
    // height: 'auto',
    locale: "es",
    buttonIcons: true, // show the prev/next text
    weekNumbers: true,
    navLinks: true, // can click day/week names to navigate views
    businessHours: true, // display business hours
    editable: true,
    dayMaxEvents: true,
    views: {
      timeGrid: {
        dayMaxEventRows: 1, // adjust to 6 only for timeGridWeek/timeGridDay
      },
    },
    // selectable: true,
    events: "/reclutamiento/entrevistab/calendario",
    // views: {
    //   dayGridMonth: {
    //     // name of view
    //     titleFormat: { year: "numeric", month: "2-digit", day: "2-digit" },
    //     // other view-specific options here
    //   },
    // },
    // events: [
    //   {
    //     title: "BCH237",
    //     start: "2021-10-12T10:30:00",
    //     end: "2021-10-12T11:30:00",
    //     extendedProps: {
    //       department: "BioChemistry",
    //     },
    //     description: "Lecture para Todos",
    //   },
    //   // more events ...
    // ],
    eventDidMount: function (info) {
      $(info.el).tooltip({
        title: info.event.extendedProps.description,
        placement: "top",
        trigger: "hover",
        container: "body",
        delay: { show: 50, hide: 50 },
      });

      // console.log(JSON.stringify(info.event));

      // $(info.el).popover({
      //   html: true,
      //   content: function () {
      //     var content = $(this).attr("data-popover-content");
      //     return $(content).children(".popover-body").html();
      //   },
      //   title: function () {
      //     var title = $(this).attr("data-popover-content");
      //     return $(title).children(".popover-heading").html();
      //   },
      //   title: info.event.extendedProps.description,
      //   trigger: "hover",
      //   container: "body",
      //   content: "<div>Hola marci</div></n><div>fijate</div>",
      //   delay: { show: 10, hide: 10 },
      // });
    },

    eventDrop: function (info) {
      $(".tooltip").tooltip("hide");

      let post = 4; // update
      let id = info.event.extendedProps["i_id"];
      let publicacion = "";
      let idpostulacion = 0;
      let descripcion = "";
      let idcategoria = 0;
      let finicio = formatDate(info.event.start, "yyyy-MM-dd HH:mm");
      let ffin = formatDate(info.event.end, "yyyy-MM-dd HH:mm");

      $.ajax({
        type: "POST",
        url: "/reclutamiento/entrevistab/mantenimiento_calendario",
        data: {
          post: post,
          id: id,
          publicacion: publicacion,
          idpostulacion: idpostulacion,
          idcategoria: idcategoria,
          descripcion: descripcion,
          finicio: finicio,
          ffin: ffin,
        },
        success: function (res) {
          Swal.fire({
            position: "top-end",
            icon: res.vicon,
            title: res.vtitle,
            text: res.vtext,
            timer: res.itimer,
            timerProgressBar: res.vprogressbar,
            showCancelButton: false,
            showConfirmButton: false,
          });
          // var id = setInterval(function () {
          //   location.reload();
          //   clearInterval(id);
          // }, res.itimer);
        },
      });
    },

    eventClick: function (info) {
      $(".tooltip").tooltip("hide");

      // let cadena = info.event.title;
      // let index = cadena.indexOf(".");
      // let id = cadena.substr(0, index);
      let id = info.event.extendedProps["i_id"];

      $("#idcita").html("");
      $("#ucategoria").html("");

      // obtener datos de la cita
      $.ajax({
        type: "POST",
        url: "/reclutamiento/entrevistab/datos_cita",
        data: { id: id },
        success: function (res) {
          $("#idcita").html(id);
          $("#upostulacion").val(res.vpublicacion);
          $("#upuesto").val(res.vtitulo);
          $("#ucodigo").val(res.vpostulacion);
          $("#upostulante").val(res.vnombre);
          obtenerindex(res.vcategoria);
          // $("#ufechainicio").val(res.vfinicio);

          $("#ufechainicio").flatpickr({
            enableTime: true,
            dateFormat: "Y-m-d H:i",
            disable: [
              {
                from: new Date("1900-01-01"),
                to: new Date().fp_incr(-1),
              },
            ],
            defaultDate: res.vfinicio,
          });

          // $("#ufechafin").val(res.vffin);

          $("#ufechafin").flatpickr({
            enableTime: true,
            dateFormat: "Y-m-d H:i",
            disable: [
              {
                from: new Date("1900-01-01"),
                to: new Date().fp_incr(-1),
              },
            ],
            defaultDate: res.vffin,
          });
        },
      });

      $("#modal-cita").modal("show");
    },
  });
  calendar.render();

  $("#btnfinalistaA").on("click", function () {
    let post = 2; //update
    let cod = $("#codigo").val();
    let finalista = 1;
    let comentario = $("#mision").val();
    let postulante = $("#postulante").val();    //NOMBRE DEL POSTULANTE
    let puesto = $("#puesto").val();            //NOMBRE DEL PUESTO
    let publicacion = $("#postulacion").val();  //PUB000001

    if (comentario == "" || comentario == null) {
      Swal.fire({
        icon: "info",
        title: "Descripcion vacía",
        text: "Favor de ingresar una descripción para guardar..!!",
        timer: 4000,
        timerProgressBar: true,
        showCancelButton: false,
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        html:
          "Estas seguro de guardar al postulante <strong>" +
          postulante +
          "</strong> como finalista para el puesto de <strong>" +
          puesto +
          "</strong> ?",
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
            url: "/reclutamiento/entrevistab/mantenimiento_finalista",
            data: {
              post: post,
              cod: cod,
              finalista: finalista,
              comentario: comentario,
              nompostulante: postulante,
              puesto: puesto,
              publicacion: publicacion,
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
                $("#modal-control").modal("hide");
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
                  // showCancelButton: false,
                  // showConfirmButton: false,
                });
              }
            },
          });
        }
      });
    }
  });

  $("#btnfinalistaB").on("click", function () {
    let post = 3; //detele
    let cod = $("#codigo").val();
    let finalista = 0;
    let comentario = $("#mision").val();
    let postulante = $("#postulante").val();    //NOMBRE DEL POSTULANTE
    let puesto = $("#puesto").val();            //NOMBRE DEL PUESTO
    let publicacion = $("#postulacion").val();  //PUB000001

    if (comentario == "" || comentario == null) {
      Swal.fire({
        icon: "info",
        title: "Descripcion vacía",
        text: "Favor de ingresar una descripción para guardar..!!",
        timer: 4000,
        timerProgressBar: true,
        showCancelButton: false,
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        html:
          "Estas seguro de anular el resultado de <strong>" +
          postulante +
          "</strong> como finalista para el puesto de <strong>" +
          puesto +
          "</strong> ?",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#61C250",
        cancelButtonColor: "#ea5455",
        confirmButtonText: "Si, anular!", //<i class="fa fa-smile-wink"></i>
        cancelButtonText: "No", //<i class="fa fa-frown"></i>
      }).then((result) => {
        if (result.isConfirmed) {
          $.ajax({
            type: "POST",
            url: "/reclutamiento/entrevistab/mantenimiento_finalista",
            data: {
              post: post,
              cod: cod,
              finalista: finalista,
              comentario: comentario,
              nompostulante: postulante,
              puesto: puesto,
              publicacion: publicacion,
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
                $("#modal-control").modal("hide");
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
                  // showCancelButton: false,
                  // showConfirmButton: false,
                });
              }
            },
          });
        }
      });
    }
  });

  var arr = []; //variable array global para cc de correos
  // modal enviar correo
  $("#example1 tbody").on("click", "a.correo", function () {
    let post = 3; // consultar con formato para enviar correo por id
    let publicacion = $(this).attr("vpospub"); //codigo de publicación
    let xid = $(this).attr("id"); //id del postulante
    let id = $(this).attr("idd"); //id del reg_postulacion
    let puesto = $(this).attr("vpuesto");

    $("#posid").val("");
    $("#posid").val(id);

    $("#pospublicacion").val("");
    $("#pospublicacion").val(publicacion);

    $("#postasunto").val("");
    $("#mensaje").val("");

    $.ajax({
      type: "POST",
      url: "/reclutamiento/entrevistab/consulta_usuario",
      data: { post: post, id: xid, puesto: puesto },
      success: function (res) {
        $("#postnombre").html(res.vnombre);
        $("#postpara").val(res.vcorreo);
        combocorreos(5, 1);
        $("#postasunto").val(res.vasunto);
        $("#mensaje").val(res.vmensaje);
        $("#valorx").html(res.imensaje);
        //construir array
        let array1 = res.cccorreo.map((x) => x.v_codigo);
        arr = array1;
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

  // seleccion de correo
  $(".select2").change(function () {
    arr = $(this).val();
    console.log(arr);
  });

  // enviar correo
  $("#btnenviarcorreo").on("click", function () {
    let publicacion = $("#pospublicacion").val();
    let cid = $("#posid").val();
    let cnombre = $("#postnombre").text();
    let cpara = $("#postpara").val();
    let ccopia = arr;
    let casunto = $("#postasunto").val();
    let cmensaje = $("#mensaje").val();

    var variable = 0;
    $.ajax({
      type: "POST",
      url: "/reclutamiento/entrevistab/agradecimiento",
      data: { publicacion: publicacion },
      success: function (res) {
        variable = res.data;
      },
    });

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
        if (variable > 0) {
          $.ajax({
            type: "POST",
            url: "/reclutamiento/entrevistab/enviarcorreo",
            data: {
              cid: cid,
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
        } else {
          Swal.fire({
            icon: "info",
            title: "No se puede enviar correo",
            text: "Debe terminar de asignar a los finalistas o no hay ningun finalista, verificar..!!",
            timer: 5000,
            timerProgressBar: true,
            showCancelButton: false,
            showConfirmButton: false,
          });
          $("#modal-correo").modal("hide");
        }
      }
    });
  });

  // subir archivos del postulante
  $("#btnguardar").on("click", function () {
    var formData = new FormData();

    let archivo = $("#documento")[0].files[0];

    let publicacion = $("#xpostulacion").val(); //PUB000001
    // let nompuesto = $("#xpuesto").val(); //nombre del puesto
    let codigo = $("#xcodigo").val();
    // let nompostulante = $("#xpostulante").val(); //nombre del postulante
    let descripcion = $("#xdescripcion").val();
    let post = 1; // insert

    formData.append("archivo", archivo);
    formData.append("publicacion", publicacion);
    // formData.append("puesto", puesto);
    formData.append("codigo", codigo);
    // formData.append("postulante", postulante);
    formData.append("descripcion", descripcion);
    formData.append("post", post);

    Swal.fire({
      title: "Estas seguro de subir el archivo?",
      text: "Favor de confirmar!",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#61C250",
      cancelButtonColor: "#ea5455",
      confirmButtonText: "Si, subir!", //<i class="fa fa-smile-wink"></i>
      cancelButtonText: "No", //<i class="fa fa-frown"></i>
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          url: "/reclutamiento/entrevistab/subir_archivo",
          type: "POST",
          data: formData,
          contentType: false,
          processData: false,
          success: function (res) {
            Swal.fire({
              icon: res.vicon,
              title: res.vtitle,
              // text: res.vtext,
              timer: res.itimer,
              timerProgressBar: res.vprogressbar,
              showCancelButton: false,
              showConfirmButton: false,
            });
            listar_archivos(codigo, publicacion);
            var $el = $("#documento");
            $el.wrap("<form>").closest("form").get(0).reset();
            $el.unwrap();
            $("#xdescripcion").val("");
          },
        });
      }
    });
  });

  // eliminar archivo
  $("#example4 tbody").on("click", "a.deletearchivo", function () {
    let post = 3; //delete
    let id = $(this).attr("id"); // nose requiere id
    let publicacion = $("#xpostulacion").val(); //PUB000001
    let codigo = $("#xcodigo").val();
    let ruta = $(this).attr("vruta");

    Swal.fire({
      title: "Estas seguro de eliminar el archivo subido?",
      text: "Esta acción no se puede deshacer!",
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
          url: "/reclutamiento/entrevistab/mantenimiento_archivo",
          data: {
            post: post,
            id: id,
            publicacion: publicacion,
            codigo: codigo,
            ruta: ruta,
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
            listar_archivos(codigo, publicacion);
            var $el = $("#documento");
            $el.wrap("<form>").closest("form").get(0).reset();
            $el.unwrap();
            $("#xdescripcion").val("");
          },
        });
      }
    });
  });
});

//funcion para obtener los archivos cargados
function listar_archivos(codigo, postulacion) {
  $.ajax({
    type: "POST",
    url: "/reclutamiento/entrevistab/listar_archivos",
    data: { codigo: codigo, postulacion: postulacion },
    beforeSend: function () {
      $("#tablita-arc").html("");
      $("#tablita-arc").append(
        "<div id='tablita-arc'>\
            <div class='d-flex justify-content-center my-1'>\
                <div class='spinner-border' role='status' aria-hidden='true'></div>\
            </div>\
          </div>"
      );
    },
    success: function (res) {
      // console.log(JSON.stringify(res.filas));
      $("#example4").dataTable().fnDestroy();
      $("#tablita-arc").html("");
      $("#tablita-arc").append(res.filas);
      creardatatable("#example4", 5, 0, "asc");
    },
  });
}

// crear combo correos
function combocorreos(post, id) {
  $.ajax({
    type: "POST",
    url: "/reclutamiento/entrevistab/combocorreos",
    data: { post: post, id: id },
    success: function (res) {
      $("#postcc").html("");
      $("#postcc").append(res.data);
    },
  });
}

// $(function () {
//   $('[data-toggle="tooltip"], .tooltip').tooltip();
//   $('[data-toggle="tooltip"], .tooltip').tooltip("show");
//   $("button").click(function () {
//     $('[data-toggle="tooltip"], .tooltip').tooltip("hide");
//   });
// });

function formatDate(date, format) {
  if (!date) return;
  if (!format) format = "yyyy-MM-dd";
  switch (typeof date) {
    case "string":
      date = new Date(date.replace(/-/, "/"));
      break;
    case "number":
      date = new Date(date);
      break;
  }
  if (!date instanceof Date) return;
  var dict = {
    yyyy: date.getFullYear(),
    M: date.getMonth() + 1,
    d: date.getDate(),
    H: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds(),
    MM: ("" + (date.getMonth() + 101)).substr(1),
    dd: ("" + (date.getDate() + 100)).substr(1),
    HH: ("" + (date.getHours() + 100)).substr(1),
    mm: ("" + (date.getMinutes() + 100)).substr(1),
    ss: ("" + (date.getSeconds() + 100)).substr(1),
  };
  return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function () {
    return dict[arguments[0]];
  });
}

function cargar_notas(publicacion, postulacion) {
  // cargar notas del postulante
  $.ajax({
    type: "POST",
    url: "/reclutamiento/entrevistab/notas",
    data: { publicacion: publicacion, postulacion: postulacion },
    beforeSend: function () {
      $("#tablita-pri").html("");
      $("#tablita-pri").append(
        "<div id='tablita-pri'>\
            <div class='d-flex justify-content-center my-1'>\
                <div class='spinner-border' role='status' aria-hidden='true'></div>\
            </div>\
          </div>"
      );
    },
    success: function (res) {
      $("#example3").dataTable().fnDestroy();
      $("#tablita-pri").html("");
      $("#tablita-pri").append(res.data);
      creardatatable("#example3", 5, 0, "desc");
    },
  });
}

function obtenerindex(categoria) {
  // cargar combo categoria
  $.ajax({
    type: "POST",
    url: "/reclutamiento/entrevistab/combo_categoriacita",
    data: { categoria: categoria },
    success: function (res) {
      $("#ucategoria").append(res.data);
      $("#ucategoria").val(categoria);
    },
  });
}

// crear tabla
function creardatatable(nombretabla, row, idorden, orden) {
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
    lengthMenu: [[row], [row]],
    order: [[idorden, orden]],
  });
  return tabla;
}

// function caracteres_mision() {
//   var total = 300;
//   setTimeout(function () {
//     var valor = document.getElementById("nota");
//     var cantidad = valor.value.length;
//     document.getElementById("res").innerHTML =
//       "<small><b>" +
//       cantidad +
//       " caractere/s, te quedan " +
//       (total - cantidad) +
//       "</b></small>";
//   }, 10);
// }

$(".char-textarea-nota").on("keyup", function (event) {
  checkTextAreaMaxLength(
    this,
    event,
    ".textarea-counter-value",
    ".char-textarea-nota",
    ".char-count-nota"
  );
  $(this).addClass("active");
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

$(".char-textarea-subir").on("keyup", function (event) {
  checkTextAreaMaxLength(
    this,
    event,
    ".textarea-counter-value",
    ".char-textarea-subir",
    ".char-count-subir"
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
