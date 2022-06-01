using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VConsultaCV : BDconexion
    {
        public List<EConsultaCV> ConsultaCV(Int32 post, Int32 id, Int32 user)
        {
            List<EConsultaCV> lCConsultaCV = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CConsultaCV oVConsultaCV = new CConsultaCV();
                    lCConsultaCV = oVConsultaCV.ConsultaCV(con, post, id, user);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCConsultaCV);
        }
    }
}