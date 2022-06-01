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
    public class CEntrevistaBDetalle
    {
        public List<EEntrevistaBDetalle> EntrevistaBDetalle(SqlConnection con, Int32 post, Int32 id, string publicacion, Int32 estados)
        {
            List<EEntrevistaBDetalle> lEEntrevistaBDetalle = null;
            SqlCommand cmd = new SqlCommand("ASP_CONSULTAR_ENTREVISTA_DETALLE", con);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@post", SqlDbType.Int).Value = post;
            cmd.Parameters.AddWithValue("@id", SqlDbType.Int).Value = id;
            cmd.Parameters.AddWithValue("@publicacion", SqlDbType.VarChar).Value = publicacion;
            cmd.Parameters.AddWithValue("@estados", SqlDbType.Int).Value = estados;

            SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);

            if (drd != null)
            {
                lEEntrevistaBDetalle = new List<EEntrevistaBDetalle>();

                EEntrevistaBDetalle obEEntrevistaBDetalle = null;
                while (drd.Read())
                {
                    obEEntrevistaBDetalle = new EEntrevistaBDetalle();
                    obEEntrevistaBDetalle.i_id = drd["i_id"].ToString();
                    obEEntrevistaBDetalle.v_publicacion = drd["v_publicacion"].ToString();
                    obEEntrevistaBDetalle.v_titulo = drd["v_titulo"].ToString();
                    obEEntrevistaBDetalle.v_titulo2 = drd["v_titulo2"].ToString();
                    obEEntrevistaBDetalle.i_postulante = drd["i_postulante"].ToString();
                    obEEntrevistaBDetalle.v_postulante = drd["v_postulante"].ToString();
                    obEEntrevistaBDetalle.v_ruta = drd["v_ruta"].ToString();
                    obEEntrevistaBDetalle.v_correo = drd["v_correo"].ToString();
                    obEEntrevistaBDetalle.d_fecha = drd["d_fecha"].ToString();
                    obEEntrevistaBDetalle.v_hora = drd["v_hora"].ToString();
                    obEEntrevistaBDetalle.i_estado = drd["i_estado"].ToString();
                    obEEntrevistaBDetalle.v_estado = drd["v_estado"].ToString();
                    obEEntrevistaBDetalle.v_estado_color = drd["v_estado_color"].ToString();
                    obEEntrevistaBDetalle.v_estado_cv_color = drd["v_estado_cv_color"].ToString();
                    obEEntrevistaBDetalle.v_finalista = drd["v_finalista"].ToString();
                    obEEntrevistaBDetalle.v_descr_finalista = drd["v_descr_finalista"].ToString();
                    obEEntrevistaBDetalle.v_correo_enviado = drd["v_correo_enviado"].ToString();
                    lEEntrevistaBDetalle.Add(obEEntrevistaBDetalle);
                }
                drd.Close();
            }

            return (lEEntrevistaBDetalle);
        }
    }
}