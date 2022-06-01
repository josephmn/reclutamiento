using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VConsultaArchivosPostulados : BDconexion
    {
        public List<EConsultaArchivosPostulados> ConsultaArchivosPostulados(Int32 postulacion, String publicacion, String modulo)
        {
            List<EConsultaArchivosPostulados> lCConsultaArchivosPostulados = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CConsultaArchivosPostulados oVConsultaArchivosPostulados = new CConsultaArchivosPostulados();
                    lCConsultaArchivosPostulados = oVConsultaArchivosPostulados.ConsultaArchivosPostulados(con, postulacion, publicacion, modulo);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCConsultaArchivosPostulados);
        }
    }
}