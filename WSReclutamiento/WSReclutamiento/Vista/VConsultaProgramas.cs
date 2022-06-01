using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VConsultaProgramas : BDconexion
    {
        public List<EConsultaProgramas> ConsultaProgramas(Int32 post, String codigo, Int32 id)
        {
            List<EConsultaProgramas> lCConsultaProgramas = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CConsultaProgramas oVConsultaProgramas = new CConsultaProgramas();
                    lCConsultaProgramas = oVConsultaProgramas.ConsultaProgramas(con, post, codigo, id);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCConsultaProgramas);
        }
    }
}