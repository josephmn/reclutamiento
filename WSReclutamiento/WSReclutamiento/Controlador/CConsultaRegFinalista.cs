using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Collections.Specialized;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using WSReclutamiento.Entity;

namespace WSReclutamiento.Controller
{
    public class CConsultaRegFinalista
    {
        public List<EConsultaRegFinalista> ConsultaRegFinalista(SqlConnection con, String publicacion, Int32 postulante, String secure)
        {
            List<EConsultaRegFinalista> lEConsultaRegFinalista = null;
            SqlCommand cmd = new SqlCommand("ASP_CONSULTA_REG_FINALISTA", con);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@publicacion", SqlDbType.VarChar).Value = publicacion;
            cmd.Parameters.AddWithValue("@postulante", SqlDbType.Int).Value = postulante;
            cmd.Parameters.AddWithValue("@secure", SqlDbType.VarChar).Value = secure;

            SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);

            if (drd != null)
            {
                lEConsultaRegFinalista = new List<EConsultaRegFinalista>();

                EConsultaRegFinalista obEConsultaRegFinalista = null;
                while (drd.Read())
                {
                    obEConsultaRegFinalista = new EConsultaRegFinalista();
                    obEConsultaRegFinalista.i_count = Convert.ToInt32(drd["i_count"].ToString());
                    lEConsultaRegFinalista.Add(obEConsultaRegFinalista);
                }
                drd.Close();
            }

            return (lEConsultaRegFinalista);
        }
    }
}