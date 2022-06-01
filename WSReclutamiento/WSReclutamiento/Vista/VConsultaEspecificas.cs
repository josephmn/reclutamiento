using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VConsultaEspecificas : BDconexion
    {
        public List<EConsultaEspecificas> ConsultaEspecificas(Int32 post, String codigo, Int32 id)
        {
            List<EConsultaEspecificas> lCConsultaEspecificas = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CConsultaEspecificas oVConsultaEspecificas = new CConsultaEspecificas();
                    lCConsultaEspecificas = oVConsultaEspecificas.ConsultaEspecificas(con, post, codigo, id);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCConsultaEspecificas);
        }
    }
}