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
    public class CPublicacionTarea
    {
        public List<EPublicacionTarea> PublicacionTarea(SqlConnection con, Int32 post, String codigo, Int32 id)
        {
            List<EPublicacionTarea> lEPublicacionTarea = null;
            SqlCommand cmd = new SqlCommand("ASP_CONSULTAR_PUBLICACION_TAREAS", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlParameter par1 = cmd.Parameters.Add("@post", SqlDbType.Int);
            par1.Direction = ParameterDirection.Input;
            par1.Value = post;

            SqlParameter par2 = cmd.Parameters.Add("@codigo", SqlDbType.VarChar);
            par2.Direction = ParameterDirection.Input;
            par2.Value = codigo;

            SqlParameter par3 = cmd.Parameters.Add("@id", SqlDbType.Int);
            par3.Direction = ParameterDirection.Input;
            par3.Value = id;

            SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);

            if (drd != null)
            {
                lEPublicacionTarea = new List<EPublicacionTarea>();

                EPublicacionTarea obEPublicacionTarea = null;
                while (drd.Read())
                {
                    obEPublicacionTarea = new EPublicacionTarea();
                    obEPublicacionTarea.i_id = drd["i_id"].ToString();
                    obEPublicacionTarea.v_tarea = drd["v_tarea"].ToString();
                    lEPublicacionTarea.Add(obEPublicacionTarea);
                }
                drd.Close();
            }

            return (lEPublicacionTarea);
        }
    }
}