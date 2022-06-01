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
    public class CConsultaRelaciones
    {
        public List<EConsultaRelaciones> ConsultaRelaciones(SqlConnection con, Int32 post, String codigo, Int32 id)
        {
            List<EConsultaRelaciones> lEConsultaRelaciones = null;
            SqlCommand cmd = new SqlCommand("ASP_CONSULTAR_RELACIONES", con);
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
                lEConsultaRelaciones = new List<EConsultaRelaciones>();

                EConsultaRelaciones obEConsultaRelaciones = null;
                while (drd.Read())
                {
                    obEConsultaRelaciones = new EConsultaRelaciones();
                    obEConsultaRelaciones.i_id = drd["i_id"].ToString();
                    obEConsultaRelaciones.v_entidad = drd["v_entidad"].ToString();
                    obEConsultaRelaciones.v_cargo = drd["v_cargo"].ToString();
                    obEConsultaRelaciones.v_objetivo = drd["v_objetivo"].ToString();
                    lEConsultaRelaciones.Add(obEConsultaRelaciones);
                }
                drd.Close();
            }

            return (lEConsultaRelaciones);
        }
    }
}