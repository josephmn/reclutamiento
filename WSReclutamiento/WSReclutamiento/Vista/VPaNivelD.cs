using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VPaNivelD : BDconexion
    {
        public List<EPaNivelD> PaNivelD()
        {
            List<EPaNivelD> lCPaNivelD = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CPaNivelD oVPaNivelD = new CPaNivelD();
                    lCPaNivelD = oVPaNivelD.PaNivelD(con);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCPaNivelD);
        }
    }
}