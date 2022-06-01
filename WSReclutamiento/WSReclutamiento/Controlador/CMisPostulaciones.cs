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
    public class CMisPostulaciones
    {
        public List<EMisPostulaciones> MisPostulaciones(SqlConnection con, Int32 user)
        {
            List<EMisPostulaciones> lEMisPostulaciones = null;
            SqlCommand cmd = new SqlCommand("ASP_CONSULTAR_MIS_POSTULACIONES", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlParameter par1 = cmd.Parameters.Add("@user", SqlDbType.Int);
            par1.Direction = ParameterDirection.Input;
            par1.Value = user;

            SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);

            if (drd != null)
            {
                lEMisPostulaciones = new List<EMisPostulaciones>();

                EMisPostulaciones obEMisPostulaciones = null;
                while (drd.Read())
                {
                    obEMisPostulaciones = new EMisPostulaciones();
                    obEMisPostulaciones.v_codigo = drd["v_codigo"].ToString();
                    obEMisPostulaciones.v_empresa = drd["v_empresa"].ToString();
                    obEMisPostulaciones.d_fecha = drd["d_fecha"].ToString();
                    obEMisPostulaciones.v_titulo = drd["v_titulo"].ToString();
                    obEMisPostulaciones.v_pais = drd["v_pais"].ToString();
                    obEMisPostulaciones.v_departamento = drd["v_departamento"].ToString();
                    obEMisPostulaciones.v_provincia = drd["v_provincia"].ToString();
                    obEMisPostulaciones.v_distrito = drd["v_distrito"].ToString();
                    obEMisPostulaciones.v_jornada = drd["v_jornada"].ToString();
                    lEMisPostulaciones.Add(obEMisPostulaciones);
                }
                drd.Close();
            }

            return (lEMisPostulaciones);
        }
    }
}