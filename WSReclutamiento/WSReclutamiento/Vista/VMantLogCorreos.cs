using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VMantLogCorreos : BDconexion
    {
        public List<EMantenimiento> MantLogCorreos(Int32 id, String nombre, String asunto, String copia, String mensaje, Int32 output, String ruta, Int32 user)
        {
            List<EMantenimiento> lCEMantenimiento = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CMantLogCorreos oVMantLogCorreos = new CMantLogCorreos();
                    lCEMantenimiento = oVMantLogCorreos.MantLogCorreos(con, id, nombre, asunto, copia, mensaje, output, ruta, user);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCEMantenimiento);
        }
    }
}