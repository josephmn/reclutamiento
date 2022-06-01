using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VPublicacionPerfil : BDconexion
    {
        public List<EPublicacionPerfil> PublicacionPerfil(Int32 post, String codigo, Int32 id)
        {
            List<EPublicacionPerfil> lCPublicacionPerfil = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CPublicacionPerfil oVPublicacionPerfil = new CPublicacionPerfil();
                    lCPublicacionPerfil = oVPublicacionPerfil.PublicacionPerfil(con, post, codigo, id);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCPublicacionPerfil);
        }
    }
}