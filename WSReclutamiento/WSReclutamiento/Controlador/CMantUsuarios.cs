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
    public class CMantUsuarios
    {
        public List<EMantenimiento> MantUsuarios(SqlConnection con, Int32 post, Int32 codigo, String nombres, String apellidos, String correo, Int32 estado, Int32 perfil, Int32 confirmar, Int32 user)
        {
            List<EMantenimiento> lEMantenimiento = null;
            SqlCommand cmd = new SqlCommand("ASP_MANT_USUARIOS", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlParameter par1 = cmd.Parameters.Add("@post", SqlDbType.Int);
            par1.Direction = ParameterDirection.Input;
            par1.Value = post;

            SqlParameter par2 = cmd.Parameters.Add("@codigo", SqlDbType.Int);
            par2.Direction = ParameterDirection.Input;
            par2.Value = codigo;

            SqlParameter par3 = cmd.Parameters.Add("@nombres", SqlDbType.VarChar);
            par3.Direction = ParameterDirection.Input;
            par3.Value = nombres;

            SqlParameter par4 = cmd.Parameters.Add("@apellidos", SqlDbType.VarChar);
            par4.Direction = ParameterDirection.Input;
            par4.Value = apellidos;

            SqlParameter par5 = cmd.Parameters.Add("@correo", SqlDbType.VarChar);
            par5.Direction = ParameterDirection.Input;
            par5.Value = correo;

            SqlParameter par6 = cmd.Parameters.Add("@estado", SqlDbType.Int);
            par6.Direction = ParameterDirection.Input;
            par6.Value = estado;

            SqlParameter par7 = cmd.Parameters.Add("@perfil", SqlDbType.Int);
            par7.Direction = ParameterDirection.Input;
            par7.Value = perfil;

            SqlParameter par8 = cmd.Parameters.Add("@confirmar", SqlDbType.Int);
            par8.Direction = ParameterDirection.Input;
            par8.Value = confirmar;

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