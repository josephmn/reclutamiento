using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WSReclutamiento.Entity
{
    public class ENotas
    {
        public int i_id { get; set; }
        public int i_idpostulacion { get; set; }
        public string v_nota { get; set; }
        public string v_fecha { get; set; }
        public string v_publicacion { get; set; }
        public string v_titulo { get; set; }
        public string v_nombres { get; set; }
    }
}