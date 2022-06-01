using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VRPAOrganizacion : BDconexion
    {
        public List<EMantenimiento> RPAOrganizacion(
            Int32 post,
            String correlativo,
            Int32 id,
            String puestos,
            String reportes,
            Int32 user)
        {
            List<EMantenimiento> lCEMantenimiento = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CRPAOrganizacion oVRPAOrganizacion = new CRPAOrganizacion();
                    lCEMantenimiento = oVRPAOrganizacion.RPAOrganizacion(con, post, correlativo, id, puestos, reportes, user);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCEMantenimiento);
        }
    }
}