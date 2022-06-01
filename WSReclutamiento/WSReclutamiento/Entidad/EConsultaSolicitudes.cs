using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WSReclutamiento.Entity
{
    public class EConsultaSolicitudes
    {
        public Int32 i_id { get; set; }
        public Int32 i_puesto { get; set; }
        public string v_nombre { get; set; }
        public Int32 i_cantidad { get; set; }
        public string v_codigo { get; set; }
        public string v_estado { get; set; }
        public string v_color_estado { get; set; }
        public string v_codigo_pub { get; set; }
        public string v_nombre_cargo { get; set; }
        public string i_num_postulante { get; set; }
        public string v_display_cantidad { get; set; }
        public string v_fini_publicacion { get; set; }
        public string v_ffin_publicacion { get; set; }
        public string v_display { get; set; }
        public string v_usuario { get; set; }
        public string v_fecha { get; set; }
    }
}