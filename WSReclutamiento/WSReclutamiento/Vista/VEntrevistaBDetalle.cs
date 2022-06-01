using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VEntrevistaBDetalle : BDconexion
    {
        public List<EEntrevistaBDetalle> EntrevistaBDetalle(Int32 post, Int32 id, string publicacion, Int32 estados)
        {
            List<EEntrevistaBDetalle> lCEntrevistaBDetalle = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CEntrevistaBDetalle oVEntrevistaBDetalle = new CEntrevistaBDetalle();
                    lCEntrevistaBDetalle = oVEntrevistaBDetalle.EntrevistaBDetalle(con, post, id, publicacion, estados);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCEntrevistaBDetalle);
        }
    }
}