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
    public class CConsultaTransversales
    {
        public List<EConsultaTransversales> ConsultaTransversales(SqlConnection con, Int32 post, String codigo, Int32 id)
        {
            List<EConsultaTransversales> lEConsultaTransversales = null;
            SqlCommand cmd = new SqlCommand("ASP_CONSULTAR_TRANSVERSALES", con);
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
                lEConsultaTransversales = new List<EConsultaTransversales>();

                EConsultaTransversales obEConsultaTransversales = null;
                while (drd.Read())
                {
                    obEConsultaTransversales = new EConsultaTransversales();
                    obEConsultaTransversales.i_id = drd["i_id"].ToString();
                    obEConsultaTransversales.v_descripcion = drd["v_descripcion"].ToString();
                    lEConsultaTransversales.Add(obEConsultaTransversales);
                }
                drd.Close();
            }

            return (lEConsultaTransversales);
        }
    }
}