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
    public class CConsultaImpacto
    {
        public List<EConsultaImpacto> ConsultaImpacto(SqlConnection con, Int32 post, String codigo, Int32 id)
        {
            List<EConsultaImpacto> lEConsultaImpacto = null;
            SqlCommand cmd = new SqlCommand("ASP_CONSULTAR_IMPACTO", con);
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
                lEConsultaImpacto = new List<EConsultaImpacto>();

                EConsultaImpacto obEConsultaImpacto = null;
                while (drd.Read())
                {
                    obEConsultaImpacto = new EConsultaImpacto();
                    obEConsultaImpacto.i_id = drd["i_id"].ToString();
                    obEConsultaImpacto.v_dimensiones = drd["v_dimensiones"].ToString();
                    obEConsultaImpacto.v_magnitud = drd["v_magnitud"].ToString();
                    lEConsultaImpacto.Add(obEConsultaImpacto);
                }
                drd.Close();
            }

            return (lEConsultaImpacto);
        }
    }
}