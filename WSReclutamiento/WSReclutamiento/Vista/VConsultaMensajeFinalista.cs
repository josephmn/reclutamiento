using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VConsultaMensajeFinalista : BDconexion
    {
        public List<EConsultaMensajeFinalista> ConsultaMensajeFinalista()
        {
            List<EConsultaMensajeFinalista> lCConsultaMensajeFinalista = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CConsultaMensajeFinalista oVConsultaMensajeFinalista = new CConsultaMensajeFinalista();
                    lCConsultaMensajeFinalista = oVConsultaMensajeFinalista.ConsultaMensajeFinalista(con);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCConsultaMensajeFinalista);
        }
    }
}