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
    public class CPublicacionB
    {
        public List<EPublicacionB> PublicacionB(SqlConnection con)
        {
            List<EPublicacionB> lEPublicacionB = null;
            SqlCommand cmd = new SqlCommand("ASP_CONSULTAR_PUBLICACIONB", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);

            if (drd != null)
            {
                lEPublicacionB = new List<EPublicacionB>();

                EPublicacionB obEPublicacionB = null;
                while (drd.Read())
                {
                    obEPublicacionB = new EPublicacionB();
                    obEPublicacionB.v_codigo = drd["v_codigo"].ToString();
                    obEPublicacionB.v_titulo = drd["v_titulo"].ToString();
                    obEPublicacionB.v_complemento = drd["v_complemento"].ToString();
                    obEPublicacionB.d_fecha_inicio_reclutamiento = drd["d_fecha_inicio_reclutamiento"].ToString();
                    obEPublicacionB.d_fecha_fin_reclutamiento = drd["d_fecha_fin_reclutamiento"].ToString();
                    obEPublicacionB.i_estado = drd["i_estado"].ToString();
                    obEPublicacionB.v_estado = drd["v_estado"].ToString();
                    obEPublicacionB.v_estado_color = drd["v_estado_color"].ToString();
                    obEPublicacionB.v_puesto = drd["v_puesto"].ToString();
                    obEPublicacionB.v_cargo = drd["v_cargo"].ToString();
                    obEPublicacionB.d_fecha_creacion = drd["d_fecha_creacion"].ToString();
                    //obEPublicacionB.d_hora = drd["d_hora"].ToString();
                    obEPublicacionB.i_postulantes = drd["i_postulantes"].ToString();
                    obEPublicacionB.v_usuario_crea = drd["v_usuario_crea"].ToString();
                    lEPublicacionB.Add(obEPublicacionB);
                }
                drd.Close();
            }

            return (lEPublicacionB);
        }
    }
}