using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VConsultaPaPersonalHijos : BDconexion
    {
        public List<EConsultaPaPersonalHijos> ConsultaPaPersonalHijos(String dni, Int32 postulante)
        {
            List<EConsultaPaPersonalHijos> lCConsultaPaPersonalHijos = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CConsultaPaPersonalHijos oVConsultaPaPersonalHijos = new CConsultaPaPersonalHijos();
                    lCConsultaPaPersonalHijos = oVConsultaPaPersonalHijos.ConsultaPaPersonalHijos(con, dni, postulante);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCConsultaPaPersonalHijos);
        }
    }
}