using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VConsultaOrganizacion : BDconexion
    {
        public List<EConsultaOrganizacion> ConsultaOrganizacion(Int32 post, String codigo, Int32 id)
        {
            List<EConsultaOrganizacion> lCConsultaOrganizacion = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CConsultaOrganizacion oVConsultaOrganizacion = new CConsultaOrganizacion();
                    lCConsultaOrganizacion = oVConsultaOrganizacion.ConsultaOrganizacion(con, post, codigo, id);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCConsultaOrganizacion);
        }
    }
}