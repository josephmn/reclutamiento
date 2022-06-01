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
    public class CNotas
    {
        public List<ENotas> Notas(SqlConnection con, string publicacion, Int32 postulacion)
        {
            List<ENotas> lENotas = null;
            SqlCommand cmd = new SqlCommand("ASP_CONSULTAR_NOTAS", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlParameter par1 = cmd.Parameters.Add("@publicacion", SqlDbType.VarChar);
            par1.Direction = ParameterDirection.Input;
            par1.Value = publicacion;

            SqlParameter par2 = cmd.Parameters.Add("@postulacion", SqlDbType.VarChar);
            par2.Direction = ParameterDirection.Input;
            par2.Value = postulacion;

            SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);

            if (drd != null)
            {
                lENotas = new List<ENotas>();

                ENotas obENotas = null;
                while (drd.Read())
                {
                    obENotas = new ENotas();
                    obENotas.i_id = Convert.ToInt32(drd["i_id"].ToString());
                    obENotas.i_idpostulacion = Convert.ToInt32(drd["i_idpostulacion"].ToString());
                    obENotas.v_nota = drd["v_nota"].ToString();
                    obENotas.v_fecha = drd["v_fecha"].ToString();
                    obENotas.v_publicacion = drd["v_publicacion"].ToString();
                    obENotas.v_titulo = drd["v_titulo"].ToString();
                    obENotas.v_nombres = drd["v_nombres"].ToString();
                    lENotas.Add(obENotas);
                }
                drd.Close();
            }

            return (lENotas);
        }
    }
}