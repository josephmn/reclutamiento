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
    public class CConsultaMensajeFinalista
    {
        public List<EConsultaMensajeFinalista> ConsultaMensajeFinalista(SqlConnection con)
        {
            List<EConsultaMensajeFinalista> lEConsultaMensajeFinalista = null;
            SqlCommand cmd = new SqlCommand("ASP_CONSULTAR_MENSAJE_FINALISTA", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);

            if (drd != null)
            {
                lEConsultaMensajeFinalista = new List<EConsultaMensajeFinalista>();

                EConsultaMensajeFinalista obEConsultaMensajeFinalista = null;
                while (drd.Read())
                {
                    obEConsultaMensajeFinalista = new EConsultaMensajeFinalista();
                    obEConsultaMensajeFinalista.v_asunto = drd["v_asunto"].ToString();
                    obEConsultaMensajeFinalista.v_mensaje = drd["v_mensaje"].ToString();
                    obEConsultaMensajeFinalista.i_mensaje = drd["i_mensaje"].ToString();
                    lEConsultaMensajeFinalista.Add(obEConsultaMensajeFinalista);
                }
                drd.Close();
            }

            return (lEConsultaMensajeFinalista);
        }
    }
}