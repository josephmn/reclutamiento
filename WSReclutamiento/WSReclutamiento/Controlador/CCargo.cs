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
    public class CCargo
    {
        public List<ECargo> Cargo(SqlConnection con, Int32 post, Int32 id, Int32 chk)
        {
            List<ECargo> lECargo = null;
            SqlCommand cmd = new SqlCommand("ASP_CARGO", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlParameter par1 = cmd.Parameters.Add("@post", SqlDbType.Int);
            par1.Direction = ParameterDirection.Input;
            par1.Value = post;

            SqlParameter par2 = cmd.Parameters.Add("@id", SqlDbType.Int);
            par2.Direction = ParameterDirection.Input;
            par2.Value = id;

            SqlParameter par3 = cmd.Parameters.Add("@chk", SqlDbType.Int);
            par3.Direction = ParameterDirection.Input;
            par3.Value = chk;

            SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);

            if (drd != null)
            {
                lECargo = new List<ECargo>();

                ECargo obECargo = null;
                while (drd.Read())
                {
                    obECargo = new ECargo();
                    obECargo.i_id = drd["i_id"].ToString();
                    obECargo.v_nombre = drd["v_nombre"].ToString();
                    obECargo.i_dias_proceso = drd["i_dias_proceso"].ToString();
                    lECargo.Add(obECargo);
                }
                drd.Close();
            }

            return (lECargo);
        }
    }
}