$(function () {
  creardatatable("#example"); //tabla.- principal responsabilidades
  creardatatable("#example1"); //tabla.- impacto cuantitativo del puesto
  creardatatable("#example2"); //tabla.- organizacion
  creardatatable("#example3"); //tabla.- responsabilidad por las relaciones
  creardatatable("#example4"); //tabla.- complejidad de la posición
  creardatatable("#example5"); //tabla.- idiomas
  creardatatable("#example6"); //tabla.- programas

  //#region "modal principal responsabilidades"

  //#region // CARGAR MODAL AGREGAR (inicio) //
  $("#btnagregar").on("click", function () {
    $("#acciones").val("");
    $("#resultado").val("");
    $("#modal-agregar").modal("show");
  });

  $("#modal-agregar").on("shown.bs.modal", function () {
    $("#acciones").focus();
  });

  var countaci = 1;
  var datosaci = [];
  // guardar
  $("#btnguardar").on("click", function () {
    $("#example").dataTable().fnDestroy();

    let accion = $("#acciones").val();
    let resultado = $("#resultado").val();

    let fila =
      "<tr><td class='text-center'>" +
      countaci +
      "</td><td class='text-left'>" +
      accion +
      "</td><td class='text-left'>" +
      resultado +
      "</td><td><a id=" +
      countaci +
      " class='btn btn-danger btn-sm text-white delete'><span><b>Eliminar</b></span></a></td></tr>";

    let btn = document.createElement("tr");
    btn.innerHTML = fila;
    document.getElementById("tablita-aci").appendChild(btn);

    datosaci.push({ id: countaci, acciones: accion, resultados: resultado });

    console.log(datosaci);
    //console.log(JSON.stringify(datos));

    countaci = countaci + 1;

    creardatatable("#example");

    $("#modal-agregar").modal("hide");
  });

  // cancelar guardar
  $("#btncancelar").on("click", function () {
    $("#modal-agregar").modal("hide");
  });
  //#endregion // CARGAR MODAL AGREGAR (fin) //

  //#region // CARGAR MODAL ELIMINAR (inicio) //
  $("#example tbody").on("click", "a.delete", function () {
    let id = $(this).attr("id");
    $("#idtabla").html("");
    $("#idtabla").html(id);

    $("#modal-eliminar").modal("show");
  });

  // eliminar
  $("#btneliminar").on("click", function () {
    $("#example").dataTable().fnDestroy();

    // traemos los id desde el boton eliminar
    let valor = parseInt($("#idtabla").html());

    // luego buscamos el dato dentro del array de objetos
    let index = datosaci.findIndex((item) => item.id === valor);

    // aqui se elimina el objeto
    datosaci.splice(index, 1);

    // quitamos las lineas
    $("#tablita-aci").children().remove();

    // recorremos el array de objetos para rearmar la tabla nuevamente
    // datosaci.forEach((element) => console.log(element));
    let myArray = [];
    let contador = 1;

    for (const property in datosaci) {
      let accion = datosaci[property].acciones;
      let resultado = datosaci[property].resultados;

      var fila =
        "<tr><td class='text-center'>" +
        contador +
        "</td><td class='text-left'>" +
        accion +
        "</td><td class='text-left'>" +
        resultado +
        "</td><td><a id=" +
        contador +
        " class='btn btn-danger btn-sm text-white delete'><span><b>Eliminar</b></span></a></td></tr>";

      let btn = document.createElement("tr");
      btn.innerHTML = fila;
      document.getElementById("tablita-aci").appendChild(btn);

      myArray.push({ id: contador, acciones: accion, resultados: resultado });

      contador = contador + 1;
    }

    creardatatable("#example");

    datosaci.splice(0, datosaci.length);

    datosaci = myArray;
    countaci = contador;

    $("#modal-eliminar").modal("hide");
  });

  // cancelar eliminar
  $("#btneliminarcancelar").on("click", function () {
    $("#modal-eliminar").modal("hide");
  });
  //#endregion // CARGAR MODAL ELIMINAR (fin) //

  //#endregion

  //#region "modal impacto cuantitativo del puesto"

  //#region // CARGAR MODAL AGREGAR (inicio) //
  $("#btnagregarimpacto").on("click", function () {
    $("#dimension-impacto").val("");
    $("#magnitud-impacto").val("");
    $("#modal-agregar-impacto").modal("show");
  });

  $("#modal-agregar-impacto").on("shown.bs.modal", function () {
    $("#dimension-impacto").focus();
  });

  var countimp = 1;
  var datosimp = [];

  // guardar
  $("#btnguardar-impacto").on("click", function () {
    $("#example1").dataTable().fnDestroy();

    let dimension = $("#dimension-impacto").val();
    let magnitud = $("#magnitud-impacto").val();

    let fila =
      "<tr><td class='text-center'>" +
      countimp +
      "</td><td class='text-left'>" +
      dimension +
      "</td><td class='text-left'>" +
      magnitud +
      "</td><td><a id=" +
      countimp +
      " class='btn btn-danger btn-sm text-white delete'><span><b>Eliminar</b></span></a></td></tr>";

    let btn = document.createElement("tr");
    btn.innerHTML = fila;
    document.getElementById("tablita-imp").appendChild(btn);

    datosimp.push({
      id: countimp,
      dimensiones: dimension,
      magnitudes: magnitud,
    });

    console.log(datosimp);
    //console.log(JSON.stringify(datos));

    countimp = countimp + 1;

    creardatatable("#example1");

    $("#modal-agregar-impacto").modal("hide");
  });

  // cancelar guardar
  $("#btncancelar-impacto").on("click", function () {
    $("#modal-agregar-impacto").modal("hide");
  });

  //#endregion

  //#region // CARGAR MODAL ELIMINAR (inicio)
  $("#example1 tbody").on("click", "a.delete", function () {
    let id = $(this).attr("id");
    $("#idtabla-impacto").html("");
    $("#idtabla-impacto").html(id);

    $("#modal-eliminar-impacto").modal("show");
  });

  // eliminar
  $("#btneliminar-impacto").on("click", function () {
    $("#example1").dataTable().fnDestroy();

    // traemos los id desde el boton eliminar
    let valor = parseInt($("#idtabla-impacto").html());

    // luego buscamos el dato dentro del array de objetos
    let index = datosimp.findIndex((item) => item.id === valor);

    // aqui se elimina el objeto
    datosimp.splice(index, 1);

    // quitamos las lineas
    $("#tablita-imp").children().remove();

    // recorremos el array de objetos para rearmar la tabla nuevamente
    // datos.forEach((element) => console.log(element));
    let myArray = [];
    let contador = 1;

    for (const property in datosimp) {
      let dimension = datosimp[property].dimensiones;
      let magnitud = datosimp[property].magnitudes;

      var fila =
        "<tr><td class='text-center'>" +
        contador +
        "</td><td class='text-left'>" +
        dimension +
        "</td><td class='text-left'>" +
        magnitud +
        "</td><td><a id=" +
        contador +
        " class='btn btn-danger btn-sm text-white delete'><span><b>Eliminar</b></span></a></td></tr>";

      let btn = document.createElement("tr");
      btn.innerHTML = fila;
      document.getElementById("tablita-imp").appendChild(btn);

      myArray.push({
        id: contador,
        dimensiones: dimension,
        magnitudes: magnitud,
      });

      contador = contador + 1;
    }

    creardatatable("#example1");

    datosimp.splice(0, datosimp.length);

    datosimp = myArray;
    countimp = contador;

    $("#modal-eliminar-impacto").modal("hide");
  });

  // cancelar eliminar
  $("#btneliminarcancelar-impacto").on("click", function () {
    $("#modal-eliminar-impacto").modal("hide");
  });
  //#endregion // CARGAR MODAL ELIMINAR (fin) //

  //#endregion

  //#region "modal organizacion"

  //#region // CARGAR MODAL AGREGAR (inicio) //
  $("#btnagregarorg").on("click", function () {
    $("#puesto-org").val("");
    $("#reporte-org").val("");
    $("#modal-agregar-org").modal("show");
  });

  $("#modal-agregar-org").on("shown.bs.modal", function () {
    $("#puesto-org").focus();
  });

  var countorg = 1;
  var datosorg = [];

  // guardar
  $("#btnguardar-org").on("click", function () {
    $("#example2").dataTable().fnDestroy();

    let puesto = $("#puesto-org").val();
    let reporte = $("#reporte-org").val();

    let fila =
      "<tr><td class='text-center'>" +
      countorg +
      "</td><td class='text-left'>" +
      puesto +
      "</td><td class='text-left'>" +
      reporte +
      "</td><td><a id=" +
      countorg +
      " class='btn btn-danger btn-sm text-white delete'><span><b>Eliminar</b></span></a></td></tr>";

    let btn = document.createElement("tr");
    btn.innerHTML = fila;
    document.getElementById("tablita-org").appendChild(btn);

    datosorg.push({
      id: countorg,
      puestos: puesto,
      reportes: reporte,
    });

    console.log(datosorg);
    //console.log(JSON.stringify(datos));

    countorg = countorg + 1;

    creardatatable("#example2");

    $("#modal-agregar-org").modal("hide");
  });

  // cancelar guardar
  $("#btncancelar-org").on("click", function () {
    $("#modal-agregar-org").modal("hide");
  });

  //#endregion

  //#region // CARGAR MODAL ELIMINAR (inicio)
  $("#example2 tbody").on("click", "a.delete", function () {
    let id = $(this).attr("id");
    $("#idtabla-org").html("");
    $("#idtabla-org").html(id);

    $("#modal-eliminar-org").modal("show");
  });

  // eliminar
  $("#btneliminar-org").on("click", function () {
    $("#example2").dataTable().fnDestroy();

    // traemos los id desde el boton eliminar
    let valor = parseInt($("#idtabla-org").html());

    // luego buscamos el dato dentro del array de objetos
    let index = datosorg.findIndex((item) => item.id === valor);

    // aqui se elimina el objeto
    datosorg.splice(index, 1);

    // quitamos las lineas
    $("#tablita-org").children().remove();

    // recorremos el array de objetos para rearmar la tabla nuevamente
    // datos.forEach((element) => console.log(element));
    let myArray = [];
    let contador = 1;

    for (const property in datosorg) {
      let puesto = datosorg[property].puestos;
      let reporte = datosorg[property].reportes;

      var fila =
        "<tr><td class='text-center'>" +
        contador +
        "</td><td class='text-left'>" +
        puesto +
        "</td><td class='text-left'>" +
        reporte +
        "</td><td><a id=" +
        contador +
        " class='btn btn-danger btn-sm text-white delete'><span><b>Eliminar</b></span></a></td></tr>";

      let btn = document.createElement("tr");
      btn.innerHTML = fila;
      document.getElementById("tablita-org").appendChild(btn);

      myArray.push({
        id: contador,
        puestos: puesto,
        reportes: reporte,
      });

      contador = contador + 1;
    }

    creardatatable("#example2");

    datosorg.splice(0, datosorg.length);

    datosorg = myArray;
    countorg = contador;

    $("#modal-eliminar-org").modal("hide");
  });

  // cancelar eliminar
  $("#btneliminarcancelar-org").on("click", function () {
    $("#modal-eliminar-org").modal("hide");
  });
  //#endregion // CARGAR MODAL ELIMINAR (fin) //

  //#endregion

  //#region "modal responsabilidad por las relaciones"

  //#region // CARGAR MODAL AGREGAR (inicio) //
  $("#btnagregarres").on("click", function () {
    $("#entidad-res").val("");
    $("#cargo-res").val("");
    $("#objetivo-res").val("");
    $("#modal-agregar-res").modal("show");
  });

  $("#modal-agregar-res").on("shown.bs.modal", function () {
    $("#entidad-res").focus();
  });

  var countres = 1;
  var datosres = [];

  // guardar
  $("#btnguardar-res").on("click", function () {
    $("#example3").dataTable().fnDestroy();

    let entidad = $("#entidad-res").val();
    let cargo = $("#cargo-res").val();
    let objetivo = $("#objetivo-res").val();

    let fila =
      "<tr><td class='text-center'>" +
      countres +
      "</td><td class='text-left'>" +
      entidad +
      "</td><td class='text-left'>" +
      cargo +
      "</td><td class='text-left'>" +
      objetivo +
      "</td><td><a id=" +
      countres +
      " class='btn btn-danger btn-sm text-white delete'><span><b>Eliminar</b></span></a></td></tr>";

    let btn = document.createElement("tr");
    btn.innerHTML = fila;
    document.getElementById("tablita-res").appendChild(btn);

    datosres.push({
      id: countres,
      entidades: entidad,
      cargos: cargo,
      objetivos: objetivo,
    });

    console.log(datosres);
    //console.log(JSON.stringify(datos));

    countres = countres + 1;

    creardatatable("#example3");

    $("#modal-agregar-res").modal("hide");
  });

  // cancelar guardar
  $("#btncancelar-res").on("click", function () {
    $("#modal-agregar-res").modal("hide");
  });

  //#endregion

  //#region // CARGAR MODAL ELIMINAR (inicio)
  $("#example3 tbody").on("click", "a.delete", function () {
    let id = $(this).attr("id");
    $("#idtabla-res").html("");
    $("#idtabla-res").html(id);

    $("#modal-eliminar-res").modal("show");
  });

  // eliminar
  $("#btneliminar-res").on("click", function () {
    $("#example3").dataTable().fnDestroy();

    // traemos los id desde el boton eliminar
    let valor = parseInt($("#idtabla-res").html());

    // luego buscamos el dato dentro del array de objetos
    let index = datosres.findIndex((item) => item.id === valor);

    // aqui se elimina el objeto
    datosres.splice(index, 1);

    // quitamos las lineas
    $("#tablita-res").children().remove();

    // recorremos el array de objetos para rearmar la tabla nuevamente
    // datos.forEach((element) => console.log(element));
    let myArray = [];
    let contador = 1;

    for (const property in datosres) {
      let entidad = datosres[property].entidades;
      let cargo = datosres[property].cargos;
      let objetivo = datosres[property].objetivos;

      var fila =
        "<tr><td class='text-center'>" +
        contador +
        "</td><td class='text-left'>" +
        entidad +
        "</td><td class='text-left'>" +
        cargo +
        "</td><td class='text-left'>" +
        objetivo +
        "</td><td><a id=" +
        contador +
        " class='btn btn-danger btn-sm text-white delete'><span><b>Eliminar</b></span></a></td></tr>";

      let btn = document.createElement("tr");
      btn.innerHTML = fila;
      document.getElementById("tablita-res").appendChild(btn);

      myArray.push({
        id: contador,
        entidades: entidad,
        cargos: cargo,
        objetivos: objetivo,
      });

      contador = contador + 1;
    }

    creardatatable("#example3");

    datosres.splice(0, datosres.length);

    datosres = myArray;
    countres = contador;

    $("#modal-eliminar-res").modal("hide");
  });

  // cancelar eliminar
  $("#btneliminarcancelar-res").on("click", function () {
    $("#modal-eliminar-res").modal("hide");
  });
  //#endregion // CARGAR MODAL ELIMINAR (fin) //

  //#endregion

  //#region "modal Complejidad de la posición"

  //#region // CARGAR MODAL AGREGAR (inicio) //
  $("#btnagregarcom").on("click", function () {
    $("#decisiones-com").val("");
    $("#recomendaciones-com").val("");
    $("#modal-agregar-com").modal("show");
  });

  $("#modal-agregar-com").on("shown.bs.modal", function () {
    $("#decisiones-com").focus();
  });

  var countcom = 1;
  var datoscom = [];

  // guardar
  $("#btnguardar-com").on("click", function () {
    $("#example4").dataTable().fnDestroy();

    let decision = $("#decisiones-com").val();
    let recomendacion = $("#recomendaciones-com").val();

    let fila =
      "<tr><td class='text-center'>" +
      countcom +
      "</td><td class='text-left'>" +
      decision +
      "</td><td class='text-left'>" +
      recomendacion +
      "</td><td><a id=" +
      countcom +
      " class='btn btn-danger btn-sm text-white delete'><span><b>Eliminar</b></span></a></td></tr>";

    let btn = document.createElement("tr");
    btn.innerHTML = fila;
    document.getElementById("tablita-com").appendChild(btn);

    datoscom.push({
      id: countcom,
      decisiones: decision,
      recomendaciones: recomendacion,
    });

    console.log(datoscom);
    //console.log(JSON.stringify(datos));

    countcom = countcom + 1;

    creardatatable("#example4");

    $("#modal-agregar-com").modal("hide");
  });

  // cancelar guardar
  $("#btncancelar-com").on("click", function () {
    $("#modal-agregar-com").modal("hide");
  });

  //#endregion

  //#region // CARGAR MODAL ELIMINAR (inicio)
  $("#example4 tbody").on("click", "a.delete", function () {
    let id = $(this).attr("id");
    $("#idtabla-com").html("");
    $("#idtabla-com").html(id);

    $("#modal-eliminar-com").modal("show");
  });

  // eliminar
  $("#btneliminar-com").on("click", function () {
    $("#example4").dataTable().fnDestroy();

    // traemos los id desde el boton eliminar
    let valor = parseInt($("#idtabla-com").html());

    // luego buscamos el dato dentro del array de objetos
    let index = datoscom.findIndex((item) => item.id === valor);

    // aqui se elimina el objeto
    datoscom.splice(index, 1);

    // quitamos las lineas
    $("#tablita-com").children().remove();

    // recorremos el array de objetos para rearmar la tabla nuevamente
    // datos.forEach((element) => console.log(element));
    let myArray = [];
    let contador = 1;

    for (const property in datoscom) {
      let decision = datoscom[property].decisiones;
      let recomendacion = datoscom[property].recomendaciones;

      var fila =
        "<tr><td class='text-center'>" +
        contador +
        "</td><td class='text-left'>" +
        decision +
        "</td><td class='text-left'>" +
        recomendacion +
        "</td><td><a id=" +
        contador +
        " class='btn btn-danger btn-sm text-white delete'><span><b>Eliminar</b></span></a></td></tr>";

      let btn = document.createElement("tr");
      btn.innerHTML = fila;
      document.getElementById("tablita-com").appendChild(btn);

      myArray.push({
        id: contador,
        decisiones: decision,
        recomendaciones: recomendacion,
      });

      contador = contador + 1;
    }

    creardatatable("#example4");

    datoscom.splice(0, datoscom.length);

    datoscom = myArray;
    countcom = contador;

    $("#modal-eliminar-com").modal("hide");
  });

  // cancelar eliminar
  $("#btneliminarcancelar-com").on("click", function () {
    $("#modal-eliminar-com").modal("hide");
  });
  //#endregion // CARGAR MODAL ELIMINAR (fin) //

  //#endregion

  //#region "modal para idiomas"

  //#region // CARGAR MODAL AGREGAR (inicio) //
  $("#btnagregarpri").on("click", function () {
    $("#idioma-pri").val("");
    $("#habla-pri").val(0);
    $("#lee-pri").val(0);
    $("#escribe-pri").val(0);
    $("#modal-agregar-pri").modal("show");
  });

  $("#modal-agregar-pri").on("shown.bs.modal", function () {
    $("#idioma-pri").focus();
  });

  var countpri = 1;
  var datospri = [];

  // guardar
  $("#btnguardar-pri").on("click", function () {
    $("#example5").dataTable().fnDestroy();

    let idioma = $("#idioma-pri").val();
    let hablaid = $("#habla-pri").val();
    let leeid = $("#lee-pri").val();
    let escribeid = $("#escribe-pri").val();

    let hablatext = ShowSelected("habla-pri");
    let leetext = ShowSelected("lee-pri");
    let escribetext = ShowSelected("escribe-pri");

    let fila =
      "<tr><td class='text-center'>" +
      countpri +
      "<tr><td class='text-center'>" +
      idioma +
      "</td><td class='text-center'>" +
      hablatext +
      "</td><td class='text-center'>" +
      leetext +
      "</td><td class='text-center'>" +
      escribetext +
      "</td><td><a id=" +
      countpri +
      " class='btn btn-danger btn-sm text-white delete'><span><b>Eliminar</b></span></a></td></tr>";

    let btn = document.createElement("tr");
    btn.innerHTML = fila;
    document.getElementById("tablita-pri").appendChild(btn);

    datospri.push({
      id: countpri,
      idioma: idioma,
      hablaid: parseInt(hablaid),
      hablatext: hablatext,
      leeid: parseInt(leeid),
      leetext: leetext,
      escribeid: parseInt(escribeid),
      escribetext: escribetext,
    });

    console.log(datospri);
    //console.log(JSON.stringify(datos));

    countpri = countpri + 1;

    creardatatable("#example5");

    $("#modal-agregar-pri").modal("hide");
  });

  // cancelar guardar
  $("#btncancelar-pri").on("click", function () {
    $("#modal-agregar-pri").modal("hide");
  });

  //#endregion

  //#region // CARGAR MODAL ELIMINAR (inicio)
  $("#example5 tbody").on("click", "a.delete", function () {
    let id = $(this).attr("id");
    $("#idtabla-pri").html("");
    $("#idtabla-pri").html(id);

    $("#modal-eliminar-pri").modal("show");
  });

  // eliminar
  $("#btneliminar-pri").on("click", function () {
    $("#example5").dataTable().fnDestroy();

    // traemos los id desde el boton eliminar
    let valor = parseInt($("#idtabla-pri").html());

    // luego buscamos el dato dentro del array de objetos
    let index = datospri.findIndex((item) => item.id === valor);

    // aqui se elimina el objeto
    datospri.splice(index, 1);

    // quitamos las lineas
    $("#tablita-pri").children().remove();

    // recorremos el array de objetos para rearmar la tabla nuevamente
    // datos.forEach((element) => console.log(element));
    let myArray = [];
    let contador = 1;

    for (const property in datospri) {
      let idioma = datospri[property].idioma;
      let hablaid = datospri[property].hablaid;
      let hablatext = datospri[property].hablatext;
      let leeid = datospri[property].leeid;
      let leetext = datospri[property].leetext;
      let escribeid = datospri[property].escribeid;
      let escribetext = datospri[property].escribetext;

      let fila =
        "<tr><td class='text-center'>" +
        contador +
        "<tr><td class='text-center'>" +
        idioma +
        "</td><td class='text-center'>" +
        hablatext +
        "</td><td class='text-center'>" +
        leetext +
        "</td><td class='text-center'>" +
        escribetext +
        "</td><td><a id=" +
        contador +
        " class='btn btn-danger btn-sm text-white delete'><span><b>Eliminar</b></span></a></td></tr>";

      let btn = document.createElement("tr");
      btn.innerHTML = fila;
      document.getElementById("tablita-pri").appendChild(btn);

      myArray.push({
        id: contador,
        idioma: idioma,
        hablaid: parseInt(hablaid),
        hablatext: hablatext,
        leeid: parseInt(leeid),
        leetext: leetext,
        escribeid: parseInt(escribeid),
        escribetext: escribetext,
      });

      contador = contador + 1;
    }

    creardatatable("#example5");

    datospri.splice(0, datospri.length);

    datospri = myArray;
    countpri = contador;

    $("#modal-eliminar-pri").modal("hide");
  });

  // cancelar eliminar
  $("#btneliminarcancelar-pri").on("click", function () {
    $("#modal-eliminar-pri").modal("hide");
  });
  //#endregion // CARGAR MODAL ELIMINAR (fin) //

  //#endregion

  //#region "modal para programas informativos"

  //#region // CARGAR MODAL AGREGAR (inicio) //
  $("#btnagregarpro").on("click", function () {
    $("#informatico-pro").val("");
    $("#nivel-informatico-pro").val(0);
    $("#modal-agregar-pro").modal("show");
  });

  $("#modal-agregar-pro").on("shown.bs.modal", function () {
    $("#informatico-pro").focus();
  });

  var countpro = 1;
  var datospro = [];

  // guardar
  $("#btnguardar-pro").on("click", function () {
    $("#example6").dataTable().fnDestroy();

    let programa = $("#informatico-pro").val();
    let nivelid = $("#nivel-informatico-pro").val();

    let niveltext = ShowSelected("nivel-informatico-pro");

    let fila =
      "<tr><td class='text-center'>" +
      countpro +
      "<tr><td class='text-center'>" +
      programa +
      "</td><td class='text-center'>" +
      niveltext +
      "</td><td><a id=" +
      countpro +
      " class='btn btn-danger btn-sm text-white delete'><span><b>Eliminar</b></span></a></td></tr>";

    let btn = document.createElement("tr");
    btn.innerHTML = fila;
    document.getElementById("tablita-pro").appendChild(btn);

    datospro.push({
      id: countpro,
      programas: programa,
      nivelid: parseInt(nivelid),
      niveltext: niveltext,
    });

    console.log(datospro);
    //console.log(JSON.stringify(datos));

    countpro = countpro + 1;

    creardatatable("#example6");

    $("#modal-agregar-pro").modal("hide");
  });

  // cancelar guardar
  $("#btncancelar-pro").on("click", function () {
    $("#modal-agregar-pro").modal("hide");
  });

  //#endregion

  //#region // CARGAR MODAL ELIMINAR (inicio)
  $("#example6 tbody").on("click", "a.delete", function () {
    let id = $(this).attr("id");
    $("#idtabla-pri").html("");
    $("#idtabla-pri").html(id);

    $("#modal-eliminar-pri").modal("show");
  });

  // eliminar
  $("#btneliminar-pri").on("click", function () {
    $("#example6").dataTable().fnDestroy();

    // traemos los id desde el boton eliminar
    let valor = parseInt($("#idtabla-pro").html());

    // luego buscamos el dato dentro del array de objetos
    let index = datospro.findIndex((item) => item.id === valor);

    // aqui se elimina el objeto
    datospro.splice(index, 1);

    // quitamos las lineas
    $("#tablita-pro").children().remove();

    // recorremos el array de objetos para rearmar la tabla nuevamente
    // datos.forEach((element) => console.log(element));
    let myArray = [];
    let contador = 1;

    for (const property in datospro) {
      let programa = datospro[property].programas;
      let nivelid = datospro[property].nivelid;
      let niveltext = datospro[property].niveltext;

      let fila =
        "<tr><td class='text-center'>" +
        contador +
        "<tr><td class='text-center'>" +
        programa +
        "</td><td class='text-center'>" +
        niveltext +
        "</td><td><a id=" +
        contador +
        " class='btn btn-danger btn-sm text-white delete'><span><b>Eliminar</b></span></a></td></tr>";

      let btn = document.createElement("tr");
      btn.innerHTML = fila;
      document.getElementById("tablita-pro").appendChild(btn);

      myArray.push({
        id: contador,
        programas: programa,
        nivelid: parseInt(nivelid),
        niveltext: niveltext,
      });

      contador = contador + 1;
    }

    creardatatable("#example6");

    datospro.splice(0, datospro.length);

    datospro = myArray;
    countpro = contador;

    $("#modal-eliminar-pro").modal("hide");
  });

  // cancelar eliminar
  $("#btneliminarcancelar-pro").on("click", function () {
    $("#modal-eliminar-pro").modal("hide");
  });
  //#endregion // CARGAR MODAL ELIMINAR (fin) //

  //#endregion

  //var campos_max = 10; //max de 10 campos
  var x = 0;
  $("#btnaddtrs").click(function (e) {
    e.preventDefault(); //prevenir novos clicks
    // if (x < campos_max) {
    $("#listas").append(
      "<div id= " +
        x +
        ' class="row">\
          <div class="form-group col-md-9">\
            <div><input type="text" name="transversal[]" class="form-control" placeholder="ingrese..." autocomplete="off"></div>\
          </div>\
          <div class="form-group col-md-1"><button onclick="quitarintup(' +
        x +
        ')" class="btn btn-secondary">Remover</button></div>\
        </div>'
    );
    x++;
    // }
  });

  var y = 1000;
  $("#btnaddesp").click(function (e) {
    e.preventDefault(); //prevenir novos clicks
    // if (x < campos_max) {
    $("#listas1").append(
      "<div id= " +
        y +
        ' class="row">\
          <div class="form-group col-md-9">\
            <div><input type="text" name="especifica[]" class="form-control" placeholder="ingrese..." autocomplete="off"></div>\
          </div>\
          <div class="form-group col-md-1"><button onclick="quitarintup(' +
        y +
        ')" class="btn btn-secondary">Remover</button></div>\
        </div>'
    );
    y++;
    // }
  });

  $("#btnobtener").on("click", function () {
    let arrInput = new Array();
    let inputsValues = document.getElementsByName("transversal[]");
    namevalues = [].map.call(inputsValues, function (datainput) {
      arrInput.push(datainput.value);
    });

    let arrInput1 = new Array();
    let inputsValues1 = document.getElementsByName("especifica[]");
    namevalues1 = [].map.call(inputsValues1, function (datainput1) {
      arrInput1.push(datainput1.value);
    });
    console.log(arrInput);
    console.log(arrInput1);
  });

  $("#btngrabarmon").on("click", function () {
    let puesto = $("#puesto").val();
    let fecha = $("#fecha").val();
    let elaborado = $("#elaborado").val();
    let revisado = $("#revisado").val();
    let gerencia = $("#gerencia").val();
    let reporta = $("#reporta").val();
    let mision = $("#mision").val();
    let organizacion = $("#posicion").val();
    let complejidad = $("#descripcion-com").val();

    // if (puesto == 0 || puesto == null) {
    //   $("#puesto").focus();
    //   Swal.fire({
    //     icon: "info",
    //     title: "No ha seleccionado un puesto correcto...",
    //     text: "Favor de seleccionado uno!",
    //     timer: 3000,
    //     timerProgressBar: true,
    //   });
    //   return;
    // }

    // if (fecha == "" || fecha == null) {
    //   $("#fecha").focus();
    //   Swal.fire({
    //     icon: "info",
    //     title: "No ha ingresado una fecha para el puesto...",
    //     text: "Favor de ingresar una!",
    //     timer: 3000,
    //     timerProgressBar: true,
    //   });
    //   return;
    // }

    // if (elaborado == "" || elaborado == null) {
    //   $("#elaborado").focus();
    //   Swal.fire({
    //     icon: "info",
    //     title: "Campo Elaborado por... no puede quedar vacío...",
    //     text: "Favor de completar el campo!",
    //     timer: 3000,
    //     timerProgressBar: true,
    //   });
    //   return;
    // }

    // if (revisado == "" || revisado == null) {
    //   $("#revisado").focus();
    //   Swal.fire({
    //     icon: "info",
    //     title: "Campo Revisado por... no puede quedar vacío...",
    //     text: "Favor de completar el campo!",
    //     timer: 3000,
    //     timerProgressBar: true,
    //   });
    //   return;
    // }

    // if (gerencia == "" || gerencia == null) {
    //   $("#gerencia").focus();
    //   Swal.fire({
    //     icon: "info",
    //     title: "Campo Gerencia... no puede quedar vacío...",
    //     text: "Favor de completar el campo!",
    //     timer: 3000,
    //     timerProgressBar: true,
    //   });
    //   return;
    // }

    // if (reporta == "" || reporta == null) {
    //   $("#reporta").focus();
    //   Swal.fire({
    //     icon: "info",
    //     title: "Campo Posición a la que reporta... no puede quedar vacío...",
    //     text: "Favor de completar el campo!",
    //     timer: 3000,
    //     timerProgressBar: true,
    //   });
    //   return;
    // }

    // if (mision == "" || mision == null) {
    //   $("#mision").focus();
    //   Swal.fire({
    //     icon: "info",
    //     title: "No ha ingresado la misión del puesto... el campo no puede quedar vacío...",
    //     text: "Favor de completar el campo!",
    //     timer: 3000,
    //     timerProgressBar: true,
    //   });
    //   return;
    // }

    // tabla responsabilidades (pestaña 3)
    if (datosaci.length == "" || datosaci.length == null) {
      step_focus(9, 2);
      $("#bt3").trigger("click");
      Swal.fire({
        icon: "info",
        title:
          "No ha ingresado ningun registro en la tabla (pestaña 3)... tabla puede quedar vacía...",
        text: "Favor de completar la tabla con 1 registro por lo menos!",
        timer: 4000,
        timerProgressBar: true,
      });
      return;
    }

    // tabla impacto cuantitativo (pestaña 4)
    if (datosimp.length == "" || datosimp.length == null) {
      step_focus(9, 3);
      $("#bt4").trigger("click");
      Swal.fire({
        icon: "info",
        title:
          "No ha ingresado ningun registro en la tabla (pestaña 4)... tabla no puede quedar vacía...",
        text: "Favor de completar la tabla con 1 registro por lo menos!",
        timer: 4000,
        timerProgressBar: true,
      });
      return;
    }

    // if (organizacion == "" || organizacion == null) {
    //   $("#posicion").focus();
    //   Swal.fire({
    //     icon: "info",
    //     title:
    //       "No ha ingresado la misión del puesto... el campo no puede quedar vacío...",
    //     text: "Favor de completar el campo!",
    //     timer: 3000,
    //     timerProgressBar: true,
    //   });
    //   return;
    // }

    // tabla organizacion (pestaña 5)
    if (datosorg.length == "" || datosorg.length == null) {
      step_focus(9, 4);
      $("#bt5").trigger("click");
      Swal.fire({
        icon: "info",
        title:
          "No ha ingresado ningun registro en la tabla (pestaña 5)... tabla no puede quedar vacía...",
        text: "Favor de completar la tabla con 1 registro por lo menos!",
        timer: 4000,
        timerProgressBar: true,
      });
      return;
    }

    // tabla responsabilidad por las relaciones (pestaña 6)
    if (datosres.length == "" || datosres.length == null) {
      step_focus(9, 5);
      $("#bt6").trigger("click");
      Swal.fire({
        icon: "info",
        title:
          "No ha ingresado ninguna registro en la tabla (pestaña 6)... tabla no puede quedar vacía...",
        text: "Favor de completar la tabla con 1 registro por lo menos!",
        timer: 4000,
        timerProgressBar: true,
      });
      return;
    }

    if (complejidad == "" || complejidad == null) {
      step_focus(9, 6);
      $("#bt7").trigger("click");
      $("#descripcion-com").focus();
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

    // tabla complejidad de la posicion (pestaña 7)
    if (datoscom.length == "" || datoscom.length == null) {
      step_focus(9, 6);
      $("#bt7").trigger("click");
      Swal.fire({
        icon: "info",
        title:
          "No ha ingresado ninguna registro en la tabla (pestaña 7)... tabla no puede quedar vacía...",
        text: "Favor de completar la tabla con 1 registro por lo menos!",
        timer: 4000,
        timerProgressBar: true,
      });
      return;
    }

    // alert(puesto);
    // alert(fecha);
    // alert(elaborado);
    // alert(revisado);
    // alert(gerencia);
    // alert(reporta);

    // OBTENIENDO EL CORRELATIVO
    let id = 1; //para correlativo de registro
    var newcorr = "";
    $.ajax({
      type: "POST",
      url: "/reclutamiento/puestosa/get_correlativo",
      async: false,
      data: { id: id },
      success: function (res) {
        newcorr = res.vcorrelativo;
      },
    });

    // $.ajax({
    //   type: "POST",
    //   url: "/reclutamiento/puestosa/registro_puesto",
    //   data: {
    //     correlativo: newcorr,
    //     puesto: puesto,
    //     fecha: fecha,
    //     elaborado: elaborado,
    //     revisado: revisado,
    //     gerencia: gerencia,
    //     reporta: reporta,
    //     mision: mision,
    //   },
    //   success: function (res) {
    //     Swal.fire({
    //       icon: res.vicon,
    //       title: res.vtitle,
    //       text: res.vtext,
    //       timer: res.itimer,
    //       timerProgressBar: res.vprogressbar,
    //       showCancelButton: false,
    //       showConfirmButton: false,
    //     });
    //     var id = setInterval(function () {
    //       location.reload();
    //       clearInterval(id);
    //     }, res.itimer);
    //   },
    // });
  });
});

function step_focus(totalstep, focusstep) {
  // el elemento esta en el step 4
  // set a todos a step
  for (let step = 1; step < totalstep + 1; step++) {
    var elemento = document.getElementById(step);
    elemento.className = "step";
  }

  // set a los menores step del focusstep (step crossed)
  for (let step = 1; step < focusstep; step++) {
    var elemento = document.getElementById(step);
    elemento.className = "step crossed";
  }

  // set al step active en la posicion focusstep (step active)
  var elemento = document.getElementById(focusstep);
  elemento.className = "step active";
}

function contarcaracteres() {
  //Numero de caracteres permitidos
  var total = 1200;

  setTimeout(function () {
    var valor = document.getElementById("mision");
    var respuesta = document.getElementById("res");
    var cantidad = valor.value.length;
    document.getElementById("res").innerHTML =
      cantidad + " caractere/s, te quedan " + (total - cantidad);
    if (cantidad > total) {
      respuesta.style.color = "red";
    } else {
      respuesta.style.color = "black";
    }
  }, 10);
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

// quitar inputs
function quitarintup(id) {
  let item = document.getElementById(id);
  item.parentNode.removeChild(item);
}

function ShowSelected(dato) {
  /* Para obtener el valor */
  // var cod = document.getElementById(dato).value;
  // alert(cod);

  /* Para obtener el texto */
  var combo = document.getElementById(dato);
  return (selected = combo.options[combo.selectedIndex].text);
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
