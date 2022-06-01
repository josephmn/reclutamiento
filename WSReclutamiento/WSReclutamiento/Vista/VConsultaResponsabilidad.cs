using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VConsultaResponsabilidad : BDconexion
    {
        public List<EConsultaResponsabilidad> ConsultaResponsabilidad(Int32 post, String codigo, Int32 id)
        {
            List<EConsultaResponsabilidad> lCConsultaResponsabilidad = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CConsultaResponsabilidad oVConsultaResponsabilidad = new CConsultaResponsabilidad();
                    lCConsultaResponsabilidad = oVConsultaResponsabilidad.ConsultaResponsabilidad(con, post, codigo, id);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCConsultaResponsabilidad);
        }
    }
}