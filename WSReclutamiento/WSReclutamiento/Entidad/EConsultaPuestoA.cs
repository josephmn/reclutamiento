using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WSReclutamiento.Entity
{
    public class EConsultaPuestoA
    {
        public string v_codigo { get; set; }
        public string v_puesto { get; set; }
        public string d_fecha { get; set; }
        public string v_elaborado_por { get; set; }
        public string v_revisado_por { get; set; }
        public string v_gerencia { get; set; }
        public string v_posicion_reporta { get; set; }
        public string v_mision { get; set; }
        public string i_mision_len { get; set; }
        public string v_organizacion { get; set; }
        public string v_complejidad { get; set; }
        public string i_complejidad_len { get; set; }
        public string v_chktecnico { get; set; }
        public string v_chkuniversitario { get; set; }
        public string v_chkpostgrado { get; set; }
        public string v_chkotros { get; set; }
        public string v_otros { get; set; }
        public string v_profesion { get; set; }
        public string v_rd1 { get; set; }
        public string v_rd2 { get; set; }
        public string v_sector { get; set; }
        public string v_anhio_sector { get; set; }
        public string v_personal_acargo { get; set; }
        public string v_anhio_personal { get; set; }
        public string v_puestos_similares { get; set; }
        public string v_anhio_puestos { get; set; }
        public string v_conocimiento { get; set; }
        public string v_otro_licencias { get; set; }
        public string v_desc_licencias { get; set; }
        public string v_otro_certificaciones { get; set; }
        public string v_desc_certificaciones { get; set; }
    }
}