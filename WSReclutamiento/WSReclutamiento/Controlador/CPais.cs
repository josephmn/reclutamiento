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
    public class CPais
    {
        public List<EPais> Pais(SqlConnection con)
        {
            List<EPais> lEPais = null;
            SqlCommand cmd = new SqlCommand("ASP_PAIS", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);

            if (drd != null)
            {
                lEPais = new List<EPais>();

                EPais obEPais = null;
                while (drd.Read())
                {
                    obEPais = new EPais();
                    obEPais.i_codigo = drd["i_codigo"].ToString();
                    obEPais.v_descripcion = drd["v_descripcion"].ToString();
                    obEPais.v_default = drd["v_default"].ToString();
                    lEPais.Add(obEPais);
                }
                drd.Close();
            }

            return (lEPais);
        }
    }
}