using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WSReclutamiento.Entity
{
    public class EConsultaListaSolicitud
    {
        public string i_id { get; set; }
        public string v_codigo { get; set; }
        public string i_puesto { get; set; }
        public string v_nombre_cargo { get; set; }
        public string v_usuario_genera { get; set; }
        public string d_fecha_registro { get; set; }
    }
}