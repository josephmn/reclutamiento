using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VConsultaPaPersonal : BDconexion
    {
        public List<EConsultaPaPersonal> ConsultaPaPersonal(Int32 postulante, String publicacion, String secure)
        {
            List<EConsultaPaPersonal> lCConsultaPaPersonal = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CConsultaPaPersonal oVConsultaPaPersonal = new CConsultaPaPersonal();
                    lCConsultaPaPersonal = oVConsultaPaPersonal.ConsultaPaPersonal(con, postulante, publicacion, secure);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCConsultaPaPersonal);
        }
    }
}