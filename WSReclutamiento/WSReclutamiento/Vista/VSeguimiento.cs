using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VSeguimiento : BDconexion
    {
        public List<ESeguimiento> Seguimiento(String publicacion, Int32 user)
        {
            List<ESeguimiento> lCSeguimiento = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CSeguimiento oVSeguimiento = new CSeguimiento();
                    lCSeguimiento = oVSeguimiento.Seguimiento(con, publicacion, user);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCSeguimiento);
        }
    }
}