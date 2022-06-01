using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VCalendario : BDconexion
    {
        public List<ECalendario> Calendario()
        {
            List<ECalendario> lCCalendario = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CCalendario oVCalendario = new CCalendario();
                    lCCalendario = oVCalendario.Calendario(con);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCCalendario);
        }
    }
}