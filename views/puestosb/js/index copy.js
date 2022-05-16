$(function () {
  $("#codigo,#cargo").attr("readonly", true);

  var table = $("#example").DataTable({
    destroy: true,
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
    ajax: {
      url: "/reclutamiento/puestosb/cargar_cargos_des",
    },
    columns: [
      { data: "i_id" },
      { data: "v_nombre" },
      { data: "i_dias" },
      {
        defaultContent:
          "<button type='button' class='editar btn btn-warning btn-sm'><i class='fa fa-edit'></i></button>",
      },
    ],
    columnDefs: [
      {
        targets: 0,
        checkboxes: {
          // selectRow: true,
          attr: { id: "cbx1" },
        },
      },
      { className: "text-center", targets: 2 },
      { className: "text-center", targets: 3 },
    ],
    // select: {
    //   style: "multi",
    // },
    order: [[0, "asc"]],
  });

  // $("#example").on("click", "checkbox", function () {
  //   alert("hola");
  // });

  // $("#example").on("click", "tbody td input[type=checkbox]", function () {
  //   alert("hola");
  // });

  $("#btnliberarcargo").on("click", function () {
    let post = 4; //update en base de datos (liberar)
    let ids = [];
    let rows_selected = table.column(0).checkboxes.selected();
    let prearray = rows_selected.join(",");
    ids = prearray.split(",");
    let cargo = "";
    let chk = 1; // todos son checkeados
    let dias = 0; //valor dia

    if (prearray != "") {
      $.ajax({
        type: "POST",
        url: "/reclutamiento/puestosb/mantenimiento_cargos",
        data: {
          post: post,
          ids: ids,
          cargo: cargo,
          chk: chk,
          dias: dias,
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
    } else {
      Swal.fire({
        icon: "info",
        title: "No ha seleccionado ningun cargo a liberar...",
        text: "Favor de seleccionado uno!",
        timer: 3000,
        timerProgressBar: true,
      });
    }
  });

  var table1 = $("#example1").DataTable({
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
    ajax: {
      url: "/reclutamiento/puestosb/cargar_cargos_sel",
    },
    columns: [{ data: "i_id" }, { data: "v_nombre" }, { data: "i_dias" }],
    columnDefs: [
      {
        targets: 0,
        checkboxes: {
          // selectRow: true,
          attr: { id: "cbx1" },
        },
      },
      { className: "text-center", targets: 2 },
    ],
    // select: {
    //   style: "multi",
    // },
    order: [[1, "asc"]],
  });

  $("#btnquitarcargo").on("click", function () {
    let post1 = 5; //update en base de datos (retiro)
    let ids1 = [];
    let rows_selected1 = table1.column(0).checkboxes.selected();
    let prearray1 = rows_selected1.join(",");
    ids1 = prearray1.split(",");
    let cargo1 = "";
    let chk1 = 0; // todos son descheckeados
    let dias1 = 0; //valor dia

    if (prearray1 != "") {
      $.ajax({
        type: "POST",
        url: "/reclutamiento/puestosb/mantenimiento_cargos",
        data: {
          post: post1,
          ids: ids1,
          cargo: cargo1,
          chk: chk1,
          dias: dias1,
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
    } else {
      Swal.fire({
        icon: "info",
        title: "No ha seleccionado ningun cargo a liberar...",
        text: "Favor de seleccionado uno!",
        timer: 3000,
        timerProgressBar: true,
      });
    }
  });

  obtener_data_editar("#example", table);

  $("#btnguardar").on("click", function () {
    let post = 2; //actualizar cargo
    let ids = [];
    let cod = $("#codigo").val();
    ids = cod.split(",");
    let cargo = $("#cargo").val();
    let chk = 0;
    let dias = $("#dias").val();

    $.ajax({
      type: "POST",
      url: "/reclutamiento/puestosb/mantenimiento_cargos",
      data: {
        post: post,
        ids: ids,
        cargo: cargo,
        chk: chk,
        dias: dias,
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
  });

  $("#btncancelar").on("click", function () {
    $("#modal-editar").modal("hide");
  });
});

var obtener_data_editar = function (tbody, table) {
  $(tbody).on("click", "button.editar", function () {
    var data = table.row($(this).parents("tr")).data();
    // console.log(data);
    $("#codigo").val("");
    $("#codigo").val(data.i_id);
    $("#cargo").val("");
    $("#cargo").val(data.v_nombre);
    $("#dias").val("");
    $("#dias").val(data.i_dias);
    $("#modal-editar").modal("show");
  });
};

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
