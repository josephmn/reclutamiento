using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WSReclutamiento.Entity
{
    public class ECalendarioCita
    {
        public int i_id { get; set; }
        public int i_idpostulacion { get; set; }
        public string v_nombres { get; set; }
        public string v_publicacion { get; set; }
        public string v_titulo { get; set; }
        public int i_categoria { get; set; }
        public string d_finicio { get; set; }
        public string d_ffin { get; set; }
    }
}