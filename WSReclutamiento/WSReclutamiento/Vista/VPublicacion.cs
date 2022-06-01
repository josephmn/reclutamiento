using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VPublicacion : BDconexion
    {
        public List<EPublicacion> Publicacion(String codigo)
        {
            List<EPublicacion> lCPublicacion = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CPublicacion oVPublicacion = new CPublicacion();
                    lCPublicacion = oVPublicacion.Publicacion(con, codigo);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCPublicacion);
        }
    }
}