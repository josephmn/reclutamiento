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
    public class CConsultaPaPersonalHijos
    {
        public List<EConsultaPaPersonalHijos> ConsultaPaPersonalHijos(SqlConnection con, String dni, Int32 postulante)
        {
            List<EConsultaPaPersonalHijos> lEConsultaPaPersonalHijos = null;
            SqlCommand cmd = new SqlCommand("ASP_CONSULTAR_PA_PERSONAL_HIJOS", con);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@dni", SqlDbType.VarChar).Value = dni;
            cmd.Parameters.AddWithValue("@postulante", SqlDbType.Int).Value = postulante;

            SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);

            if (drd != null)
            {
                lEConsultaPaPersonalHijos = new List<EConsultaPaPersonalHijos>();

                EConsultaPaPersonalHijos obEConsultaPaPersonalHijos = null;
                while (drd.Read())
                {
                    obEConsultaPaPersonalHijos = new EConsultaPaPersonalHijos();
                    obEConsultaPaPersonalHijos.v_dni_padre = drd["v_dni_padre"].ToString();
                    obEConsultaPaPersonalHijos.v_nombre = drd["v_nombre"].ToString();
                    obEConsultaPaPersonalHijos.d_fnacimiento = drd["d_fnacimiento"].ToString();
                    obEConsultaPaPersonalHijos.i_edad = Convert.ToInt32(drd["i_edad"].ToString());
                    lEConsultaPaPersonalHijos.Add(obEConsultaPaPersonalHijos);
                }
                drd.Close();
            }

            return (lEConsultaPaPersonalHijos);
        }
    }
}