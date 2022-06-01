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
    public class CCalendario
    {
        public List<ECalendario> Calendario(SqlConnection con)
        {
            List<ECalendario> lECalendario = null;
            SqlCommand cmd = new SqlCommand("ASP_CONSULTAR_CALENDARIO_CITAS", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);

            if (drd != null)
            {
                lECalendario = new List<ECalendario>();

                ECalendario obECalendario = null;
                while (drd.Read())
                {
                    obECalendario = new ECalendario();
                    obECalendario.i_id = drd["i_id"].ToString();
                    obECalendario.title = drd["title"].ToString();
                    obECalendario.description = drd["description"].ToString();
                    obECalendario.start = drd["start"].ToString();
                    obECalendario.end = drd["end"].ToString();
                    obECalendario.backgroundColor = drd["backgroundColor"].ToString();
                    obECalendario.borderColor = drd["borderColor"].ToString();
                    obECalendario.allDay = Convert.ToBoolean(drd["allDay"].ToString());
                    lECalendario.Add(obECalendario);
                }
                drd.Close();
            }

            return (lECalendario);
        }
    }
}