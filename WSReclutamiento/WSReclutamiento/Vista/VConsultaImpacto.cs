using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VConsultaImpacto : BDconexion
    {
        public List<EConsultaImpacto> ConsultaImpacto(Int32 post, String codigo, Int32 id)
        {
            List<EConsultaImpacto> lCConsultaImpacto = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CConsultaImpacto oVConsultaImpacto = new CConsultaImpacto();
                    lCConsultaImpacto = oVConsultaImpacto.ConsultaImpacto(con, post, codigo, id);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCConsultaImpacto);
        }
    }
}