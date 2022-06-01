using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VRPATransversales : BDconexion
    {
        public List<EMantenimiento> RPATransversales(
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
                    CRPATransversales oVRPATransversales = new CRPATransversales();
                    lCEMantenimiento = oVRPATransversales.RPATransversales(con, post, correlativo, id, descripcion, user);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCEMantenimiento);
        }
    }
}