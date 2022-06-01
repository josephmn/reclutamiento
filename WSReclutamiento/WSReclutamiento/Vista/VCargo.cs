using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VCargo : BDconexion
    {
        public List<ECargo> Cargo(Int32 post, Int32 id, Int32 chk)
        {
            List<ECargo> lCCargo = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CCargo oVCargo = new CCargo();
                    lCCargo = oVCargo.Cargo(con, post, id, chk);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCCargo);
        }
    }
}