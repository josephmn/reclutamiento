using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VConsultaRelaciones : BDconexion
    {
        public List<EConsultaRelaciones> ConsultaRelaciones(Int32 post, String codigo, Int32 id)
        {
            List<EConsultaRelaciones> lCConsultaRelaciones = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CConsultaRelaciones oVConsultaRelaciones = new CConsultaRelaciones();
                    lCConsultaRelaciones = oVConsultaRelaciones.ConsultaRelaciones(con, post, codigo, id);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCConsultaRelaciones);
        }
    }
}