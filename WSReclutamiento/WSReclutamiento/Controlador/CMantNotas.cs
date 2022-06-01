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
    public class CMantNotas
    {
        public List<EMantenimiento> MantNotas(SqlConnection con, 
            Int32 post, 
            Int32 id, 
            String publicacion, 
            Int32 idpostulacion, 
            String nota,
            Int32 user)
        {
            List<EMantenimiento> lEMantenimiento = null;
            SqlCommand cmd = new SqlCommand("ASP_MANT_NOTAS", con);
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

            SqlParameter par4 = cmd.Parameters.Add("@idpostulacion", SqlDbType.Int);
            par4.Direction = ParameterDirection.Input;
            par4.Value = idpostulacion;

            SqlParameter par6 = cmd.Parameters.Add("@nota", SqlDbType.VarChar);
            par6.Direction = ParameterDirection.Input;
            par6.Value = nota;

            SqlParameter par7 = cmd.Parameters.Add("@user", SqlDbType.Int);
            par7.Direction = ParameterDirection.Input;
            par7.Value = user;

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