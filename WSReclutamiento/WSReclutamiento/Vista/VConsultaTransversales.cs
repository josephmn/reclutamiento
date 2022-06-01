using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VConsultaTransversales : BDconexion
    {
        public List<EConsultaTransversales> ConsultaTransversales(Int32 post, String codigo, Int32 id)
        {
            List<EConsultaTransversales> lCConsultaTransversales = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CConsultaTransversales oVConsultaTransversales = new CConsultaTransversales();
                    lCConsultaTransversales = oVConsultaTransversales.ConsultaTransversales(con, post, codigo, id);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCConsultaTransversales);
        }
    }
}