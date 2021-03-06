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
    public class CMantArchivosPostulados
    {
        public List<EMantenimiento> MantArchivosPostulados(SqlConnection con, Int32 post, Int32 id, Int32 postulante, String publicacion, String ruta, String descripcion, String archivo, String mime, String type, Int32 size, Int32 user)
        {
            List<EMantenimiento> lEMantenimiento = null;
            SqlCommand cmd = new SqlCommand("ASP_MANT_ARCHIVO_POSTULANTES", con);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@post", SqlDbType.Int).Value = post;
            cmd.Parameters.AddWithValue("@id", SqlDbType.Int).Value = id;
            cmd.Parameters.AddWithValue("@postulante", SqlDbType.VarChar).Value = postulante;
            cmd.Parameters.AddWithValue("@publicacion", SqlDbType.VarChar).Value = publicacion;
            cmd.Parameters.AddWithValue("@ruta", SqlDbType.VarChar).Value = ruta;
            cmd.Parameters.AddWithValue("@descripcion", SqlDbType.VarChar).Value = descripcion;
            cmd.Parameters.AddWithValue("@archivo", SqlDbType.VarChar).Value = archivo;
            cmd.Parameters.AddWithValue("@mime", SqlDbType.VarChar).Value = mime;
            cmd.Parameters.AddWithValue("@type", SqlDbType.VarChar).Value = type;
            cmd.Parameters.AddWithValue("@size", SqlDbType.Int).Value = size;
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