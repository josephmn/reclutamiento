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
    public class CPaNivelD
    {
        public List<EPaNivelD> PaNivelD(SqlConnection con)
        {
            List<EPaNivelD> lEPaNivelD = null;
            SqlCommand cmd = new SqlCommand("ASP_SOLOMON_NIVELD", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);

            if (drd != null)
            {
                lEPaNivelD = new List<EPaNivelD>();

                EPaNivelD obEPaNivelD = null;
                while (drd.Read())
                {
                    obEPaNivelD = new EPaNivelD();
                    obEPaNivelD.i_codigo = drd["i_codigo"].ToString();
                    obEPaNivelD.v_descripcion = drd["v_descripcion"].ToString();
                    obEPaNivelD.v_default = drd["v_default"].ToString();
                    lEPaNivelD.Add(obEPaNivelD);
                }
                drd.Close();
            }

            return (lEPaNivelD);
        }
    }
}