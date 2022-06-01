using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VMantSolicitudes : BDconexion
    {
        public List<EMantenimiento> MantSolicitudes(Int32 post, Int32 codigo, Int32 cantidad, Int32 solicitud, Int32 user)
        {
            List<EMantenimiento> lCEMantenimiento = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CMantSolicitudes oVMantSolicitudes = new CMantSolicitudes();
                    lCEMantenimiento = oVMantSolicitudes.MantSolicitudes(con, post, codigo, cantidad, solicitud, user);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCEMantenimiento);
        }
    }
}