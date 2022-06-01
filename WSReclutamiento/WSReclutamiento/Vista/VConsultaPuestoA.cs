using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VConsultaPuestoA : BDconexion
    {
        public List<EConsultaPuestoA> ConsultaPuestoA(String codigo)
        {
            List<EConsultaPuestoA> lCConsultaPuestoA = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CConsultaPuestoA oVConsultaPuestoA = new CConsultaPuestoA();
                    lCConsultaPuestoA = oVConsultaPuestoA.ConsultaPuestoA(con, codigo);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCConsultaPuestoA);
        }
    }
}