using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VGenCorrelativo : BDconexion
    {
        public List<EGenCorrelativo> GenCorrelativo(Int32 post)
        {
            List<EGenCorrelativo> lCGenCorrelativo = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CGenCorrelativo oVGenCorrelativo = new CGenCorrelativo();
                    lCGenCorrelativo = oVGenCorrelativo.GenCorrelativo(con, post);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCGenCorrelativo);
        }
    }
}