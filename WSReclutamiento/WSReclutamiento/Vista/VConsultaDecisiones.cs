using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VConsultaDecisiones : BDconexion
    {
        public List<EConsultaDecisiones> ConsultaDecisiones(Int32 post, String codigo, Int32 id)
        {
            List<EConsultaDecisiones> lCConsultaDecisiones = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CConsultaDecisiones oVConsultaDecisiones = new CConsultaDecisiones();
                    lCConsultaDecisiones = oVConsultaDecisiones.ConsultaDecisiones(con, post, codigo, id);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCConsultaDecisiones);
        }
    }
}