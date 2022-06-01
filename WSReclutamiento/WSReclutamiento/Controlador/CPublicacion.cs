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
    public class CPublicacion
    {
        public List<EPublicacion> Publicacion(SqlConnection con, String codigo)
        {
            List<EPublicacion> lEPublicacion = null;
            SqlCommand cmd = new SqlCommand("ASP_CONSULTAR_PUBLICACION", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlParameter par1 = cmd.Parameters.Add("@codigo", SqlDbType.VarChar);
            par1.Direction = ParameterDirection.Input;
            par1.Value = codigo;

            SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);

            if (drd != null)
            {
                lEPublicacion = new List<EPublicacion>();

                EPublicacion obEPublicacion = null;
                while (drd.Read())
                {
                    obEPublicacion = new EPublicacion();
                    obEPublicacion.v_codigo = drd["v_codigo"].ToString();
                    obEPublicacion.v_empresa = drd["v_empresa"].ToString();
                    obEPublicacion.d_fecha = drd["d_fecha"].ToString();
                    obEPublicacion.v_titulo = drd["v_titulo"].ToString();
                    obEPublicacion.v_complemento = drd["v_complemento"].ToString();
                    obEPublicacion.v_descripcion_puesto = drd["v_descripcion_puesto"].ToString();
                    obEPublicacion.v_pais = drd["v_pais"].ToString();
                    obEPublicacion.v_departamento = drd["v_departamento"].ToString();
                    obEPublicacion.v_provincia = drd["v_provincia"].ToString();
                    obEPublicacion.v_distrito = drd["v_distrito"].ToString();
                    obEPublicacion.v_jornada = drd["v_jornada"].ToString();
                    obEPublicacion.v_salario = drd["v_salario"].ToString();
                    obEPublicacion.i_vacantes = drd["i_vacantes"].ToString();
                    obEPublicacion.i_experiencia = drd["i_experiencia"].ToString();
                    obEPublicacion.v_edad = drd["v_edad"].ToString();
                    obEPublicacion.v_estudios = drd["v_estudios"].ToString();
                    obEPublicacion.v_viaje = drd["v_viaje"].ToString();
                    obEPublicacion.v_residencia = drd["v_residencia"].ToString();
                    obEPublicacion.v_discapacidad = drd["v_discapacidad"].ToString();
                    obEPublicacion.v_puesto = drd["v_puesto"].ToString();
                    lEPublicacion.Add(obEPublicacion);
                }
                drd.Close();
            }

            return (lEPublicacion);
        }
    }
}