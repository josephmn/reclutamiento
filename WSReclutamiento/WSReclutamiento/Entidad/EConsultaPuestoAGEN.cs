using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WSReclutamiento.Entity
{
    public class EConsultaPuestoAGEN
    {
        public string v_codigo { get; set; }
        public Int32 i_estado { get; set; }
        public string v_puesto { get; set; }
        public string d_fecha { get; set; }
        public string v_elaborado_por { get; set; }
        public string v_revisado_por { get; set; }
        public string v_gerencia { get; set; }
        public string v_posicion_reporta { get; set; }
        public string v_mision { get; set; }
        public Int32 i_mision_len { get; set; }
        public string v_organizacion { get; set; }
        public string v_complejidad { get; set; }
        public Int32 i_complejidad_len { get; set; }
        public Boolean v_chktecnico { get; set; }
        public Boolean v_chkuniversitario { get; set; }
        public Boolean v_chkpostgrado { get; set; }
        public Boolean v_chkotros { get; set; }
        public string v_otros { get; set; }
        public string v_profesion { get; set; }
        public Boolean v_rd1 { get; set; }
        public Boolean v_rd2 { get; set; }
        public Boolean v_sector { get; set; }
        public Int32 v_anhio_sector { get; set; }
        public Boolean v_personal_acargo { get; set; }
        public Int32 v_anhio_personal { get; set; }
        public Boolean v_puestos_similares { get; set; }
        public Int32 v_anhio_puestos { get; set; }
        public string v_conocimiento { get; set; }
        public Int32 i_conocimiento_len { get; set; }
        public Boolean v_otro_licencias { get; set; }
        public string v_desc_licencias { get; set; }
        public Boolean v_otro_certificaciones { get; set; }
        public string v_desc_certificaciones { get; set; }
    }
}