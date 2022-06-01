using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VRPBPerfil : BDconexion
    {
        public List<EMantenimiento> RPBPerfil(
            Int32 post,
            String correlativo,
            Int32 id,
            String perfil,
            Int32 user)
        {
            List<EMantenimiento> lCEMantenimiento = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CRPBPerfil oVRPBPerfil = new CRPBPerfil();
                    lCEMantenimiento = oVRPBPerfil.RPBPerfil(con, post, correlativo, id, perfil, user);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCEMantenimiento);
        }
    }
}