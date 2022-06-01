using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VRPAEspecificas : BDconexion
    {
        public List<EMantenimiento> RPAEspecificas(
            Int32 post,
            String correlativo,
            Int32 id,
            String descripcion,
            Int32 user)
        {
            List<EMantenimiento> lCEMantenimiento = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CRPAEspecificas oVRPAEspecificas = new CRPAEspecificas();
                    lCEMantenimiento = oVRPAEspecificas.RPAEspecificas(con, post, correlativo, id, descripcion, user);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCEMantenimiento);
        }
    }
}