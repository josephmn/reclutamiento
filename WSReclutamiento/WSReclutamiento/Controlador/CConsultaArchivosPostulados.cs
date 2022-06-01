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
    public class CConsultaArchivosPostulados
    {
        public List<EConsultaArchivosPostulados> ConsultaArchivosPostulados(SqlConnection con, Int32 postulacion, String publicacion, String modulo)
        {
            List<EConsultaArchivosPostulados> lEConsultaArchivosPostulados = null;
            SqlCommand cmd = new SqlCommand("ASP_CONSULTAR_ARCHIVOS_POSTULADOS", con);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@postulacion", SqlDbType.Int).Value = postulacion;
            cmd.Parameters.AddWithValue("@publicacion", SqlDbType.VarChar).Value = publicacion;
            cmd.Parameters.AddWithValue("@modulo", SqlDbType.VarChar).Value = modulo;

            SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);

            if (drd != null)
            {
                lEConsultaArchivosPostulados = new List<EConsultaArchivosPostulados>();

                EConsultaArchivosPostulados obEConsultaArchivosPostulados = null;
                while (drd.Read())
                {
                    obEConsultaArchivosPostulados = new EConsultaArchivosPostulados();
                    obEConsultaArchivosPostulados.i_id = drd["i_id"].ToString();
                    obEConsultaArchivosPostulados.v_descripcion = drd["v_descripcion"].ToString();
                    obEConsultaArchivosPostulados.v_fecha = drd["v_fecha"].ToString();
                    obEConsultaArchivosPostulados.v_ruta = drd["v_ruta"].ToString();
                    obEConsultaArchivosPostulados.v_icono = drd["v_icono"].ToString();
                    obEConsultaArchivosPostulados.v_color = drd["v_color"].ToString();
                    lEConsultaArchivosPostulados.Add(obEConsultaArchivosPostulados);
                }
                drd.Close();
            }

            return (lEConsultaArchivosPostulados);
        }
    }
}