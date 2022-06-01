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
    public class CConsultaOrganizacion
    {
        public List<EConsultaOrganizacion> ConsultaOrganizacion(SqlConnection con, Int32 post, String codigo, Int32 id)
        {
            List<EConsultaOrganizacion> lEConsultaOrganizacion = null;
            SqlCommand cmd = new SqlCommand("ASP_CONSULTAR_ORGANIZACION", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlParameter par1 = cmd.Parameters.Add("@post", SqlDbType.Int);
            par1.Direction = ParameterDirection.Input;
            par1.Value = post;

            SqlParameter par2 = cmd.Parameters.Add("@codigo", SqlDbType.VarChar);
            par2.Direction = ParameterDirection.Input;
            par2.Value = codigo;

            SqlParameter par3 = cmd.Parameters.Add("@id", SqlDbType.Int);
            par3.Direction = ParameterDirection.Input;
            par3.Value = id;

            SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);

            if (drd != null)
            {
                lEConsultaOrganizacion = new List<EConsultaOrganizacion>();

                EConsultaOrganizacion obEConsultaOrganizacion = null;
                while (drd.Read())
                {
                    obEConsultaOrganizacion = new EConsultaOrganizacion();
                    obEConsultaOrganizacion.i_id = drd["i_id"].ToString();
                    obEConsultaOrganizacion.v_puestos = drd["v_puestos"].ToString();
                    obEConsultaOrganizacion.v_reportes = drd["v_reportes"].ToString();
                    lEConsultaOrganizacion.Add(obEConsultaOrganizacion);
                }
                drd.Close();
            }

            return (lEConsultaOrganizacion);
        }
    }
}