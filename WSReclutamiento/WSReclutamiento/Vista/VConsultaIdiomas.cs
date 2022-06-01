using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VConsultaIdiomas : BDconexion
    {
        public List<EConsultaIdiomas> ConsultaIdiomas(Int32 post, String codigo, Int32 id)
        {
            List<EConsultaIdiomas> lCConsultaIdiomas = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CConsultaIdiomas oVConsultaIdiomas = new CConsultaIdiomas();
                    lCConsultaIdiomas = oVConsultaIdiomas.ConsultaIdiomas(con, post, codigo, id);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCConsultaIdiomas);
        }
    }
}