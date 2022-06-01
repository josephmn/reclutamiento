using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VPublicacionBDetalle : BDconexion
    {
        public List<EPublicacionBDetalle> PublicacionBDetalle(Int32 post, Int32 id, string publicacion, Int32 estados)
        {
            List<EPublicacionBDetalle> lCPublicacionBDetalle = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CPublicacionBDetalle oVPublicacionBDetalle = new CPublicacionBDetalle();
                    lCPublicacionBDetalle = oVPublicacionBDetalle.PublicacionBDetalle(con, post, id, publicacion, estados);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCPublicacionBDetalle);
        }
    }
}