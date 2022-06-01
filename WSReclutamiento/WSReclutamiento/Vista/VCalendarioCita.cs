using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VCalendarioCita : BDconexion
    {
        public List<ECalendarioCita> CalendarioCita(Int32 id)
        {
            List<ECalendarioCita> lCCalendarioCita = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CCalendarioCita oVCalendarioCita = new CCalendarioCita();
                    lCCalendarioCita = oVCalendarioCita.CalendarioCita(con, id);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCCalendarioCita);
        }
    }
}