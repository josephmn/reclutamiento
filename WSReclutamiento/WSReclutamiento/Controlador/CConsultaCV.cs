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
    public class CConsultaCV
    {
        public List<EConsultaCV> ConsultaCV(SqlConnection con, Int32 post, Int32 id, Int32 user)
        {
            List<EConsultaCV> lEConsultaCV = null;
            SqlCommand cmd = new SqlCommand("ASP_CONSULTAR_ARCHIVOS", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlParameter par1 = cmd.Parameters.Add("@post", SqlDbType.Int);
            par1.Direction = ParameterDirection.Input;
            par1.Value = post;

            SqlParameter par2 = cmd.Parameters.Add("@id", SqlDbType.Int);
            par2.Direction = ParameterDirection.Input;
            par2.Value = id;

            SqlParameter par3 = cmd.Parameters.Add("@user", SqlDbType.Int);
            par3.Direction = ParameterDirection.Input;
            par3.Value = user;

            SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);

            if (drd != null)
            {
                lEConsultaCV = new List<EConsultaCV>();

                EConsultaCV obEConsultaCV = null;
                while (drd.Read())
                {
                    obEConsultaCV = new EConsultaCV();
                    obEConsultaCV.id = drd["id"].ToString();
                    obEConsultaCV.v_nombre = drd["v_nombre"].ToString();
                    obEConsultaCV.v_ruta = drd["v_ruta"].ToString();
                    obEConsultaCV.v_size = drd["v_size"].ToString();
                    obEConsultaCV.v_fecha = drd["v_fecha"].ToString();
                    obEConsultaCV.v_type = drd["v_type"].ToString();
                    obEConsultaCV.v_icon = drd["v_icon"].ToString();
                    lEConsultaCV.Add(obEConsultaCV);
                }
                drd.Close();
            }

            return (lEConsultaCV);
        }
    }
}