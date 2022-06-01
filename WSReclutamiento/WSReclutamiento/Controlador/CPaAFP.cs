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
    public class CPaAFP
    {
        public List<EPaAFP> PaAFP(SqlConnection con)
        {
            List<EPaAFP> lEPaAFP = null;
            SqlCommand cmd = new SqlCommand("ASP_SOLOMON_AFP", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);

            if (drd != null)
            {
                lEPaAFP = new List<EPaAFP>();

                EPaAFP obEPaAFP = null;
                while (drd.Read())
                {
                    obEPaAFP = new EPaAFP();
                    obEPaAFP.i_codigo = drd["i_codigo"].ToString();
                    obEPaAFP.v_descripcion = drd["v_descripcion"].ToString();
                    obEPaAFP.v_default = drd["v_default"].ToString();
                    lEPaAFP.Add(obEPaAFP);
                }
                drd.Close();
            }

            return (lEPaAFP);
        }
    }
}