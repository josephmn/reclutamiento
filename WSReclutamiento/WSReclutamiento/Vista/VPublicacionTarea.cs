using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VPublicacionTarea : BDconexion
    {
        public List<EPublicacionTarea> PublicacionTarea(Int32 post, String codigo, Int32 id)
        {
            List<EPublicacionTarea> lCPublicacionTarea = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CPublicacionTarea oVPublicacionTarea = new CPublicacionTarea();
                    lCPublicacionTarea = oVPublicacionTarea.PublicacionTarea(con, post, codigo, id);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCPublicacionTarea);
        }
    }
}