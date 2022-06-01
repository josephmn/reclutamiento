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
    public class CConsultaPuestoAGEN
    {
        public List<EConsultaPuestoAGEN> ConsultaPuestoAGEN(SqlConnection con, String codigo)
        {
            List<EConsultaPuestoAGEN> lEConsultaPuestoAGEN = null;
            SqlCommand cmd = new SqlCommand("ASP_CONSULTAR_PUESTOAGEN", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlParameter par1 = cmd.Parameters.Add("@codigo", SqlDbType.VarChar);
            par1.Direction = ParameterDirection.Input;
            par1.Value = codigo;

            SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);

            if (drd != null)
            {
                lEConsultaPuestoAGEN = new List<EConsultaPuestoAGEN>();

                EConsultaPuestoAGEN obEConsultaPuestoAGEN = null;
                while (drd.Read())
                {
                    obEConsultaPuestoAGEN = new EConsultaPuestoAGEN();
                    obEConsultaPuestoAGEN.v_codigo = drd["v_codigo"].ToString();
                    obEConsultaPuestoAGEN.i_estado = Convert.ToInt32(drd["i_estado"].ToString());
                    obEConsultaPuestoAGEN.v_puesto = drd["v_puesto"].ToString();
                    obEConsultaPuestoAGEN.d_fecha = drd["d_fecha"].ToString();
                    obEConsultaPuestoAGEN.v_elaborado_por = drd["v_elaborado_por"].ToString();
                    obEConsultaPuestoAGEN.v_revisado_por = drd["v_revisado_por"].ToString();
                    obEConsultaPuestoAGEN.v_gerencia = drd["v_gerencia"].ToString();
                    obEConsultaPuestoAGEN.v_posicion_reporta = drd["v_posicion_reporta"].ToString();
                    obEConsultaPuestoAGEN.v_mision = drd["v_mision"].ToString();
                    obEConsultaPuestoAGEN.i_mision_len = Convert.ToInt32(drd["i_mision_len"].ToString());
                    obEConsultaPuestoAGEN.v_organizacion = drd["v_organizacion"].ToString();
                    obEConsultaPuestoAGEN.v_complejidad = drd["v_complejidad"].ToString();
                    obEConsultaPuestoAGEN.i_complejidad_len = Convert.ToInt32(drd["i_complejidad_len"].ToString());
                    obEConsultaPuestoAGEN.v_chktecnico = Convert.ToBoolean(drd["v_chktecnico"].ToString());
                    obEConsultaPuestoAGEN.v_chkuniversitario = Convert.ToBoolean(drd["v_chkuniversitario"].ToString());
                    obEConsultaPuestoAGEN.v_chkpostgrado = Convert.ToBoolean(drd["v_chkpostgrado"].ToString());
                    obEConsultaPuestoAGEN.v_chkotros = Convert.ToBoolean(drd["v_chkotros"].ToString());
                    obEConsultaPuestoAGEN.v_otros = drd["v_otros"].ToString();
                    obEConsultaPuestoAGEN.v_profesion = drd["v_profesion"].ToString();
                    obEConsultaPuestoAGEN.v_rd1 = Convert.ToBoolean(drd["v_rd1"].ToString());
                    obEConsultaPuestoAGEN.v_rd2 = Convert.ToBoolean(drd["v_rd2"].ToString());
                    obEConsultaPuestoAGEN.v_sector = Convert.ToBoolean(drd["v_sector"].ToString());
                    obEConsultaPuestoAGEN.v_anhio_sector = Convert.ToInt32(drd["v_anhio_sector"].ToString());
                    obEConsultaPuestoAGEN.v_personal_acargo = Convert.ToBoolean(drd["v_personal_acargo"].ToString());
                    obEConsultaPuestoAGEN.v_anhio_personal = Convert.ToInt32(drd["v_anhio_personal"].ToString());
                    obEConsultaPuestoAGEN.v_puestos_similares = Convert.ToBoolean(drd["v_puestos_similares"].ToString());
                    obEConsultaPuestoAGEN.v_anhio_puestos = Convert.ToInt32(drd["v_anhio_puestos"].ToString());
                    obEConsultaPuestoAGEN.v_conocimiento = drd["v_conocimiento"].ToString();
                    obEConsultaPuestoAGEN.i_conocimiento_len = Convert.ToInt32(drd["i_conocimiento_len"].ToString());
                    obEConsultaPuestoAGEN.v_otro_licencias = Convert.ToBoolean(drd["v_otro_licencias"].ToString());
                    obEConsultaPuestoAGEN.v_desc_licencias = drd["v_desc_licencias"].ToString();
                    obEConsultaPuestoAGEN.v_otro_certificaciones = Convert.ToBoolean(drd["v_otro_certificaciones"].ToString());
                    obEConsultaPuestoAGEN.v_desc_certificaciones = drd["v_desc_certificaciones"].ToString();
                    lEConsultaPuestoAGEN.Add(obEConsultaPuestoAGEN);
                }
                drd.Close();
            }

            return (lEConsultaPuestoAGEN);
        }
    }
}