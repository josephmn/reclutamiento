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
    public class CMantLogCorreos
    {
        public List<EMantenimiento> MantLogCorreos(SqlConnection con, Int32 id, String nombre, String asunto, String copia, String mensaje, Int32 output, String ruta, Int32 user)
        {
            List<EMantenimiento> lEMantenimiento = null;
            SqlCommand cmd = new SqlCommand("ASP_LOG_CORREOS", con);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@id", SqlDbType.Int).Value = id;
            cmd.Parameters.AddWithValue("@nombre", SqlDbType.VarChar).Value = nombre;
            cmd.Parameters.AddWithValue("@asunto", SqlDbType.VarChar).Value = asunto;
            cmd.Parameters.AddWithValue("@copia", SqlDbType.VarChar).Value = copia;
            cmd.Parameters.AddWithValue("@mensaje", SqlDbType.VarChar).Value = mensaje;
            cmd.Parameters.AddWithValue("@output", SqlDbType.Int).Value = output;
            cmd.Parameters.AddWithValue("@ruta", SqlDbType.VarChar).Value = ruta;
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