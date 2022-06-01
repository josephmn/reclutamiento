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
    public class CConsultaSolicitudes
    {
        public List<EConsultaSolicitudes> ConsultaSolicitudes(SqlConnection con, Int32 user)
        {
            List<EConsultaSolicitudes> lEConsultaSolicitudes = null;
            SqlCommand cmd = new SqlCommand("ASP_CONSULTAR_SOLICITUDES", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlParameter par1 = cmd.Parameters.Add("@user", SqlDbType.Int);
            par1.Direction = ParameterDirection.Input;
            par1.Value = user;

            SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);

            if (drd != null)
            {
                lEConsultaSolicitudes = new List<EConsultaSolicitudes>();

                EConsultaSolicitudes obEConsultaSolicitudes = null;
                while (drd.Read())
                {
                    obEConsultaSolicitudes = new EConsultaSolicitudes();
                    obEConsultaSolicitudes.i_id = Convert.ToInt32(drd["i_id"].ToString());
                    obEConsultaSolicitudes.i_puesto = Convert.ToInt32(drd["i_puesto"].ToString());
                    obEConsultaSolicitudes.v_nombre = drd["v_nombre"].ToString();
                    obEConsultaSolicitudes.i_cantidad = Convert.ToInt32(drd["i_cantidad"].ToString());
                    obEConsultaSolicitudes.v_codigo = drd["v_codigo"].ToString();
                    obEConsultaSolicitudes.v_estado = drd["v_estado"].ToString();
                    obEConsultaSolicitudes.v_color_estado = drd["v_color_estado"].ToString();
                    obEConsultaSolicitudes.v_codigo_pub = drd["v_codigo_pub"].ToString();
                    obEConsultaSolicitudes.v_nombre_cargo = drd["v_nombre_cargo"].ToString();
                    obEConsultaSolicitudes.i_num_postulante = drd["i_num_postulante"].ToString();
                    obEConsultaSolicitudes.v_display_cantidad = drd["v_display_cantidad"].ToString();
                    obEConsultaSolicitudes.v_fini_publicacion = drd["v_fini_publicacion"].ToString();
                    obEConsultaSolicitudes.v_ffin_publicacion = drd["v_ffin_publicacion"].ToString();
                    obEConsultaSolicitudes.v_display = drd["v_display"].ToString();
                    obEConsultaSolicitudes.v_usuario = drd["v_usuario"].ToString();
                    obEConsultaSolicitudes.v_fecha = drd["v_fecha"].ToString();
                    lEConsultaSolicitudes.Add(obEConsultaSolicitudes);
                }
                drd.Close();
            }

            return (lEConsultaSolicitudes);
        }
    }
}