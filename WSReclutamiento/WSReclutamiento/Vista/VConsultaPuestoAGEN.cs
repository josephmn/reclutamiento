using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VConsultaPuestoAGEN : BDconexion
    {
        public List<EConsultaPuestoAGEN> ConsultaPuestoAGEN(String codigo)
        {
            List<EConsultaPuestoAGEN> lCConsultaPuestoAGEN = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CConsultaPuestoAGEN oVConsultaPuestoAGEN = new CConsultaPuestoAGEN();
                    lCConsultaPuestoAGEN = oVConsultaPuestoAGEN.ConsultaPuestoAGEN(con, codigo);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCConsultaPuestoAGEN);
        }
    }
}