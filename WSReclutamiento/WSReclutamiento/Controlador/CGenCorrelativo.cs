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
    public class CGenCorrelativo
    {
        public List<EGenCorrelativo> GenCorrelativo(SqlConnection con, Int32 id)
        {
            List<EGenCorrelativo> lEGenCorrelativo = null;
            SqlCommand cmd = new SqlCommand("ASP_GENCORRELATIVO", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlParameter par1 = cmd.Parameters.Add("@id", SqlDbType.Int);
            par1.Direction = ParameterDirection.Input;
            par1.Value = id;

            SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);

            if (drd != null)
            {
                lEGenCorrelativo = new List<EGenCorrelativo>();

                EGenCorrelativo obEGenCorrelativo = null;
                while (drd.Read())
                {
                    obEGenCorrelativo = new EGenCorrelativo();
                    obEGenCorrelativo.v_correlativo = drd["v_correlativo"].ToString();
                    lEGenCorrelativo.Add(obEGenCorrelativo);
                }
                drd.Close();
            }

            return (lEGenCorrelativo);
        }
    }
}