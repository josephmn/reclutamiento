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
    public class CEntrevistaB
    {
        public List<EEntrevistaB> EntrevistaB(SqlConnection con)
        {
            List<EEntrevistaB> lEEntrevistaB = null;
            SqlCommand cmd = new SqlCommand("ASP_CONSULTAR_ENTREVISTAB", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);

            if (drd != null)
            {
                lEEntrevistaB = new List<EEntrevistaB>();

                EEntrevistaB obEEntrevistaB = null;
                while (drd.Read())
                {
                    obEEntrevistaB = new EEntrevistaB();
                    obEEntrevistaB.v_codigo = drd["v_codigo"].ToString();
                    obEEntrevistaB.v_titulo = drd["v_titulo"].ToString();
                    obEEntrevistaB.v_complemento = drd["v_complemento"].ToString();
                    obEEntrevistaB.d_fecha_inicio_reclutamiento = drd["d_fecha_inicio_reclutamiento"].ToString();
                    obEEntrevistaB.d_fecha_fin_reclutamiento = drd["d_fecha_fin_reclutamiento"].ToString();
                    obEEntrevistaB.i_estado = drd["i_estado"].ToString();
                    obEEntrevistaB.v_estado = drd["v_estado"].ToString();
                    obEEntrevistaB.v_estado_color = drd["v_estado_color"].ToString();
                    obEEntrevistaB.v_puesto = drd["v_puesto"].ToString();
                    obEEntrevistaB.v_cargo = drd["v_cargo"].ToString();
                    obEEntrevistaB.d_fecha_creacion = drd["d_fecha_creacion"].ToString();
                    //obEEntrevistaB.d_hora = drd["d_hora"].ToString();
                    obEEntrevistaB.i_postulantes = drd["i_postulantes"].ToString();
                    obEEntrevistaB.i_cantidad = drd["i_cantidad"].ToString();
                    obEEntrevistaB.i_finalista = drd["i_finalista"].ToString();
                    obEEntrevistaB.v_usuario_crea = drd["v_usuario_crea"].ToString();
                    lEEntrevistaB.Add(obEEntrevistaB);
                }
                drd.Close();
            }

            return (lEEntrevistaB);
        }
    }
}