using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VProvincia : BDconexion
    {
        public List<EProvincia> Provincia(Int32 departamento)
        {
            List<EProvincia> lCProvincia = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CProvincia oVProvincia = new CProvincia();
                    lCProvincia = oVProvincia.Provincia(con, departamento);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCProvincia);
        }
    }
}