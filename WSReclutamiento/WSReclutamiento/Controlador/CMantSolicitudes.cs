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
    public class CMantSolicitudes
    {
        public List<EMantenimiento> MantSolicitudes(SqlConnection con, Int32 post, Int32 codigo, Int32 cantidad, Int32 solicitud, Int32 user)
        {
            List<EMantenimiento> lEMantenimiento = null;
            SqlCommand cmd = new SqlCommand("ASP_MANT_SOLICITUDES", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlParameter par1 = cmd.Parameters.Add("@post", SqlDbType.Int);
            par1.Direction = ParameterDirection.Input;
            par1.Value = post;

            SqlParameter par2 = cmd.Parameters.Add("@codigo", SqlDbType.Int);
            par2.Direction = ParameterDirection.Input;
            par2.Value = codigo;

            SqlParameter par3 = cmd.Parameters.Add("@cantidad", SqlDbType.Int);
            par3.Direction = ParameterDirection.Input;
            par3.Value = cantidad;

            SqlParameter par4 = cmd.Parameters.Add("@solicitud", SqlDbType.Int);
            par4.Direction = ParameterDirection.Input;
            par4.Value = solicitud;

            SqlParameter par5 = cmd.Parameters.Add("@user", SqlDbType.Int);
            par5.Direction = ParameterDirection.Input;
            par5.Value = user;

            SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);

            if (drd != null)
            {
                lEMantenimiento = new List<EMantenimiento>();

                EMantenimiento obEMantenimiento = null;
                while (drd.Read())
                {
                    obEMantenimiento = new EMantenimiento();
                    obEMantenimiento.v_icon = drd["v_icon"].ToString();
                    obEMantenimiento.v_title = drd["v_title"].ToString();
                    obEMantenimiento.v_text = drd["v_text"].ToString();
                    obEMantenimiento.i_timer = drd["i_timer"].ToString();
                    obEMantenimiento.i_case = drd["i_case"].ToString();
                    obEMantenimiento.v_progressbar = drd["v_progressbar"].ToString();
                    lEMantenimiento.Add(obEMantenimiento);
                }
                drd.Close();
            }

            return (lEMantenimiento);
        }
    }
}