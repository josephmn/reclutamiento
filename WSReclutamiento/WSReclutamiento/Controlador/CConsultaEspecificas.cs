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
    public class CConsultaEspecificas
    {
        public List<EConsultaEspecificas> ConsultaEspecificas(SqlConnection con, Int32 post, String codigo, Int32 id)
        {
            List<EConsultaEspecificas> lEConsultaEspecificas = null;
            SqlCommand cmd = new SqlCommand("ASP_CONSULTAR_ESPECIFICAS", con);
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
                lEConsultaEspecificas = new List<EConsultaEspecificas>();

                EConsultaEspecificas obEConsultaEspecificas = null;
                while (drd.Read())
                {
                    obEConsultaEspecificas = new EConsultaEspecificas();
                    obEConsultaEspecificas.i_id = drd["i_id"].ToString();
                    obEConsultaEspecificas.v_descripcion = drd["v_descripcion"].ToString();
                    lEConsultaEspecificas.Add(obEConsultaEspecificas);
                }
                drd.Close();
            }

            return (lEConsultaEspecificas);
        }
    }
}