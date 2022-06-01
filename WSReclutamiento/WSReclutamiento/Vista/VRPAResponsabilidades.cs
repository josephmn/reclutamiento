using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VRPAResponsabilidades : BDconexion
    {
        public List<EMantenimiento> RPAResponsabilidades(
            Int32 post,
            String correlativo,
            Int32 id,
            String acciones,
            String resultados,
            Int32 user)
        {
            List<EMantenimiento> lCEMantenimiento = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CRPAResponsabilidades oVRPAResponsabilidades = new CRPAResponsabilidades();
                    lCEMantenimiento = oVRPAResponsabilidades.RPAResponsabilidades(con, post, correlativo, id, acciones, resultados, user);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCEMantenimiento);
        }
    }
}