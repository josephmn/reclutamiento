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
    public class CConsultaResponsabilidad
    {
        public List<EConsultaResponsabilidad> ConsultaResponsabilidad(SqlConnection con, Int32 post, String codigo, Int32 id)
        {
            List<EConsultaResponsabilidad> lEConsultaResponsabilidad = null;
            SqlCommand cmd = new SqlCommand("ASP_CONSULTAR_RESPONSABILIDADES", con);
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
                lEConsultaResponsabilidad = new List<EConsultaResponsabilidad>();

                EConsultaResponsabilidad obEConsultaResponsabilidad = null;
                while (drd.Read())
                {
                    obEConsultaResponsabilidad = new EConsultaResponsabilidad();
                    obEConsultaResponsabilidad.i_id = drd["i_id"].ToString();
                    obEConsultaResponsabilidad.v_acciones = drd["v_acciones"].ToString();
                    obEConsultaResponsabilidad.v_resultado = drd["v_resultado"].ToString();
                    lEConsultaResponsabilidad.Add(obEConsultaResponsabilidad);
                }
                drd.Close();
            }

            return (lEConsultaResponsabilidad);
        }
    }
}