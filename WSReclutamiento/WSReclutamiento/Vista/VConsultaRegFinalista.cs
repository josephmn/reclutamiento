using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VConsultaRegFinalista : BDconexion
    {
        public List<EConsultaRegFinalista> ConsultaRegFinalista(String publicacion, Int32 postulante, String secure)
        {
            List<EConsultaRegFinalista> lCConsultaRegFinalista = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CConsultaRegFinalista oVConsultaRegFinalista = new CConsultaRegFinalista();
                    lCConsultaRegFinalista = oVConsultaRegFinalista.ConsultaRegFinalista(con, publicacion, postulante, secure);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCConsultaRegFinalista);
        }
    }
}