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
    public class CTransversal
    {
        public List<ETransversal> Transversal(SqlConnection con)
        {
            List<ETransversal> lETransversal = null;
            SqlCommand cmd = new SqlCommand("ASP_TRANSVERSAL", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);

            if (drd != null)
            {
                lETransversal = new List<ETransversal>();

                ETransversal obETransversal = null;
                while (drd.Read())
                {
                    obETransversal = new ETransversal();
                    obETransversal.i_id = drd["i_id"].ToString();
                    obETransversal.v_descripcion = drd["v_descripcion"].ToString();
                    lETransversal.Add(obETransversal);
                }
                drd.Close();
            }

            return (lETransversal);
        }
    }
}