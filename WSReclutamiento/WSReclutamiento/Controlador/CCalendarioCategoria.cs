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
    public class CCalendarioCategoria
    {
        public List<ECalendarioCategoria> CalendarioCategoria(SqlConnection con, Int32 post)
        {
            List<ECalendarioCategoria> lECalendarioCategoria = null;
            SqlCommand cmd = new SqlCommand("ASP_CONSULTAR_CATEGORIA_CALENDARIO", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlParameter par1 = cmd.Parameters.Add("@post", SqlDbType.VarChar);
            par1.Direction = ParameterDirection.Input;
            par1.Value = post;

            SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);

            if (drd != null)
            {
                lECalendarioCategoria = new List<ECalendarioCategoria>();

                ECalendarioCategoria obECalendarioCategoria = null;
                while (drd.Read())
                {
                    obECalendarioCategoria = new ECalendarioCategoria();
                    obECalendarioCategoria.i_id = Convert.ToInt32(drd["i_id"].ToString());
                    obECalendarioCategoria.v_categoria = drd["v_categoria"].ToString();
                    obECalendarioCategoria.v_color = drd["v_color"].ToString();
                    lECalendarioCategoria.Add(obECalendarioCategoria);
                }
                drd.Close();
            }

            return (lECalendarioCategoria);
        }
    }
}