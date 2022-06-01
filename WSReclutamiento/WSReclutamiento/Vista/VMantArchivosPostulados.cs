using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VMantArchivosPostulados : BDconexion
    {
        public List<EMantenimiento> MantArchivosPostulados(Int32 post, Int32 id, Int32 postulante, String publicacion, String ruta, String descripcion, String archivo, String mime, String type, Int32 size, Int32 user)
        {
            List<EMantenimiento> lCEMantenimiento = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CMantArchivosPostulados oVMantArchivosPostulados = new CMantArchivosPostulados();
                    lCEMantenimiento = oVMantArchivosPostulados.MantArchivosPostulados(con, post, id, postulante, publicacion, ruta, descripcion, archivo, mime, type, size, user);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCEMantenimiento);
        }
    }
}