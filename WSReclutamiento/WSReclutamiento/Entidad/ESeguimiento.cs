using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WSReclutamiento.Entity
{
    public class ESeguimiento
    {
        public string id { get; set; }
        public string v_publicacion { get; set; }
        public string v_titulo { get; set; }
        public string i_postulante { get; set; }
        public string d_fecha { get; set; }
        public string v_hora { get; set; }
        public string v_cabecera { get; set; }
        public string v_mensaje { get; set; }
        public string v_cargo { get; set; }
    }
}