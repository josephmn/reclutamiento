using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VPais : BDconexion
    {
        public List<EPais> Pais()
        {
            List<EPais> lCPais = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CPais oVPais = new CPais();
                    lCPais = oVPais.Pais(con);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCPais);
        }
    }
}