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
    public class CPublicacionCAB
    {
        public List<EPublicacionCAB> PublicacionCAB(SqlConnection con, Int32 user)
        {
            List<EPublicacionCAB> lEPublicacionCAB = null;
            SqlCommand cmd = new SqlCommand("ASP_CONSULTAR_PUBLICACION_CAB", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlParameter par1 = cmd.Parameters.Add("@user", SqlDbType.Int);
            par1.Direction = ParameterDirection.Input;
            par1.Value = user;

            SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);

            if (drd != null)
            {
                lEPublicacionCAB = new List<EPublicacionCAB>();

                EPublicacionCAB obEPublicacionCAB = null;
                while (drd.Read())
                {
                    obEPublicacionCAB = new EPublicacionCAB();
                    obEPublicacionCAB.v_codigo = drd["v_codigo"].ToString();
                    obEPublicacionCAB.v_empresa = drd["v_empresa"].ToString();
                    obEPublicacionCAB.d_fecha = drd["d_fecha"].ToString();
                    obEPublicacionCAB.v_titulo = drd["v_titulo"].ToString();
                    obEPublicacionCAB.v_pais = drd["v_pais"].ToString();
                    obEPublicacionCAB.v_departamento = drd["v_departamento"].ToString();
                    obEPublicacionCAB.v_provincia = drd["v_provincia"].ToString();
                    obEPublicacionCAB.v_distrito = drd["v_distrito"].ToString();
                    obEPublicacionCAB.v_jornada = drd["v_jornada"].ToString();
                    lEPublicacionCAB.Add(obEPublicacionCAB);
                }
                drd.Close();
            }

            return (lEPublicacionCAB);
        }
    }
}