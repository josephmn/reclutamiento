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
    public class CConsultaDecisiones
    {
        public List<EConsultaDecisiones> ConsultaDecisiones(SqlConnection con, Int32 post, String codigo, Int32 id)
        {
            List<EConsultaDecisiones> lEConsultaDecisiones = null;
            SqlCommand cmd = new SqlCommand("ASP_CONSULTAR_DECISIONES", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlParameter par1 = cmd.Parameters.Add("@post", SqlDbType.Int);
            par1.Direction = ParameterDirection.Input;
            par1.Value = post;

            SqlParameter par2 = cmd.Parameters.Add("@codigo", SqlDbType.VarChar);
            par2.Direction = ParameterDirection.Input;
            par2.Value = codigo;

            SqlParameter par3 = cmd.Parameters.Add("@id", SqlDbType.Int);
            par3.Direction = ParameterDirection.Input;
            par3.Value = id;

            SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);

            if (drd != null)
            {
                lEConsultaDecisiones = new List<EConsultaDecisiones>();

                EConsultaDecisiones obEConsultaDecisiones = null;
                while (drd.Read())
                {
                    obEConsultaDecisiones = new EConsultaDecisiones();
                    obEConsultaDecisiones.i_id = drd["i_id"].ToString();
                    obEConsultaDecisiones.v_decisiones = drd["v_decisiones"].ToString();
                    obEConsultaDecisiones.v_recomendaciones = drd["v_recomendaciones"].ToString();
                    lEConsultaDecisiones.Add(obEConsultaDecisiones);
                }
                drd.Close();
            }

            return (lEConsultaDecisiones);
        }
    }
}