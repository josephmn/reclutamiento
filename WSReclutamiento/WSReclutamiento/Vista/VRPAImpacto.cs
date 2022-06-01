using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VRPAImpacto : BDconexion
    {
        public List<EMantenimiento> RPAImpacto(
            Int32 post,
            String correlativo,
            Int32 id,
            String dimensiones,
            String magnitudes,
            Int32 user)
        {
            List<EMantenimiento> lCEMantenimiento = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CRPAImpacto oVRPAImpacto = new CRPAImpacto();
                    lCEMantenimiento = oVRPAImpacto.RPAImpacto(con, post, correlativo, id, dimensiones, magnitudes, user);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCEMantenimiento);
        }
    }
}