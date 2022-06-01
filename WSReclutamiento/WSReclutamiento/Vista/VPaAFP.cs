using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VPaAFP : BDconexion
    {
        public List<EPaAFP> PaAFP()
        {
            List<EPaAFP> lCPaAFP = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CPaAFP oVPaAFP = new CPaAFP();
                    lCPaAFP = oVPaAFP.PaAFP(con);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCPaAFP);
        }
    }
}