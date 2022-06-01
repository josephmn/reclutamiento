using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VMantCargo : BDconexion
    {
        public List<EMantenimiento> MantCargo(Int32 post, Int32 id, String cargo, Int32 chk, Int32 dias, Int32 user)
        {
            List<EMantenimiento> lCEMantenimiento = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CMantCargo oVMantCargo = new CMantCargo();
                    lCEMantenimiento = oVMantCargo.MantCargo(con, post, id, cargo, chk, dias, user);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCEMantenimiento);
        }
    }
}