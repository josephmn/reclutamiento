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
    public class CSeguimiento
    {
        public List<ESeguimiento> Seguimiento(SqlConnection con, String publicacion, Int32 user)
        {
            List<ESeguimiento> lESeguimiento = null;
            SqlCommand cmd = new SqlCommand("ASP_CONSULTAR_SEGUIMIENTO_POSTULACIONES", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlParameter par1 = cmd.Parameters.Add("@publicacion", SqlDbType.VarChar);
            par1.Direction = ParameterDirection.Input;
            par1.Value = publicacion;

            SqlParameter par2 = cmd.Parameters.Add("@user", SqlDbType.Int);
            par2.Direction = ParameterDirection.Input;
            par2.Value = user;

            SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);

            if (drd != null)
            {
                lESeguimiento = new List<ESeguimiento>();

                ESeguimiento obESeguimiento = null;
                while (drd.Read())
                {
                    obESeguimiento = new ESeguimiento();
                    obESeguimiento.id = drd["id"].ToString();
                    obESeguimiento.v_publicacion = drd["v_publicacion"].ToString();
                    obESeguimiento.v_titulo = drd["v_titulo"].ToString();
                    obESeguimiento.i_postulante = drd["i_postulante"].ToString();
                    obESeguimiento.d_fecha = drd["d_fecha"].ToString();
                    obESeguimiento.v_hora = drd["v_hora"].ToString();
                    obESeguimiento.v_cabecera = drd["v_cabecera"].ToString();
                    obESeguimiento.v_mensaje = drd["v_mensaje"].ToString();
                    obESeguimiento.v_cargo = drd["v_cargo"].ToString();
                    lESeguimiento.Add(obESeguimiento);
                }
                drd.Close();
            }

            return (lESeguimiento);
        }
    }
}