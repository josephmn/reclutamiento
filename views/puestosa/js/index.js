$(function () {
  //cargar deshabilitado los campos
  $(
    "#indicar-otro,#anhio-sector,#anhio-personal-acargo,#anhio-puestos-similares,#desc-otro-licencias,#desc-otro-certificaciones"
  ).attr("readonly", true);

  creardatatable("#example"); //tabla.- principal responsabilidades
  creardatatable("#example1"); //tabla.- impacto cuantitativo del puesto
  creardatatable("#example2"); //tabla.- organizacion
  creardatatable("#example3"); //tabla.- responsabilidad por las relaciones
  creardatatable("#example4"); //tabla.- complejidad de la posición
  creardatatable("#example5"); //tabla.- idiomas
  creardatatable("#example6"); //tabla.- programas

  let fecha = new Date(); //Fecha actual
  let mes = fecha.getMonth() + 1; //obteniendo mes
  let dia = fecha.getDate(); //obteniendo dia
  let ano = fecha.getFullYear(); //obteniendo año
  let hoy = ano+"-"+mes+"-"+dia;
  if (dia < 10) dia = "0" + dia; //agrega cero si el menor de 10
  if (mes < 10) mes = "0" + mes; //agrega cero si el menor de 10
  document.getElementById("fecha").value = ano+"-"+mes+"-"+dia;

  $("#fecha").flatpickr({
    enableTime: false,
    dateFormat: "Y-m-d",
    disable: [
      {
        from: new Date("1900-01-01"),
        to: new Date().fp_incr(-1),
      },
    ],
    defaultDate: hoy,
  });

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
    // console.log(JSON.stringify(datosaci));

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

  //#region "modal para programas informaticos"

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
    $("#idtabla-pro").html("");
    $("#idtabla-pro").html(id);

    $("#modal-eliminar-pro").modal("show");
  });

  // eliminar
  $("#btneliminar-pro").on("click", function () {
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

  $("#btngrabarmon").on("click", function () {
    //1
    //#region 'step 1 -'
    let post = 1; //insert
    let puesto = $("#puesto").val();
    let fecha = $("#fecha").val();
    let elaborado = $("#elaborado").val();
    let revisado = $("#revisado").val();
    let gerencia = $("#gerencia").val();
    let reporta = $("#reporta").val();

    if (puesto == 0 || puesto == null) {
      $("#bt1").trigger("click");
      $("#puesto").focus();
      Swal.fire({
        icon: "info",
        title: "No ha seleccionado un puesto correcto...",
        text: "Favor de seleccionado uno!",
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
        title: "No ha ingresado una fecha para el puesto...",
        text: "Favor de ingresar una!",
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    if (elaborado == "" || elaborado == null) {
      $("#bt1").trigger("click");
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
      $("#bt1").trigger("click");
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
      $("#bt1").trigger("click");
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
      $("#bt1").trigger("click");
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

    //#endregion

    //2
    //#region 'step 2 -'

    let mision = $("#mision").val();

    if (mision == "" || mision == null) {
      $("#bt2").trigger("click");
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

    //#endregion

    //3
    //#region 'step 3 -'

    //console.log(datosaci);
    // tabla responsabilidades (pestaña 3)
    if (datosaci.length == "" || datosaci.length == null) {
      $("#bt3").trigger("click");
      Swal.fire({
        icon: "info",
        title:
          "No ha ingresado ningun registro en la tabla (pestaña 3)... tabla no puede quedar vacía...",
        text: "Favor de completar la tabla con 1 registro por lo menos!",
        timer: 4000,
        timerProgressBar: true,
      });
      return;
    }

    //#endregion

    //4
    //#region 'step 4 -'

    //console.log(datosimp);
    // tabla impacto cuantitativo (pestaña 4)
    if (datosimp.length == "" || datosimp.length == null) {
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

    //#endregion

    //5
    //#region 'step 5 -'

    let organizacion = $("#posicion").val();

    if (organizacion == "" || organizacion == null) {
      $("#bt5").trigger("click");
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

    // tabla organizacion (pestaña 5)
    //console.log(datosorg);
    if (datosorg.length == "" || datosorg.length == null) {
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

    //#endregion

    //6
    //#region 'step 6 -'

    //console.log(datosres);
    // tabla responsabilidad por las relaciones (pestaña 6)
    if (datosres.length == "" || datosres.length == null) {
      $("#bt6").trigger("click");
      Swal.fire({
        icon: "info",
        title:
          "No ha ingresado ningun registro en la tabla (pestaña 6)... tabla no puede quedar vacía...",
        text: "Favor de completar la tabla con 1 registro por lo menos!",
        timer: 4000,
        timerProgressBar: true,
      });
      return;
    }

    //#endregion

    //7
    //#region 'step 7 -'
    let complejidad = $("#descripcion-com").val();

    if (complejidad == "" || complejidad == null) {
      $("#bt7").trigger("click");
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

    // tabla complejidad de la posicion (pestaña 7)
    //console.log(datoscom);
    if (datoscom.length == "" || datoscom.length == null) {
      $("#bt7").trigger("click");
      Swal.fire({
        icon: "info",
        title:
          "No ha ingresado ningun registro en la tabla (pestaña 7)... tabla no puede quedar vacía...",
        text: "Favor de completar la tabla con 1 registro por lo menos!",
        timer: 4000,
        timerProgressBar: true,
      });
      return;
    }

    //#endregion

    //9
    //#region 'step 9'
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

    // tabla idiomas de la posicion (pestaña 9)
    // console.log(datospri);
    if (datospri.length == "" || datospri.length == null) {
      Swal.fire({
        icon: "info",
        title:
          "No ha ingresado ningun registro en la tabla idiomas (pestaña 9)... tabla no puede quedar vacía...",
        text: "Favor de completar la tabla con 1 registro por lo menos!",
        timer: 4000,
        timerProgressBar: true,
      });
      return;
    }

    // tabla programas informáticos (pestaña 9)
    // console.log(datospro);
    if (datospro.length == "" || datospro.length == null) {
      Swal.fire({
        icon: "info",
        title:
          "No ha ingresado ningun registro en la tabla programas informáticos (pestaña 9)... tabla no puede quedar vacía...",
        text: "Favor de completar la tabla con 1 registro por lo menos!",
        timer: 4000,
        timerProgressBar: true,
      });
      return;
    }

    // Experiencia previo
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

    // conocimiento
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

    // Licencias
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

    // Certificaciones
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

    //#endregion

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
          url: "/reclutamiento/puestosa/registro_puesto",
          data: {
            post: post,
            correlativo: newcorr,
            puesto: puesto,
            fecha: fecha,
            elaborado: elaborado,
            revisado: revisado,
            gerencia: gerencia,
            reporta: reporta,
            mision: mision,
            datosaci: datosaci, //array responsablidades
            datosimp: datosimp, //array impacto
            organizacion: organizacion,
            datosorg: datosorg, //array organizacion
            datosres: datosres, //array responsablidades relaciones
            complejidad: complejidad,
            datoscom: datoscom, //array decisiones
            chktecnico: chktecnico,
            chkuniversitario: chkuniversitario,
            chkpostgrado: chkpostgrado,
            chkotros: chkotros,
            indicar_otro: indicar_otro,
            profesion: profesion,
            rd1: rd1,
            rd2: rd2,
            datospri: datospri, //array idioma
            datospro: datospro, //array programas
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
            // JSON.stringify(console.log(res.data));
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

function check_true(id) {
  if ($(id).prop("checked")) {
    return true;
  } else {
    return false;
  }
}

function caracteres_mision() {
  var total = 1200;
  setTimeout(function () {
    var valor = document.getElementById("mision");
    var cantidad = valor.value.length;
    document.getElementById("res").innerHTML =
      "<small><b>" +
      cantidad +
      " caractere/s, te quedan " +
      (total - cantidad) +
      "</b></small>";
  }, 10);
}

function caracteres_complejidad() {
  var total = 1200;
  setTimeout(function () {
    var valor = document.getElementById("descripcion-com");
    var cantidad = valor.value.length;
    document.getElementById("res1").innerHTML =
      "<small><b>" +
      cantidad +
      " caractere/s, te quedan " +
      (total - cantidad) +
      "</b></small>";
  }, 10);
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
