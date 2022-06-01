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
    public class CPublicacionBDetalle
    {
        public List<EPublicacionBDetalle> PublicacionBDetalle(SqlConnection con, Int32 post, Int32 id, string publicacion, Int32 estados)
        {
            List<EPublicacionBDetalle> lEPublicacionBDetalle = null;
            SqlCommand cmd = new SqlCommand("ASP_CONSULTAR_POSTULANTES_DETALLE", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlParameter par1 = cmd.Parameters.Add("@post", SqlDbType.Int);
            par1.Direction = ParameterDirection.Input;
            par1.Value = post;

            SqlParameter par2 = cmd.Parameters.Add("@id", SqlDbType.Int);
            par2.Direction = ParameterDirection.Input;
            par2.Value = id;

            SqlParameter par3 = cmd.Parameters.Add("@publicacion", SqlDbType.VarChar);
            par3.Direction = ParameterDirection.Input;
            par3.Value = publicacion;

            SqlParameter par4 = cmd.Parameters.Add("@estados", SqlDbType.Int);
            par4.Direction = ParameterDirection.Input;
            par4.Value = estados;

            SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);

            if (drd != null)
            {
                lEPublicacionBDetalle = new List<EPublicacionBDetalle>();

                EPublicacionBDetalle obEPublicacionBDetalle = null;
                while (drd.Read())
                {
                    obEPublicacionBDetalle = new EPublicacionBDetalle();
                    obEPublicacionBDetalle.i_id = drd["i_id"].ToString();
                    obEPublicacionBDetalle.v_publicacion = drd["v_publicacion"].ToString();
                    obEPublicacionBDetalle.v_titulo = drd["v_titulo"].ToString();
                    obEPublicacionBDetalle.v_postulante = drd["v_postulante"].ToString();
                    obEPublicacionBDetalle.v_ruta = drd["v_ruta"].ToString();
                    obEPublicacionBDetalle.v_correo = drd["v_correo"].ToString();
                    obEPublicacionBDetalle.d_fecha = drd["d_fecha"].ToString();
                    obEPublicacionBDetalle.v_hora = drd["v_hora"].ToString();
                    obEPublicacionBDetalle.i_estado = drd["i_estado"].ToString();
                    obEPublicacionBDetalle.v_estado = drd["v_estado"].ToString();
                    obEPublicacionBDetalle.v_estado_color = drd["v_estado_color"].ToString();
                    obEPublicacionBDetalle.v_estado_cv_color = drd["v_estado_cv_color"].ToString();
                    lEPublicacionBDetalle.Add(obEPublicacionBDetalle);
                }
                drd.Close();
            }

            return (lEPublicacionBDetalle);
        }
    }
}