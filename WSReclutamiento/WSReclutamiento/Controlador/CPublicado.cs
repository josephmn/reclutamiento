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
    public class CPublicado
    {
        public List<EPublicado> Publicado(SqlConnection con, String codigo)
        {
            List<EPublicado> lEPublicado = null;
            SqlCommand cmd = new SqlCommand("ASP_CONSULTAR_PUBLICADO", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlParameter par1 = cmd.Parameters.Add("@codigo", SqlDbType.VarChar);
            par1.Direction = ParameterDirection.Input;
            par1.Value = codigo;

            SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);

            if (drd != null)
            {
                lEPublicado = new List<EPublicado>();

                EPublicado obEPublicado = null;
                while (drd.Read())
                {
                    obEPublicado = new EPublicado();
                    obEPublicado.v_codigo = drd["v_codigo"].ToString();
                    obEPublicado.i_estado = Convert.ToInt32(drd["i_estado"].ToString());
                    obEPublicado.v_titulo = drd["v_titulo"].ToString();
                    obEPublicado.v_complemento = drd["v_complemento"].ToString();
                    obEPublicado.v_descripcion_puesto = drd["v_descripcion_puesto"].ToString();
                    obEPublicado.i_descripcion_len = Convert.ToInt32(drd["i_descripcion_len"].ToString());
                    obEPublicado.i_pais = Convert.ToInt32(drd["i_pais"].ToString());
                    obEPublicado.i_departamento = Convert.ToInt32(drd["i_departamento"].ToString());
                    obEPublicado.i_provincia = Convert.ToInt32(drd["i_provincia"].ToString());
                    obEPublicado.i_distrito = Convert.ToInt32(drd["i_distrito"].ToString());
                    obEPublicado.i_jornada = Convert.ToInt32(drd["i_jornada"].ToString());
                    obEPublicado.i_contrato = Convert.ToInt32(drd["i_contrato"].ToString());
                    obEPublicado.v_salario1 = drd["v_salario1"].ToString();
                    obEPublicado.v_salario2 = drd["v_salario2"].ToString();
                    obEPublicado.v_mostrar_salario = Convert.ToBoolean(drd["v_mostrar_salario"].ToString());
                    obEPublicado.d_fecha = drd["d_fecha"].ToString();
                    obEPublicado.i_vacantes = Convert.ToInt32(drd["i_vacantes"].ToString());
                    obEPublicado.i_experiencia = Convert.ToInt32(drd["i_experiencia"].ToString());
                    obEPublicado.i_edad_min = Convert.ToInt32(drd["i_edad_min"].ToString());
                    obEPublicado.i_edad_max = Convert.ToInt32(drd["i_edad_max"].ToString());
                    obEPublicado.v_mostrar_edad = Convert.ToBoolean(drd["v_mostrar_edad"].ToString());
                    obEPublicado.i_estudios = Convert.ToInt32(drd["i_estudios"].ToString());
                    obEPublicado.v_rdviaje1 = Convert.ToBoolean(drd["v_rdviaje1"].ToString());
                    obEPublicado.v_rdviaje2 = Convert.ToBoolean(drd["v_rdviaje2"].ToString());
                    obEPublicado.v_rdresidencia1 = Convert.ToBoolean(drd["v_rdresidencia1"].ToString());
                    obEPublicado.v_rdresidencia2 = Convert.ToBoolean(drd["v_rdresidencia2"].ToString());
                    obEPublicado.v_rddiscapacidad1 = Convert.ToBoolean(drd["v_rddiscapacidad1"].ToString());
                    obEPublicado.v_rddiscapacidad2 = Convert.ToBoolean(drd["v_rddiscapacidad2"].ToString());
                    lEPublicado.Add(obEPublicado);
                }
                drd.Close();
            }

            return (lEPublicado);
        }
    }
}