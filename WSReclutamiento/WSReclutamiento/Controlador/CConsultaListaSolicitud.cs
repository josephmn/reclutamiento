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
    public class CConsultaListaSolicitud
    {
        public List<EConsultaListaSolicitud> ConsultaListaSolicitud(SqlConnection con, Int32 id)
        {
            List<EConsultaListaSolicitud> lEConsultaListaSolicitud = null;
            SqlCommand cmd = new SqlCommand("ASP_CONSULTAR_LISTA_SOLICITUDES", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlParameter par1 = cmd.Parameters.Add("@id", SqlDbType.Int);
            par1.Direction = ParameterDirection.Input;
            par1.Value = id;

            SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);

            if (drd != null)
            {
                lEConsultaListaSolicitud = new List<EConsultaListaSolicitud>();

                EConsultaListaSolicitud obEConsultaListaSolicitud = null;
                while (drd.Read())
                {
                    obEConsultaListaSolicitud = new EConsultaListaSolicitud();
                    obEConsultaListaSolicitud.i_id = drd["i_id"].ToString();
                    obEConsultaListaSolicitud.v_codigo = drd["v_codigo"].ToString();
                    obEConsultaListaSolicitud.i_puesto = drd["i_puesto"].ToString();
                    obEConsultaListaSolicitud.v_nombre_cargo = drd["v_nombre_cargo"].ToString();
                    obEConsultaListaSolicitud.v_usuario_genera = drd["v_usuario_genera"].ToString();
                    obEConsultaListaSolicitud.d_fecha_registro = drd["d_fecha_registro"].ToString();
                    lEConsultaListaSolicitud.Add(obEConsultaListaSolicitud);
                }
                drd.Close();
            }

            return (lEConsultaListaSolicitud);
        }
    }
}