using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VPublicacionB : BDconexion
    {
        public List<EPublicacionB> PublicacionB()
        {
            List<EPublicacionB> lCPublicacionB = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CPublicacionB oVPublicacionB = new CPublicacionB();
                    lCPublicacionB = oVPublicacionB.PublicacionB(con);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCPublicacionB);
        }
    }
}