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
    public class CRPAIdiomas
    {
        public List<EMantenimiento> RPAIdiomas(
            SqlConnection con,
            Int32 post,
            String correlativo,
            Int32 id,
            String idioma,
            Int32 ihabla,
            String vhabla,
            Int32 ilee,
            String vlee,
            Int32 iescribe,
            String vescribe,
            Int32 user)
        {
            List<EMantenimiento> lEMantenimiento = null;
            SqlCommand cmd = new SqlCommand("ASP_MANT_PUESTOA_IDIOMAS", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlParameter par1 = cmd.Parameters.Add("@post", SqlDbType.Int);
            par1.Direction = ParameterDirection.Input;
            par1.Value = post;

            SqlParameter par2 = cmd.Parameters.Add("@correlativo", SqlDbType.VarChar);
            par2.Direction = ParameterDirection.Input;
            par2.Value = correlativo;

            SqlParameter par3 = cmd.Parameters.Add("@id", SqlDbType.Int);
            par3.Direction = ParameterDirection.Input;
            par3.Value = id;

            SqlParameter par4 = cmd.Parameters.Add("@idioma", SqlDbType.VarChar);
            par4.Direction = ParameterDirection.Input;
            par4.Value = idioma;

            SqlParameter par5 = cmd.Parameters.Add("@ihabla", SqlDbType.Int);
            par5.Direction = ParameterDirection.Input;
            par5.Value = ihabla;

            SqlParameter par6 = cmd.Parameters.Add("@vhabla", SqlDbType.VarChar);
            par6.Direction = ParameterDirection.Input;
            par6.Value = vhabla;

            SqlParameter par7 = cmd.Parameters.Add("@ilee", SqlDbType.Int);
            par7.Direction = ParameterDirection.Input;
            par7.Value = ilee;

            SqlParameter par8 = cmd.Parameters.Add("@vlee", SqlDbType.VarChar);
            par8.Direction = ParameterDirection.Input;
            par8.Value = vlee;

            SqlParameter par9 = cmd.Parameters.Add("@iescribe", SqlDbType.Int);
            par9.Direction = ParameterDirection.Input;
            par9.Value = iescribe;

            SqlParameter par10 = cmd.Parameters.Add("@vescribe", SqlDbType.VarChar);
            par10.Direction = ParameterDirection.Input;
            par10.Value = vescribe;

            SqlParameter par11 = cmd.Parameters.Add("@user", SqlDbType.Int);
            par11.Direction = ParameterDirection.Input;
            par11.Value = user;

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