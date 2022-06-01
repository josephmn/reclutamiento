using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WSReclutamiento.Entity
{
    public class ECalendario
    {
        public string i_id { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public string start { get; set; }
        public string end { get; set; }
        public string backgroundColor { get; set; }
        public string borderColor { get; set; }
        public Boolean allDay { get; set; }
        public string v_publicacion { get; set; }
        public string v_titulo { get; set; }
        public string v_nombres { get; set; }
    }
}