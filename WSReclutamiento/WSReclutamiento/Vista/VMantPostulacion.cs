using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VMantPostulacion : BDconexion
    {
        public List<EMantenimiento> MantPostulacion(Int32 puesto, Int32 user)
        {
            List<EMantenimiento> lCEMantenimiento = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CMantPostulacion oVMantPostulacion = new CMantPostulacion();
                    lCEMantenimiento = oVMantPostulacion.MantPostulacion(con, puesto, user);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCEMantenimiento);
        }
    }
}