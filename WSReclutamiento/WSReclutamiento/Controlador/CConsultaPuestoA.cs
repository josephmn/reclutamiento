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
    public class CConsultaPuestoA
    {
        public List<EConsultaPuestoA> ConsultaPuestoA(SqlConnection con, String codigo)
        {
            List<EConsultaPuestoA> lEConsultaPuestoA = null;
            SqlCommand cmd = new SqlCommand("ASP_CONSULTAR_PUESTOA", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlParameter par1 = cmd.Parameters.Add("@codigo", SqlDbType.VarChar);
            par1.Direction = ParameterDirection.Input;
            par1.Value = codigo;

            SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);

            if (drd != null)
            {
                lEConsultaPuestoA = new List<EConsultaPuestoA>();

                EConsultaPuestoA obEConsultaPuestoA = null;
                while (drd.Read())
                {
                    obEConsultaPuestoA = new EConsultaPuestoA();
                    obEConsultaPuestoA.v_codigo = drd["v_codigo"].ToString();
                    obEConsultaPuestoA.v_puesto = drd["v_puesto"].ToString();
                    obEConsultaPuestoA.d_fecha = drd["d_fecha"].ToString();
                    obEConsultaPuestoA.v_elaborado_por = drd["v_elaborado_por"].ToString();
                    obEConsultaPuestoA.v_revisado_por = drd["v_revisado_por"].ToString();
                    obEConsultaPuestoA.v_gerencia = drd["v_gerencia"].ToString();
                    obEConsultaPuestoA.v_posicion_reporta = drd["v_posicion_reporta"].ToString();
                    obEConsultaPuestoA.v_mision = drd["v_mision"].ToString();
                    obEConsultaPuestoA.i_mision_len = drd["i_mision_len"].ToString();
                    obEConsultaPuestoA.v_organizacion = drd["v_organizacion"].ToString();
                    obEConsultaPuestoA.v_complejidad = drd["v_complejidad"].ToString();
                    obEConsultaPuestoA.i_complejidad_len = drd["i_complejidad_len"].ToString();
                    obEConsultaPuestoA.v_chktecnico = drd["v_chktecnico"].ToString();
                    obEConsultaPuestoA.v_chkuniversitario = drd["v_chkuniversitario"].ToString();
                    obEConsultaPuestoA.v_chkpostgrado = drd["v_chkpostgrado"].ToString();
                    obEConsultaPuestoA.v_chkotros = drd["v_chkotros"].ToString();
                    obEConsultaPuestoA.v_otros = drd["v_otros"].ToString();
                    obEConsultaPuestoA.v_profesion = drd["v_profesion"].ToString();
                    obEConsultaPuestoA.v_rd1 = drd["v_rd1"].ToString();
                    obEConsultaPuestoA.v_rd2 = drd["v_rd2"].ToString();
                    obEConsultaPuestoA.v_sector = drd["v_sector"].ToString();
                    obEConsultaPuestoA.v_anhio_sector = drd["v_anhio_sector"].ToString();
                    obEConsultaPuestoA.v_personal_acargo = drd["v_personal_acargo"].ToString();
                    obEConsultaPuestoA.v_anhio_personal = drd["v_anhio_personal"].ToString();
                    obEConsultaPuestoA.v_puestos_similares = drd["v_puestos_similares"].ToString();
                    obEConsultaPuestoA.v_anhio_puestos = drd["v_anhio_puestos"].ToString();
                    obEConsultaPuestoA.v_conocimiento = drd["v_conocimiento"].ToString();
                    obEConsultaPuestoA.v_otro_licencias = drd["v_otro_licencias"].ToString();
                    obEConsultaPuestoA.v_desc_licencias = drd["v_desc_licencias"].ToString();
                    obEConsultaPuestoA.v_otro_certificaciones = drd["v_otro_certificaciones"].ToString();
                    obEConsultaPuestoA.v_desc_certificaciones = drd["v_desc_certificaciones"].ToString();
                    lEConsultaPuestoA.Add(obEConsultaPuestoA);
                }
                drd.Close();
            }

            return (lEConsultaPuestoA);
        }
    }
}