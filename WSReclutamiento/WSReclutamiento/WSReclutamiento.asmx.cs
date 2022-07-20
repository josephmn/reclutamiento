using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;
using WSReclutamiento.Entity;
using WSReclutamiento.view;

namespace WSReclutamiento
{
    /// <summary>
    /// Descripción breve de WSReclutamiento
    /// </summary>
    [WebService(Namespace = "http://www.mundoaltomayo.com")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    // [System.Web.Script.Services.ScriptService]
    public class WSReclutamiento : System.Web.Services.WebService
    {
        public VRegistroLogin obERegistroLogin = new VRegistroLogin();
        public VRegistroConsulta obERegistroConsulta = new VRegistroConsulta();
        public VValidarCodigo obEValidarCodigo = new VValidarCodigo();
        public VLogin obELogin = new VLogin();
        public VRecuperarClave obERecuperarClave = new VRecuperarClave();
        public VCargo obECargo = new VCargo();
        public VPais obEPais = new VPais();
        public VDepartamento obEDepartamento = new VDepartamento();
        public VProvincia obEProvincia = new VProvincia();
        public VDistrito obEDistrito = new VDistrito();
        public VTipoContrato obETipoContrato = new VTipoContrato();
        public VConfiguracionCorreo obEConfiguracionCorreo = new VConfiguracionCorreo();

        public VEspecifica obEEspecifica = new VEspecifica();
        public VTransversal obETransversal = new VTransversal();
        public VGenCorrelativo obEGenCorrelativo = new VGenCorrelativo();
        public VConsultaGenerado obEConsultaGenerado = new VConsultaGenerado();
        public VConsultaPuestoA obEConsultaPuestoA = new VConsultaPuestoA();
        public VConsultaResponsabilidad obEConsultaResponsabilidad = new VConsultaResponsabilidad();
        public VConsultaImpacto obEConsultaImpacto = new VConsultaImpacto();
        public VConsultaOrganizacion obEConsultaOrganizacion = new VConsultaOrganizacion();
        public VConsultaRelaciones obEConsultaRelaciones = new VConsultaRelaciones();
        public VConsultaDecisiones obEConsultaDecisiones = new VConsultaDecisiones();
        public VConsultaTransversales obEConsultaTransversales = new VConsultaTransversales();
        public VConsultaEspecificas obEConsultaEspecificas = new VConsultaEspecificas();
        public VConsultaIdiomas obEConsultaIdiomas = new VConsultaIdiomas();
        public VConsultaProgramas obEConsultaProgramas = new VConsultaProgramas();
        public VConsultaLogin obEConsultaLogin = new VConsultaLogin();
        public VConsultaCV obEConsultaCV = new VConsultaCV();
        public VConsultaSolicitudes obEConsultaSolicitudes = new VConsultaSolicitudes();
        public VConsultaListaSolicitud obEConsultaListaSoicitud = new VConsultaListaSolicitud();
        public VConsultaPuestoAGEN obEConsultaPuestoAGEN = new VConsultaPuestoAGEN();

        public VPublicacionCAB obEPublicacionCAB = new VPublicacionCAB();
        public VPublicacion obEPublicacion = new VPublicacion();
        public VPublicacionTarea obEPublicacionTarea = new VPublicacionTarea();
        public VPublicacionPerfil obEPublicacionPerfil = new VPublicacionPerfil();
        public VPublicacionB obEPublicacionB = new VPublicacionB();
        public VPublicacionBDetalle obEPublicacionBDetalle = new VPublicacionBDetalle();
        public VMisPostulaciones obEMisPostulaciones = new VMisPostulaciones();
        public VSeguimiento obESeguimiento = new VSeguimiento();
        public VEntrevistaB obEEntrevistaB = new VEntrevistaB();
        public VEntrevistaBDetalle obEEntrevistaBDetalle = new VEntrevistaBDetalle();
        public VCalendario obECalendario = new VCalendario();
        public VCalendarioCategoria obECalendarioCategoria = new VCalendarioCategoria();
        public VCalendarioCita obECalendarioCita = new VCalendarioCita();
        public VNotas obENotas = new VNotas();
        public VConPerfiles obEConPerfiles = new VConPerfiles();
        public VConPerfilesAccesos obEConPerfilesAccesos = new VConPerfilesAccesos();
        public VUsuarios obEUsuarios = new VUsuarios();
        public VPublicado obEPublicado = new VPublicado();
        public VConsultaCompania obEConsultaCompania = new VConsultaCompania();
        public VConsultaMensajeFinalista obEConsultaMensajeFinalista = new VConsultaMensajeFinalista();

        public VConsultaTipoArchivo obEConsultaTipoArchivo = new VConsultaTipoArchivo();
        public VConsultaArchivosPostulados obEConsultaArchivosPostulados = new VConsultaArchivosPostulados();

        public VMenu obEMenu = new VMenu();
        public VSubMenu obESubMenu = new VSubMenu();

        public VMantCargo obEMantCargo = new VMantCargo();
        public VMantLogin obEMantLogin = new VMantLogin();
        public VMantPassword obEMantPassword = new VMantPassword();
        public VMantCV obEMantCV = new VMantCV();
        public VMantPostulacion obEMantPostulacion = new VMantPostulacion();
        public VMantPostulantesDetalle obEMantPostulantesDetalle = new VMantPostulantesDetalle();
        public VMantCategoriaCalendario obEMantCategoriaCalendario = new VMantCategoriaCalendario();
        public VMantCalendario obEMantCalendario = new VMantCalendario();
        public VMantNotas obEMantNotas = new VMantNotas();
        public VMantPerfilesAccesos obEMantPerfilesAccesos = new VMantPerfilesAccesos();
        public VMantPerfiles obEMantPerfiles = new VMantPerfiles();
        public VMantUsuarios obEMantUsuarios = new VMantUsuarios();
        public VMantSolicitudes obEMantSolicitudes = new VMantSolicitudes();
        public VVerificacion obEVerificacion = new VVerificacion();
        public VMantFinalista obEMantFinalista = new VMantFinalista();
        public VMantCompania obEMantCompania = new VMantCompania();
        public VMantCorreoFinalista obEMantCorreoFinalista = new VMantCorreoFinalista();
        public VMantMensajeFinalista obEMantMensajeFinalista = new VMantMensajeFinalista();

        public VMantLogCorreos obEMantLogCorreos = new VMantLogCorreos();
        public VMantArchivosPostulados obEMantArchivosPostulados = new VMantArchivosPostulados();

        public VMantConfiguracionCorreo obEMantConfiguracionCorreo = new VMantConfiguracionCorreo();

        public VRegistroPuestoA obERegistroPuestoA = new VRegistroPuestoA();
        public VRPAResponsabilidades obERPAResponsabilidades = new VRPAResponsabilidades();
        public VRPAImpacto obERPAImpacto = new VRPAImpacto();
        public VRPAOrganizacion obERPAOrganizacion = new VRPAOrganizacion();
        public VRPARelaciones obERPARelaciones = new VRPARelaciones();
        public VRPADecisiones obERPADecisiones = new VRPADecisiones();

        public VRPATransversales obERPATransversales = new VRPATransversales();
        public VRPAEspecificas obERPAEspecificas = new VRPAEspecificas();

        public VRPAIdiomas obERPAIdiomas = new VRPAIdiomas();
        public VRPAProgramas obERPAProgramas = new VRPAProgramas();

        public VRegistroPublicacionB obERegistroPublicacionB = new VRegistroPublicacionB();
        public VRPBTarea obERPBTarea = new VRPBTarea();
        public VRPBPerfil obERPBPerfil = new VRPBPerfil();

        //formulario
        public VPaTipoDocumento obEPaTipoDocumento = new VPaTipoDocumento();
        public VPaCivil obEPaCivil = new VPaCivil();
        public VPaAFP obEPaAFP = new VPaAFP();
        public VPaNivelD obEPaNivelD = new VPaNivelD();
        public VConsultaRegFinalista obEConsultaRegFinalista = new VConsultaRegFinalista();

        public VMantPersonal obEMantPersonal = new VMantPersonal();
        public VMantPersonalHijos obEMantPersonalHijos = new VMantPersonalHijos();

        public VConsultaPaPersonal obEConsultaPaPersonal = new VConsultaPaPersonal();
        public VConsultaPaPersonalHijos obEConsultaPaPersonalHijos = new VConsultaPaPersonalHijos();

        [WebMethod]
        public string RegistroLogin(String nombres, String apellidos, String correo, String clave, String perfil)
        {
            List<ERegistroLogin> lista = new List<ERegistroLogin>();
            lista = obERegistroLogin.RegistroLogin(nombres, apellidos, correo, clave, perfil);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string RegistroConsulta(Int32 post, String correo)
        {
            List<ERegistroConsulta> lista = new List<ERegistroConsulta>();
            lista = obERegistroConsulta.RegistroConsulta(post, correo);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string ValidarCodigo(Int32 codigo, String correo)
        {
            List<EValidarCodigo> lista = new List<EValidarCodigo>();
            lista = obEValidarCodigo.ValidarCodigo(codigo, correo);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string Login(String correo, String clave)
        {
            List<ELogin> lista = new List<ELogin>();
            lista = obELogin.Login(correo, clave);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string RecuperarClave(Int32 post, String correo)
        {
            List<ERecuperarClave> lista = new List<ERecuperarClave>();
            lista = obERecuperarClave.RecuperarClave(post, correo);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string Cargo(Int32 post, Int32 id, Int32 chk)
        {
            List<ECargo> lista = new List<ECargo>();
            lista = obECargo.Cargo(post, id, chk);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string Pais()
        {
            List<EPais> lista = new List<EPais>();
            lista = obEPais.Pais();
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string Departamento()
        {
            List<EDepartamento> lista = new List<EDepartamento>();
            lista = obEDepartamento.Departamento();
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string Provincia(Int32 departamento)
        {
            List<EProvincia> lista = new List<EProvincia>();
            lista = obEProvincia.Provincia(departamento);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string Distrito(Int32 provincia)
        {
            List<EDistrito> lista = new List<EDistrito>();
            lista = obEDistrito.Distrito(provincia);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string TipoContrato()
        {
            List<ETipoContrato> lista = new List<ETipoContrato>();
            lista = obETipoContrato.TipoContrato();
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string ConfiguracionCorreo()
        {
            List<EConfiguracionCorreo> lista = new List<EConfiguracionCorreo>();
            lista = obEConfiguracionCorreo.ConfiguracionCorreo();
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string Especifica()
        {
            List<EEspecifica> lista = new List<EEspecifica>();
            lista = obEEspecifica.Especifica();
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string Transversal()
        {
            List<ETransversal> lista = new List<ETransversal>();
            lista = obETransversal.Transversal();
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string GenCorrelativo(Int32 id)
        {
            List<EGenCorrelativo> lista = new List<EGenCorrelativo>();
            lista = obEGenCorrelativo.GenCorrelativo(id);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string ConsultaGenerado()
        {
            List<EConsultaGenerado> lista = new List<EConsultaGenerado>();
            lista = obEConsultaGenerado.ConsultaGenerado();
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string ConsultaPuestoA(String codigo)
        {
            List<EConsultaPuestoA> lista = new List<EConsultaPuestoA>();
            lista = obEConsultaPuestoA.ConsultaPuestoA(codigo);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string ConsultaResponsabilidad(Int32 post, String codigo, Int32 id)
        {
            List<EConsultaResponsabilidad> lista = new List<EConsultaResponsabilidad>();
            lista = obEConsultaResponsabilidad.ConsultaResponsabilidad(post, codigo, id);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string ConsultaImpacto(Int32 post, String codigo, Int32 id)
        {
            List<EConsultaImpacto> lista = new List<EConsultaImpacto>();
            lista = obEConsultaImpacto.ConsultaImpacto(post, codigo, id);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string ConsultaOrganizacion(Int32 post, String codigo, Int32 id)
        {
            List<EConsultaOrganizacion> lista = new List<EConsultaOrganizacion>();
            lista = obEConsultaOrganizacion.ConsultaOrganizacion(post, codigo, id);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string ConsultaRelaciones(Int32 post, String codigo, Int32 id)
        {
            List<EConsultaRelaciones> lista = new List<EConsultaRelaciones>();
            lista = obEConsultaRelaciones.ConsultaRelaciones(post, codigo, id);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string ConsultaDecisiones(Int32 post, String codigo, Int32 id)
        {
            List<EConsultaDecisiones> lista = new List<EConsultaDecisiones>();
            lista = obEConsultaDecisiones.ConsultaDecisiones(post, codigo, id);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string ConsultaTransversales(Int32 post, String codigo, Int32 id)
        {
            List<EConsultaTransversales> lista = new List<EConsultaTransversales>();
            lista = obEConsultaTransversales.ConsultaTransversales(post, codigo, id);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string ConsultaEspecificas(Int32 post, String codigo, Int32 id)
        {
            List<EConsultaEspecificas> lista = new List<EConsultaEspecificas>();
            lista = obEConsultaEspecificas.ConsultaEspecificas(post, codigo, id);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string ConsultaIdiomas(Int32 post, String codigo, Int32 id)
        {
            List<EConsultaIdiomas> lista = new List<EConsultaIdiomas>();
            lista = obEConsultaIdiomas.ConsultaIdiomas(post, codigo, id);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string ConsultaProgramas(Int32 post, String codigo, Int32 id)
        {
            List<EConsultaProgramas> lista = new List<EConsultaProgramas>();
            lista = obEConsultaProgramas.ConsultaProgramas(post, codigo, id);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string ConsultaLogin(Int32 id)
        {
            List<EConsultaLogin> lista = new List<EConsultaLogin>();
            lista = obEConsultaLogin.ConsultaLogin(id);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string ConsultaCV(Int32 post, Int32 id, Int32 user)
        {
            List<EConsultaCV> lista = new List<EConsultaCV>();
            lista = obEConsultaCV.ConsultaCV(post, id, user);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string ConsultaSolicitudes(Int32 user)
        {
            List<EConsultaSolicitudes> lista = new List<EConsultaSolicitudes>();
            lista = obEConsultaSolicitudes.ConsultaSolicitudes(user);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string ConsultaListaSolicitud(Int32 id)
        {
            List<EConsultaListaSolicitud> lista = new List<EConsultaListaSolicitud>();
            lista = obEConsultaListaSoicitud.ConsultaListaSolicitud(id);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string ConsultaPuestoAGEN(String codigo)
        {
            List<EConsultaPuestoAGEN> lista = new List<EConsultaPuestoAGEN>();
            lista = obEConsultaPuestoAGEN.ConsultaPuestoAGEN(codigo);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string PublicacionCAB(Int32 user)
        {
            List<EPublicacionCAB> lista = new List<EPublicacionCAB>();
            lista = obEPublicacionCAB.PublicacionCAB(user);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string Publicacion(String codigo)
        {
            List<EPublicacion> lista = new List<EPublicacion>();
            lista = obEPublicacion.Publicacion(codigo);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string PublicacionTarea(Int32 post, String codigo, Int32 id)
        {
            List<EPublicacionTarea> lista = new List<EPublicacionTarea>();
            lista = obEPublicacionTarea.PublicacionTarea(post, codigo, id);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string PublicacionPerfil(Int32 post, String codigo, Int32 id)
        {
            List<EPublicacionPerfil> lista = new List<EPublicacionPerfil>();
            lista = obEPublicacionPerfil.PublicacionPerfil(post, codigo, id);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string PublicacionB()
        {
            List<EPublicacionB> lista = new List<EPublicacionB>();
            lista = obEPublicacionB.PublicacionB();
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string Publicado(String codigo)
        {
            List<EPublicado> lista = new List<EPublicado>();
            lista = obEPublicado.Publicado(codigo);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string ConsultaCompania()
        {
            List<EConsultaCompania> lista = new List<EConsultaCompania>();
            lista = obEConsultaCompania.ConsultaCompania();
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string ConsultaMensajeFinalista()
        {
            List<EConsultaMensajeFinalista> lista = new List<EConsultaMensajeFinalista>();
            lista = obEConsultaMensajeFinalista.ConsultaMensajeFinalista();
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string ConsultaTipoArchivo(String modulo, String mime, String type)
        {
            List<EConsultaTipoArchivo> lista = new List<EConsultaTipoArchivo>();
            lista = obEConsultaTipoArchivo.ConsultaTipoArchivo(modulo, mime, type);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string ConsultaArchivosPostulados(Int32 postulacion, String publicacion, String modulo)
        {
            List<EConsultaArchivosPostulados> lista = new List<EConsultaArchivosPostulados>();
            lista = obEConsultaArchivosPostulados.ConsultaArchivosPostulados(postulacion, publicacion, modulo);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string PublicacionBDetalle(Int32 post, Int32 id, string publicacion, Int32 estados)
        {
            List<EPublicacionBDetalle> lista = new List<EPublicacionBDetalle>();
            lista = obEPublicacionBDetalle.PublicacionBDetalle(post, id, publicacion, estados);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string MisPostulaciones(Int32 user)
        {
            List<EMisPostulaciones> lista = new List<EMisPostulaciones>();
            lista = obEMisPostulaciones.MisPostulaciones(user);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string Seguimiento(String publicacion, Int32 user)
        {
            List<ESeguimiento> lista = new List<ESeguimiento>();
            lista = obESeguimiento.Seguimiento(publicacion, user);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string EntrevistaB()
        {
            List<EEntrevistaB> lista = new List<EEntrevistaB>();
            lista = obEEntrevistaB.EntrevistaB();
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string EntrevistaBDetalle(Int32 post, Int32 id, string publicacion, Int32 estados)
        {
            List<EEntrevistaBDetalle> lista = new List<EEntrevistaBDetalle>();
            lista = obEEntrevistaBDetalle.EntrevistaBDetalle(post, id, publicacion, estados);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string Calendario()
        {
            List<ECalendario> lista = new List<ECalendario>();
            lista = obECalendario.Calendario();
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string CalendarioCategoria(Int32 post)
        {
            List<ECalendarioCategoria> lista = new List<ECalendarioCategoria>();
            lista = obECalendarioCategoria.CalendarioCategoria(post);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string CalendarioCita(Int32 id)
        {
            List<ECalendarioCita> lista = new List<ECalendarioCita>();
            lista = obECalendarioCita.CalendarioCita(id);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string Notas(String publicacion, Int32 postulacion)
        {
            List<ENotas> lista = new List<ENotas>();
            lista = obENotas.Notas(publicacion, postulacion);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string ConPerfiles(Int32 post, Int32 perfil)
        {
            List<EConPerfiles> lista = new List<EConPerfiles>();
            lista = obEConPerfiles.ConPerfiles(post, perfil);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string ConPerfilesAccesos(Int32 post, Int32 perfil, Int32 menu)
        {
            List<EConPerfilesAccesos> lista = new List<EConPerfilesAccesos>();
            lista = obEConPerfilesAccesos.ConPerfilesAccesos(post, perfil, menu);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string Usuarios(Int32 post, Int32 codigo)
        {
            List<EUsuarios> lista = new List<EUsuarios>();
            lista = obEUsuarios.Usuarios(post, codigo);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string Menu(Int32 perfil)
        {
            List<EMenu> lista = new List<EMenu>();
            lista = obEMenu.Menu(perfil);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string SubMenu(Int32 perfil)
        {
            List<ESubMenu> lista = new List<ESubMenu>();
            lista = obESubMenu.SubMenu(perfil);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string MantCargo(Int32 post, Int32 id, String cargo, Int32 chk, Int32 dias, Int32 user)
        {
            List<EMantenimiento> lista = new List<EMantenimiento>();
            lista = obEMantCargo.MantCargo(post, id, cargo, chk, dias, user);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string MantLogin(Int32 post, Int32 id, String nombres, String apellidos, String foto, Int32 user)
        {
            List<EMantenimiento> lista = new List<EMantenimiento>();
            lista = obEMantLogin.MantLogin(post, id, nombres, apellidos, foto, user);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string MantPassword(Int32 id, String clave, Int32 user)
        {
            List<EMantenimiento> lista = new List<EMantenimiento>();
            lista = obEMantPassword.MantPassword(id, clave, user);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string MantCV(Int32 post, Int32 id, String nombre, String ruta, Decimal size, String type, Int32 user)
        {
            List<EMantenimiento> lista = new List<EMantenimiento>();
            lista = obEMantCV.MantCV(post, id, nombre, ruta, size, type, user);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string MantPostulacion(Int32 puesto, Int32 user)
        {
            List<EMantenimiento> lista = new List<EMantenimiento>();
            lista = obEMantPostulacion.MantPostulacion(puesto, user);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string MantPostulantesDetalle(Int32 post, Int32 id, Int32 estado, Int32 user)
        {
            List<EMantenimiento> lista = new List<EMantenimiento>();
            lista = obEMantPostulantesDetalle.MantPostulantesDetalle(post, id, estado, user);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string MantCategoriaCalendario(Int32 post, Int32 id, String categoria, String color, Int32 user)
        {
            List<EMantenimiento> lista = new List<EMantenimiento>();
            lista = obEMantCategoriaCalendario.MantCategoriaCalendario(post, id, categoria, color, user);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string MantCalendario(Int32 post, Int32 id, String publicacion, Int32 idpostulacion, Int32 idcategoria, String descripcion, String finicio, String ffin, Int32 user)
        {
            List<EMantenimiento> lista = new List<EMantenimiento>();
            lista = obEMantCalendario.MantCalendario(post, id, publicacion, idpostulacion, idcategoria, descripcion, finicio, ffin, user);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string MantNotas(Int32 post, Int32 id, String publicacion, Int32 idpostulacion, String nota, Int32 user)
        {
            List<EMantenimiento> lista = new List<EMantenimiento>();
            lista = obEMantNotas.MantNotas(post, id, publicacion, idpostulacion, nota, user);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string MantPerfilesAccesos(Int32 post, Int32 menu, Int32 submenu, Int32 perfil, Int32 tipo, Int32 user)
        {
            List<EMantenimiento> lista = new List<EMantenimiento>();
            lista = obEMantPerfilesAccesos.MantPerfilesAccesos(post, menu, submenu, perfil, tipo, user);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string MantPerfiles(Int32 post, String nombre, Int32 estado, Int32 perfil, Int32 user)
        {
            List<EMantenimiento> lista = new List<EMantenimiento>();
            lista = obEMantPerfiles.MantPerfiles(post, nombre, estado, perfil, user);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string MantUsuarios(Int32 post, Int32 codigo, String nombres, String apellidos, String correo, Int32 estado, Int32 perfil, Int32 confirmar, Int32 user)
        {
            List<EMantenimiento> lista = new List<EMantenimiento>();
            lista = obEMantUsuarios.MantUsuarios(post, codigo, nombres, apellidos, correo, estado, perfil, confirmar, user);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string MantSolicitudes(Int32 post, Int32 codigo, Int32 cantidad, Int32 solicitud, Int32 user)
        {
            List<EMantenimiento> lista = new List<EMantenimiento>();
            lista = obEMantSolicitudes.MantSolicitudes(post, codigo, cantidad, solicitud, user);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string Verificacion(Int32 codigo)
        {
            List<EMantenimiento> lista = new List<EMantenimiento>();
            lista = obEVerificacion.Verificacion(codigo);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string MantFinalista(Int32 post, Int32 id, Int32 finalista, String comentario, String nompostulante, String puesto, String publicacion, Int32 user)
        {
            List<EMantenimiento> lista = new List<EMantenimiento>();
            lista = obEMantFinalista.MantFinalista(post, id, finalista, comentario, nompostulante, puesto, publicacion, user);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string MantLogCorreos(Int32 id, String nombre, String asunto, String copia, String mensaje, Int32 output, String ruta, Int32 user)
        {
            List<EMantenimiento> lista = new List<EMantenimiento>();
            lista = obEMantLogCorreos.MantLogCorreos(id, nombre, asunto, copia, mensaje, output, ruta, user);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string MantArchivosPostulados(Int32 post, Int32 id, Int32 postulante, String publicacion, String ruta, String descripcion, String archivo, String mime, String type, Int32 size, Int32 user)
        {
            List<EMantenimiento> lista = new List<EMantenimiento>();
            lista = obEMantArchivosPostulados.MantArchivosPostulados(post, id, postulante, publicacion, ruta, descripcion, archivo, mime, type, size, user);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string MantConfiguracionCorreo(String correosalida, String password, String nombresalida, String servidorentrante, Int32 puerto, Int32 user)
        {
            List<EMantenimiento> lista = new List<EMantenimiento>();
            lista = obEMantConfiguracionCorreo.MantConfiguracionCorreo(correosalida, password, nombresalida, servidorentrante, puerto, user);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string MantCompania(String ruc, String razon, String dominio, Int32 user)
        {
            List<EMantenimiento> lista = new List<EMantenimiento>();
            lista = obEMantCompania.MantCompania(ruc, razon, dominio, user);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string MantCorreoFinalista(Int32 post, Int32 id, Int32 user)
        {
            List<EMantenimiento> lista = new List<EMantenimiento>();
            lista = obEMantCorreoFinalista.MantCorreoFinalista(post, id, user);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string MantMensajeFinalista(String asunto, String mensaje, Int32 user)
        {
            List<EMantenimiento> lista = new List<EMantenimiento>();
            lista = obEMantMensajeFinalista.MantMensajeFinalista(asunto, mensaje, user);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string RegistroPuestoA(
            Int32 post,
            String correlativo,
            Int32 estado,
            Int32 puesto,
            String fecha,
            String elaborado_por,
            String revisado_por,
            String gerencia,
            String posicion_reporta,
            String mision,
            String organizacion,
            String complejidad,
            String chktecnico,
            String chkuniversitario,
            String chkpostgrado,
            String chkotros,
            String otros,
            String profesion,
            String rd1,
            String rd2,
            String sector,
            Int32 anhio_sector,
            String personal_acargo,
            Int32 anhio_personal,
            String puestos_similares,
            Int32 anhio_puestos,
            String conocimiento,
            String otro_licencias,
            String desc_licencias,
            String otro_certificaciones,
            String desc_certificaciones,
            Int32 user
            )
        {
            List<EMantenimiento> lista = new List<EMantenimiento>();
            lista = obERegistroPuestoA.RegistroPuestoA(post, correlativo, estado, puesto, fecha, elaborado_por, revisado_por, gerencia, posicion_reporta, mision, organizacion,
                        complejidad, chktecnico, chkuniversitario, chkpostgrado, chkotros, otros, profesion, rd1, rd2, sector, anhio_sector,
                        personal_acargo, anhio_personal, puestos_similares, anhio_puestos, conocimiento, otro_licencias, desc_licencias, otro_certificaciones, desc_certificaciones, user);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string RPAResponsabilidades(Int32 post, String correlativo,
            Int32 id,
            String acciones,
            String resultados,
            Int32 user)
        {
            List<EMantenimiento> lista = new List<EMantenimiento>();
            lista = obERPAResponsabilidades.RPAResponsabilidades(post, correlativo, id, acciones, resultados, user);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string RPAImpacto(Int32 post, String correlativo,
            Int32 id,
            String dimensiones,
            String magnitudes,
            Int32 user)
        {
            List<EMantenimiento> lista = new List<EMantenimiento>();
            lista = obERPAImpacto.RPAImpacto(post, correlativo, id, dimensiones, magnitudes, user);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string RPAOrganizacion(Int32 post, String correlativo,
            Int32 id,
            String puestos,
            String reportes,
            Int32 user)
        {
            List<EMantenimiento> lista = new List<EMantenimiento>();
            lista = obERPAOrganizacion.RPAOrganizacion(post, correlativo, id, puestos, reportes, user);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string RPARelaciones(Int32 post, String correlativo,
            Int32 id,
            String entidades,
            String cargos,
            String objetivos,
            Int32 user)
        {
            List<EMantenimiento> lista = new List<EMantenimiento>();
            lista = obERPARelaciones.RPARelaciones(post, correlativo, id, entidades, cargos, objetivos, user);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string RPADecisiones(Int32 post, String correlativo,
            Int32 id,
            String decisiones,
            String recomendaciones,
            Int32 user)
        {
            List<EMantenimiento> lista = new List<EMantenimiento>();
            lista = obERPADecisiones.RPADecisiones(post, correlativo, id, decisiones, recomendaciones, user);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string RPATransversales(Int32 post, String correlativo,
            Int32 id,
            String descripcion,
            Int32 user)
        {
            List<EMantenimiento> lista = new List<EMantenimiento>();
            lista = obERPATransversales.RPATransversales(post, correlativo, id, descripcion, user);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string RPAEspecificas(Int32 post, String correlativo,
            Int32 id,
            String descripcion,
            Int32 user)
        {
            List<EMantenimiento> lista = new List<EMantenimiento>();
            lista = obERPAEspecificas.RPAEspecificas(post, correlativo, id, descripcion, user);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string RPAIdiomas(Int32 post, String correlativo,
            Int32 id,
            String idioma,
            Int32 ihabla,
            String vhabla,
            Int32 ilee,
            String vlee,
            Int32 iescribe,
            String vescribe,
            Int32 user)
        {
            List<EMantenimiento> lista = new List<EMantenimiento>();
            lista = obERPAIdiomas.RPAIdiomas(post, correlativo, id, idioma, ihabla, vhabla, ilee, vlee, iescribe, vescribe, user);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string RPAProgramas(Int32 post, String correlativo,
            Int32 id,
            String programa,
            Int32 inivel,
            String vnivel,
            Int32 user)
        {
            List<EMantenimiento> lista = new List<EMantenimiento>();
            lista = obERPAProgramas.RPAProgramas(post, correlativo, id, programa, inivel, vnivel, user);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string RegistroPublicacionB(
            Int32 post,
            Int32 estado,
            String correlativo,
            String titulo,
            String complemento,
            String descripcion,
            Int32 pais,
            Int32 departamento,
            Int32 provincia,
            Int32 distrito,
            Int32 jornada,
            String desc_jornada,
            Int32 contrato,
            String salario1,
            String salario2,
            String mostrar_salario,
            String fecha,
            Int32 vacantes,
            Int32 experiencia,
            Int32 edad_min,
            Int32 edad_max,
            String mostrar_edad,
            Int32 estudios,
            String desc_estudios,
            String rdviaje1,
            String rdviaje2,
            String rdresidencia1,
            String rdresidencia2,
            String rddiscapacidad1,
            String rddiscapacidad2,
            Int32 puesto,
            Int32 user
            )
        {
            List<EMantenimiento> lista = new List<EMantenimiento>();
            lista = obERegistroPublicacionB.RegistroPublicacionB(post, estado, correlativo, titulo, complemento, descripcion, pais, departamento, provincia, distrito, jornada, desc_jornada,
                       contrato, salario1, salario2, mostrar_salario, fecha, vacantes, experiencia, edad_min, edad_max, mostrar_edad, estudios,
                       desc_estudios, rdviaje1, rdviaje2, rdresidencia1, rdresidencia2, rddiscapacidad1, rddiscapacidad2, puesto, user);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string RPBTarea(Int32 post, String correlativo,
            Int32 id,
            String tarea,
            Int32 user)
        {
            List<EMantenimiento> lista = new List<EMantenimiento>();
            lista = obERPBTarea.RPBTarea(post, correlativo, id, tarea, user);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string RPBPerfil(Int32 post, String correlativo,
            Int32 id,
            String perfil,
            Int32 user)
        {
            List<EMantenimiento> lista = new List<EMantenimiento>();
            lista = obERPBPerfil.RPBPerfil(post, correlativo, id, perfil, user);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string PaTipoDocumento()
        {
            List<EPaTipoDocumento> lista = new List<EPaTipoDocumento>();
            lista = obEPaTipoDocumento.PaTipoDocumento();
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string PaCivil()
        {
            List<EPaCivil> lista = new List<EPaCivil>();
            lista = obEPaCivil.PaCivil();
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string PaAFP()
        {
            List<EPaAFP> lista = new List<EPaAFP>();
            lista = obEPaAFP.PaAFP();
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string PaNivelD()
        {
            List<EPaNivelD> lista = new List<EPaNivelD>();
            lista = obEPaNivelD.PaNivelD();
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string ConsultaRegFinalista(String publicacion, Int32 postulante, String secure)
        {
            List<EConsultaRegFinalista> lista = new List<EConsultaRegFinalista>();
            lista = obEConsultaRegFinalista.ConsultaRegFinalista(publicacion, postulante, secure);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string MantPersonal(
            Int32 post,
            Int32 postulante,
            String publicacion,
            String puesto,
            String nombre,
            String paterno,
            String materno,
            String fnacimiento,
            String tipodocumento,
            String dni,
            Int32 sexo,
            String civil,
            Int32 pais,
            Int32 departamento,
            Int32 provincia,
            Int32 distrito,
            String domicilio,
            String celular,
            String correo,
            Int32 iessalud,
            String vessalud,
            Int32 domiciliado,
            String afp,
            String comfluapf,
            String codafp,
            Int32 regimen,
            Int32 niveleducacion,
            Int32 discapacidad,
            String acepto,
            Int32 user)
        {
            List<EMantenimiento> lista = new List<EMantenimiento>();
            lista = obEMantPersonal.MantPersonal(post, postulante, publicacion, puesto, nombre, paterno, materno, fnacimiento, tipodocumento, dni, 
                sexo, civil, pais, departamento, provincia, distrito, domicilio, celular, correo, iessalud, vessalud,
                domiciliado, afp, comfluapf, codafp, regimen, niveleducacion, discapacidad, acepto, user);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string MantPersonalHijos(Int32 post, String dnipadre, String nombre, String fecha, Int32 edad, Int32 user)
        {
            List<EMantenimiento> lista = new List<EMantenimiento>();
            lista = obEMantPersonalHijos.MantPersonalHijos(post, dnipadre, nombre, fecha, edad, user);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string ConsultaPaPersonal(Int32 postulante, String publicacion, String secure)
        {
            List<EConsultaPaPersonal> lista = new List<EConsultaPaPersonal>();
            lista = obEConsultaPaPersonal.ConsultaPaPersonal(postulante, publicacion, secure);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

        [WebMethod]
        public string ConsultaPaPersonalHijos(String dni, Int32 postulante)
        {
            List<EConsultaPaPersonalHijos> lista = new List<EConsultaPaPersonalHijos>();
            lista = obEConsultaPaPersonalHijos.ConsultaPaPersonalHijos(dni, postulante);
            string json = JsonConvert.SerializeObject(lista);
            return json;
        }

    }
}