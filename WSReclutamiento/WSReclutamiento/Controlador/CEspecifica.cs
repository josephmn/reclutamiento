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
    public class CEspecifica
    {
        public List<EEspecifica> Especifica(SqlConnection con)
        {
            List<EEspecifica> lEEspecifica = null;
            SqlCommand cmd = new SqlCommand("ASP_ESPECIFICA", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);

            if (drd != null)
            {
                lEEspecifica = new List<EEspecifica>();

                EEspecifica obEEspecifica = null;
                while (drd.Read())
                {
                    obEEspecifica = new EEspecifica();
                    obEEspecifica.i_id = drd["i_id"].ToString();
                    obEEspecifica.v_descripcion = drd["v_descripcion"].ToString();
                    lEEspecifica.Add(obEEspecifica);
                }
                drd.Close();
            }

            return (lEEspecifica);
        }
    }
}