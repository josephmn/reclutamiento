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
    public class CConsultaGenerado
    {
        public List<EConsultaGenerado> ConsultaGenerado(SqlConnection con)
        {
            List<EConsultaGenerado> lEConsultaGenerado = null;
            SqlCommand cmd = new SqlCommand("ASP_CONSULTAR_GENERADO", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);

            if (drd != null)
            {
                lEConsultaGenerado = new List<EConsultaGenerado>();

                EConsultaGenerado obEConsultaGenerado = null;
                while (drd.Read())
                {
                    obEConsultaGenerado = new EConsultaGenerado();
                    obEConsultaGenerado.i_id = drd["i_id"].ToString();
                    obEConsultaGenerado.v_codigo = drd["v_codigo"].ToString();
                    obEConsultaGenerado.i_puesto = drd["i_puesto"].ToString();
                    obEConsultaGenerado.v_nombre_cargo = drd["v_nombre_cargo"].ToString();
                    obEConsultaGenerado.v_usuario_genera = drd["v_usuario_genera"].ToString();
                    obEConsultaGenerado.d_fecha_registro = drd["d_fecha_registro"].ToString();
                    obEConsultaGenerado.d_fecha_actualizacion = drd["d_fecha_actualizacion"].ToString();
                    obEConsultaGenerado.v_actualizacion = drd["v_actualizacion"].ToString();
                    obEConsultaGenerado.v_estado = drd["v_estado"].ToString();
                    obEConsultaGenerado.v_color_estado = drd["v_color_estado"].ToString();
                    lEConsultaGenerado.Add(obEConsultaGenerado);
                }
                drd.Close();
            }

            return (lEConsultaGenerado);
        }
    }
}