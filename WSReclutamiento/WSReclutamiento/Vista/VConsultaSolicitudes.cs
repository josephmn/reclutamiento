using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VConsultaSolicitudes : BDconexion
    {
        public List<EConsultaSolicitudes> ConsultaSolicitudes(Int32 user)
        {
            List<EConsultaSolicitudes> lCConsultaSolicitudes = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CConsultaSolicitudes oVConsultaSolicitudes = new CConsultaSolicitudes();
                    lCConsultaSolicitudes = oVConsultaSolicitudes.ConsultaSolicitudes(con, user);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCConsultaSolicitudes);
        }
    }
}