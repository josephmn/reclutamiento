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
    public class CPaCivil
    {
        public List<EPaCivil> PaCivil(SqlConnection con)
        {
            List<EPaCivil> lEPaCivil = null;
            SqlCommand cmd = new SqlCommand("ASP_SOLOMON_CIVIL", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);

            if (drd != null)
            {
                lEPaCivil = new List<EPaCivil>();

                EPaCivil obEPaCivil = null;
                while (drd.Read())
                {
                    obEPaCivil = new EPaCivil();
                    obEPaCivil.i_codigo = drd["i_codigo"].ToString();
                    obEPaCivil.v_descripcion = drd["v_descripcion"].ToString();
                    obEPaCivil.v_default = drd["v_default"].ToString();
                    lEPaCivil.Add(obEPaCivil);
                }
                drd.Close();
            }

            return (lEPaCivil);
        }
    }
}