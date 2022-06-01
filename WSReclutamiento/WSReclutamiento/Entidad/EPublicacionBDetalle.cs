using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WSReclutamiento.Entity
{
    public class EPublicacionBDetalle
    {      
        public string i_id { get; set; }
        public string v_publicacion { get; set; }
        public string v_titulo { get; set; }
        public string v_postulante { get; set; }
        public string v_ruta { get; set; }
        public string v_correo { get; set; }
        public string d_fecha { get; set; }
        public string v_hora { get; set; }
        public string i_estado { get; set; }
        public string v_estado { get; set; }
        public string v_estado_color { get; set; }
        public string v_estado_cv_color { get; set; }
    }
}