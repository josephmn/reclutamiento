using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VPublicacionCAB : BDconexion
    {
        public List<EPublicacionCAB> PublicacionCAB(Int32 user)
        {
            List<EPublicacionCAB> lCPublicacionCAB = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CPublicacionCAB oVPublicacionCAB = new CPublicacionCAB();
                    lCPublicacionCAB = oVPublicacionCAB.PublicacionCAB(con, user);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCPublicacionCAB);
        }
    }
}