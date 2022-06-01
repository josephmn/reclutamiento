using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VRPBTarea : BDconexion
    {
        public List<EMantenimiento> RPBTarea(
            Int32 post,
            String correlativo,
            Int32 id,
            String tarea,
            Int32 user)
        {
            List<EMantenimiento> lCEMantenimiento = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CRPBTarea oVRPBTarea = new CRPBTarea();
                    lCEMantenimiento = oVRPBTarea.RPBTarea(con, post, correlativo, id, tarea, user);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCEMantenimiento);
        }
    }
}