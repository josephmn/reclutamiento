using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VConsultaListaSolicitud : BDconexion
    {
        public List<EConsultaListaSolicitud> ConsultaListaSolicitud(Int32 id)
        {
            List<EConsultaListaSolicitud> lCConsultaListaSolicitud = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CConsultaListaSolicitud oVConsultaListaSolicitud = new CConsultaListaSolicitud();
                    lCConsultaListaSolicitud = oVConsultaListaSolicitud.ConsultaListaSolicitud(con, id);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCConsultaListaSolicitud);
        }
    }
}