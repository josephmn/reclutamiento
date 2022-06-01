using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VMantPostulantesDetalle : BDconexion
    {
        public List<EMantenimiento> MantPostulantesDetalle(Int32 post, Int32 id, Int32 estado, Int32 user)
        {
            List<EMantenimiento> lCEMantenimiento = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CMantPostulantesDetalle oVMantPostulantesDetalle = new CMantPostulantesDetalle();
                    lCEMantenimiento = oVMantPostulantesDetalle.MantPostulantesDetalle(con, post, id, estado, user);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCEMantenimiento);
        }
    }
}