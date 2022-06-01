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
    public class CMantCalendario
    {
        public List<EMantenimiento> MantCalendario(SqlConnection con, 
            Int32 post, 
            Int32 id, 
            String publicacion, 
            Int32 idpostulacion, 
            Int32 idcategoria, 
            String descripcion,
            String finicio,
            String ffin, 
            Int32 user)
        {
            List<EMantenimiento> lEMantenimiento = null;
            SqlCommand cmd = new SqlCommand("ASP_MANT_CALENDARIO", con);
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

            SqlParameter par5 = cmd.Parameters.Add("@idcategoria", SqlDbType.Int);
            par5.Direction = ParameterDirection.Input;
            par5.Value = idcategoria;

            SqlParameter par6 = cmd.Parameters.Add("@descripcion", SqlDbType.VarChar);
            par6.Direction = ParameterDirection.Input;
            par6.Value = descripcion;

            SqlParameter par7 = cmd.Parameters.Add("@finicio", SqlDbType.VarChar);
            par7.Direction = ParameterDirection.Input;
            par7.Value = finicio;

            SqlParameter par8 = cmd.Parameters.Add("@ffin", SqlDbType.VarChar);
            par8.Direction = ParameterDirection.Input;
            par8.Value = ffin;

            SqlParameter par9 = cmd.Parameters.Add("@user", SqlDbType.Int);
            par9.Direction = ParameterDirection.Input;
            par9.Value = user;

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