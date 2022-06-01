using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WSReclutamiento.Entity
{
    public class EConsultaIdiomas
    {
        public string i_id { get; set; }
        public string v_idioma { get; set; }
        public Int32 i_habla { get; set; }
        public string v_habla { get; set; }
        public Int32 i_lee { get; set; }
        public string v_lee { get; set; }
        public Int32 i_escribe { get; set; }
        public string v_escribe { get; set; }
    }
}