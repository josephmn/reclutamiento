using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VConsultaGenerado : BDconexion
    {
        public List<EConsultaGenerado> ConsultaGenerado()
        {
            List<EConsultaGenerado> lCConsultaGenerado = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CConsultaGenerado oVConsultaGenerado = new CConsultaGenerado();
                    lCConsultaGenerado = oVConsultaGenerado.ConsultaGenerado(con);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCConsultaGenerado);
        }
    }
}