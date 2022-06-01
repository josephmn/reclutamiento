using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VEntrevistaB : BDconexion
    {
        public List<EEntrevistaB> EntrevistaB()
        {
            List<EEntrevistaB> lCEntrevistaB = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CEntrevistaB oVEntrevistaB = new CEntrevistaB();
                    lCEntrevistaB = oVEntrevistaB.EntrevistaB(con);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCEntrevistaB);
        }
    }
}