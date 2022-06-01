using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WSReclutamiento.Entity
{
    public class EPublicacionB
    {      
        public string v_codigo { get; set; }
        public string v_titulo { get; set; }
        public string v_complemento { get; set; }
        public string d_fecha_inicio_reclutamiento { get; set; }
        public string d_fecha_fin_reclutamiento { get; set; }
        public string i_estado { get; set; }
        public string v_estado { get; set; }
        public string v_estado_color { get; set; }
        public string v_puesto { get; set; }
        public string v_cargo { get; set; }
        public string d_fecha_creacion { get; set; }
        public string d_hora { get; set; }
        public string i_postulantes { get; set; }
        public string v_usuario_crea { get; set; }
    }
}