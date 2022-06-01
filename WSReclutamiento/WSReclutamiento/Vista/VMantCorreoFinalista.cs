using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VMantCorreoFinalista : BDconexion
    {
        public List<EMantenimiento> MantCorreoFinalista(Int32 post, Int32 id, Int32 user)
        {
            List<EMantenimiento> lCEMantenimiento = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CMantCorreoFinalista oVMantCorreoFinalista = new CMantCorreoFinalista();
                    lCEMantenimiento = oVMantCorreoFinalista.MantCorreoFinalista(con, post, id, user);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCEMantenimiento);
        }
    }
}