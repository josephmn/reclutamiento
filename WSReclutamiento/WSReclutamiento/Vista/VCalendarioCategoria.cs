using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VCalendarioCategoria : BDconexion
    {
        public List<ECalendarioCategoria> CalendarioCategoria(Int32 post)
        {
            List<ECalendarioCategoria> lCCalendarioCategoria = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CCalendarioCategoria oVCalendarioCategoria = new CCalendarioCategoria();
                    lCCalendarioCategoria = oVCalendarioCategoria.CalendarioCategoria(con, post);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCCalendarioCategoria);
        }
    }
}