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
    public class CCalendarioCita
    {
        public List<ECalendarioCita> CalendarioCita(SqlConnection con, Int32 id)
        {
            List<ECalendarioCita> lECalendarioCita = null;
            SqlCommand cmd = new SqlCommand("ASP_CONSULTAR_REGISTRO_CITA", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlParameter par1 = cmd.Parameters.Add("@id", SqlDbType.Int);
            par1.Direction = ParameterDirection.Input;
            par1.Value = id;

            SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);

            if (drd != null)
            {
                lECalendarioCita = new List<ECalendarioCita>();

                ECalendarioCita obECalendarioCita = null;
                while (drd.Read())
                {
                    obECalendarioCita = new ECalendarioCita();
                    obECalendarioCita.i_id = Convert.ToInt32(drd["i_id"].ToString());
                    obECalendarioCita.i_idpostulacion = Convert.ToInt32(drd["i_idpostulacion"].ToString());
                    obECalendarioCita.v_nombres = drd["v_nombres"].ToString();
                    obECalendarioCita.v_publicacion = drd["v_publicacion"].ToString();
                    obECalendarioCita.v_titulo = drd["v_titulo"].ToString();
                    obECalendarioCita.i_categoria = Convert.ToInt32(drd["i_categoria"].ToString());
                    obECalendarioCita.d_finicio = drd["d_finicio"].ToString();
                    obECalendarioCita.d_ffin = drd["d_ffin"].ToString();
                    lECalendarioCita.Add(obECalendarioCita);
                }
                drd.Close();
            }

            return (lECalendarioCita);
        }
    }
}