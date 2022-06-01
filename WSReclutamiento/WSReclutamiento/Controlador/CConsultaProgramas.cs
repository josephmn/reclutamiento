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
    public class CConsultaProgramas
    {
        public List<EConsultaProgramas> ConsultaProgramas(SqlConnection con, Int32 post, String codigo, Int32 id)
        {
            List<EConsultaProgramas> lEConsultaProgramas = null;
            SqlCommand cmd = new SqlCommand("ASP_CONSULTAR_PROGRAMAS", con);
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
                lEConsultaProgramas = new List<EConsultaProgramas>();

                EConsultaProgramas obEConsultaProgramas = null;
                while (drd.Read())
                {
                    obEConsultaProgramas = new EConsultaProgramas();
                    obEConsultaProgramas.i_id = drd["i_id"].ToString();
                    obEConsultaProgramas.v_programa = drd["v_programa"].ToString();
                    obEConsultaProgramas.i_nivel = Convert.ToInt32(drd["i_nivel"].ToString());
                    obEConsultaProgramas.v_nivel = drd["v_nivel"].ToString();
                    lEConsultaProgramas.Add(obEConsultaProgramas);
                }
                drd.Close();
            }

            return (lEConsultaProgramas);
        }
    }
}