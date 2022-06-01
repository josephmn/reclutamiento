using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VRPARelaciones : BDconexion
    {
        public List<EMantenimiento> RPARelaciones(
            Int32 post,
            String correlativo,
            Int32 id,
            String entidades,
            String cargos,
            String objetivos,
            Int32 user
            )
        {
            List<EMantenimiento> lCEMantenimiento = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CRPARelaciones oVRPARelaciones = new CRPARelaciones();
                    lCEMantenimiento = oVRPARelaciones.RPARelaciones(con, post, correlativo, id, entidades, cargos, objetivos, user);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCEMantenimiento);
        }
    }
}