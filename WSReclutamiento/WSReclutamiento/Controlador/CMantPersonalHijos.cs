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
    public class CMantPersonalHijos
    {
        public List<EMantenimiento> MantPersonalHijos(SqlConnection con, Int32 post, String dnipadre, String nombre, String fecha, Int32 edad, Int32 user)
        {
            List<EMantenimiento> lEMantenimiento = null;
            SqlCommand cmd = new SqlCommand("ASP_MANT_PERSONAL_HIJOS", con);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@post", SqlDbType.Int).Value = post;
            cmd.Parameters.AddWithValue("@dnipadre", SqlDbType.VarChar).Value = dnipadre;
            cmd.Parameters.AddWithValue("@nombre", SqlDbType.VarChar).Value = nombre;
            cmd.Parameters.AddWithValue("@fecha", SqlDbType.VarChar).Value = fecha;
            cmd.Parameters.AddWithValue("@edad", SqlDbType.Int).Value = edad;
            cmd.Parameters.AddWithValue("@user", SqlDbType.Int).Value = user;

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