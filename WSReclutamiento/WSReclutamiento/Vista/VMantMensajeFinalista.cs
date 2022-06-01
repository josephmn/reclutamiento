using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VMantMensajeFinalista : BDconexion
    {
        public List<EMantenimiento> MantMensajeFinalista(String asunto, String mensaje, Int32 user)
        {
            List<EMantenimiento> lCEMantenimiento = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CMantMensajeFinalista oVMantMensajeFinalista = new CMantMensajeFinalista();
                    lCEMantenimiento = oVMantMensajeFinalista.MantMensajeFinalista(con, asunto, mensaje, user);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCEMantenimiento);
        }
    }
}