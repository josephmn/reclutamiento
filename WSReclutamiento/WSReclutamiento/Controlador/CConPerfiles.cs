﻿using System;
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
    public class CConPerfiles
    {
        public List<EConPerfiles> ConPerfiles(SqlConnection con, Int32 post, Int32 perfil)
        {
            List<EConPerfiles> lEConPerfiles = null;
            SqlCommand cmd = new SqlCommand("ASP_CONSULTAR_PERFILES", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlParameter par1 = cmd.Parameters.Add("@post", SqlDbType.Int);
            par1.Direction = ParameterDirection.Input;
            par1.Value = post;

            SqlParameter par2 = cmd.Parameters.Add("@perfil", SqlDbType.Int);
            par2.Direction = ParameterDirection.Input;
            par2.Value = perfil;

            SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);

            if (drd != null)
            {
                lEConPerfiles = new List<EConPerfiles>();

                EConPerfiles obEConPerfiles = null;
                while (drd.Read())
                {
                    obEConPerfiles = new EConPerfiles();
                    obEConPerfiles.i_id = Convert.ToInt32(drd["i_id"].ToString());
                    obEConPerfiles.v_nombre = drd["v_nombre"].ToString();
                    obEConPerfiles.i_estado = drd["i_estado"].ToString();
                    obEConPerfiles.v_estado = drd["v_estado"].ToString();
                    obEConPerfiles.v_color = drd["v_color"].ToString();
                    obEConPerfiles.v_selected = drd["v_selected"].ToString();
                    lEConPerfiles.Add(obEConPerfiles);
                }
                drd.Close();
            }

            return (lEConPerfiles);
        }
    }
}