using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VConsultaTipoArchivo : BDconexion
    {
        public List<EConsultaTipoArchivo> ConsultaTipoArchivo(String modulo, String mime, String type)
        {
            List<EConsultaTipoArchivo> lCConsultaTipoArchivo = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CConsultaTipoArchivo oVConsultaTipoArchivo = new CConsultaTipoArchivo();
                    lCConsultaTipoArchivo = oVConsultaTipoArchivo.ConsultaTipoArchivo(con, modulo, mime, type);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCConsultaTipoArchivo);
        }
    }
}