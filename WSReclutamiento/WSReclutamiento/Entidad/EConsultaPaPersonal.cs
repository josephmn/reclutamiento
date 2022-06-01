using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WSReclutamiento.Entity
{
    public class EConsultaPaPersonal
    {
        public Int32 i_postulante { get; set; }
        public String v_publicacion { get; set; }
        public String v_cargo { get; set; }
        public String v_tipodoc { get; set; }
        public String v_nombres { get; set; }
        public String d_fnacimiento { get; set; }
        public String v_dni { get; set; }
        public String v_sexo { get; set; }
        public String v_civil { get; set; }
        public String v_pais { get; set; }
        public String v_departamento { get; set; }
        public String v_provincia { get; set; }
        public String v_distrito { get; set; }
        public String v_domicilio { get; set; }
        public String v_celular { get; set; }
        public String v_correo { get; set; }
        public Int32 i_hijos { get; set; }
        public String i_essalud { get; set; }
        public String v_essalud { get; set; }
        public String i_domiciliado { get; set; }
        public String v_afp { get; set; }
        public String v_comfluafp { get; set; }
        public String v_codafp { get; set; }
        public String i_regimen { get; set; }
        public String v_niveleducacion { get; set; }
        public String i_discapacidad { get; set; }
        public String v_acepto { get; set; }
        public String v_ruta { get; set; }
}
}