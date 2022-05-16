$(function () {
  //cargar deshabilitado los input
  $(
    "#postulacion,#puesto,#codigo,#postulante,#dpostulacion,#dpuesto,#dcodigo,#dpostulante,#ucita,#upostulacion,#upuesto,#ucodigo,#upostulante,#ecita-id"
  ).attr("readonly", true);

  //creardatatable("#example1", 10, 2); //tabla.- index

  $(document).ready(function () {
    var groupColumn = 1;
    var table = $("#example1").DataTable({
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
      columnDefs: [{ visible: false, targets: groupColumn }],
      order: [[groupColumn, "asc"]],
      displayLength: 10,
      drawCallback: function (settings) {
        var api = this.api();
        var rows = api.rows({ page: "current" }).nodes();
        var last = null;

        api
          .column(groupColumn, { page: "current" })
          .data()
          .each(function (group, i) {
            if (last !== group) {
              $(rows)
                .eq(i)
                .before(
                  '<tr class="group"><td colspan="4">' + group + "</td></tr>"
                );

              last = group;
            }
          });
      },
    });

    // Order by the grouping
    $("#example1 tbody").on("click", "tr.group", function () {
      var currentOrder = table.order()[0];
      if (currentOrder[0] === groupColumn && currentOrder[1] === "asc") {
        table.order([groupColumn, "desc"]).draw();
      } else {
        table.order([groupColumn, "asc"]).draw();
      }
    });
  }); //tabla.- tabla index

  creardatatable("#example2", 5, 0, "asc"); //tabla.- categoria
  creardatatable("#example3", 5, 0, "asc"); //tabla.- nota

  // MODAL CONTROL (inicio) //
  $("#example1 tbody").on("click", "a.control", function () {
    let id = $(this).attr("id");
    let titulo = $(this).attr("vtitulo");
    let codigo = $(this).attr("vpublicacion");
    let postulante = $(this).attr("ipostulante");

    $("#postulacion").val(codigo);
    $("#puesto").val(titulo);
    $("#codigo").val("");
    $("#postulante").val("");
    $("#nota").val("");
    $("#div-00").html("");
    $("#dcategoria").html("");

    $("#dpostulacion").val(codigo);
    $("#dpuesto").val(titulo);
    $("#dcategoria").val(0);
    $("#dfechainicio").val("");
    $("#dfechafin").val("");

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
        cargar_notas(codigo, res.vid);
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
            $("#modal-control").modal("hide");
          },
        });
      }
    });
  });
  // MODAL ACTUALIZAR CITA (fin) //

  // var date = new Date();
  // var yyyy = date.getFullYear().toString();
  // var mm = (date.getMonth() + 1).toString().length == 1 ? "0" + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString();
  // var dd = (date.getDate()).toString().length == 1 ? "0" + (date.getDate()).toString() : (date.getDate()).toString();

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
    eventDidMount: function (info) {
      $(info.el).tooltip({
        title: info.event.extendedProps.description,
        container: "body",
        delay: { show: 50, hide: 50 },
      });

      // $(info.el).popover({
      //   html : true,
      //   content: function() {
      //     var content = $(this).attr("data-popover-content");
      //     return $(content).children(".popover-body").html();
      //   },
      //   title: function() {
      //     var title = $(this).attr("data-popover-content");
      //     return $(title).children(".popover-heading").html();
      //   },

      //   title: info.event.extendedProps.description,
      //   trigger: "hover",
      //   container: "body",
      //   content: "<div>Hola marci</div></n><div>fijate</div>",

      //   delay: { show: 50, hide: 50 },
      // });
    },

    eventDrop: function (info) {
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
            position: 'top-end',
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
          $("#ufechainicio").val(res.vfinicio);
          $("#ufechafin").val(res.vffin);
        },
      });

      $("#modal-cita").modal("show");
    },
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
  });
  calendar.render();
});

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

function caracteres_mision() {
  var total = 300;
  setTimeout(function () {
    var valor = document.getElementById("nota");
    var cantidad = valor.value.length;
    document.getElementById("res").innerHTML =
      "<small><b>" +
      cantidad +
      " caractere/s, te quedan " +
      (total - cantidad) +
      "</b></small>";
  }, 10);
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
