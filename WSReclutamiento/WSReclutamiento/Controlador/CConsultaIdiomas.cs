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
    public class CConsultaIdiomas
    {
        public List<EConsultaIdiomas> ConsultaIdiomas(SqlConnection con, Int32 post, String codigo, Int32 id)
        {
            List<EConsultaIdiomas> lEConsultaIdiomas = null;
            SqlCommand cmd = new SqlCommand("ASP_CONSULTAR_IDIOMAS", con);
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
                lEConsultaIdiomas = new List<EConsultaIdiomas>();

                EConsultaIdiomas obEConsultaIdiomas = null;
                while (drd.Read())
                {
                    obEConsultaIdiomas = new EConsultaIdiomas();
                    obEConsultaIdiomas.i_id = drd["i_id"].ToString();
                    obEConsultaIdiomas.v_idioma = drd["v_idioma"].ToString();
                    obEConsultaIdiomas.i_habla = Convert.ToInt32(drd["i_habla"].ToString());
                    obEConsultaIdiomas.v_habla = drd["v_habla"].ToString();
                    obEConsultaIdiomas.i_lee = Convert.ToInt32(drd["i_lee"].ToString());
                    obEConsultaIdiomas.v_lee = drd["v_lee"].ToString();
                    obEConsultaIdiomas.i_escribe = Convert.ToInt32(drd["i_escribe"].ToString());
                    obEConsultaIdiomas.v_escribe = drd["v_escribe"].ToString();
                    lEConsultaIdiomas.Add(obEConsultaIdiomas);
                }
                drd.Close();
            }

            return (lEConsultaIdiomas);
        }
    }
}