using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VMantCV : BDconexion
    {
        public List<EMantenimiento> MantCV(Int32 post, Int32 id, String nombre, String ruta, Decimal size, String type, Int32 user)
        {
            List<EMantenimiento> lCEMantenimiento = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CMantCV oVMantCV = new CMantCV();
                    lCEMantenimiento = oVMantCV.MantCV(con, post, id, nombre, ruta, size, type, user);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCEMantenimiento);
        }
    }
}