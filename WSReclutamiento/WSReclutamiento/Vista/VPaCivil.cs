using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VPaCivil : BDconexion
    {
        public List<EPaCivil> PaCivil()
        {
            List<EPaCivil> lCPaCivil = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CPaCivil oVPaCivil = new CPaCivil();
                    lCPaCivil = oVPaCivil.PaCivil(con);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCPaCivil);
        }
    }
}