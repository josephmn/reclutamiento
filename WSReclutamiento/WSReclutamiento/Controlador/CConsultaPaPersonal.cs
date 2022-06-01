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
    public class CConsultaPaPersonal
    {
        public List<EConsultaPaPersonal> ConsultaPaPersonal(SqlConnection con, Int32 postulante, String publicacion, String secure)
        {
            List<EConsultaPaPersonal> lEConsultaPaPersonal = null;
            SqlCommand cmd = new SqlCommand("ASP_CONSULTAR_PA_PERSONAL", con);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@postulante", SqlDbType.Int).Value = postulante;
            cmd.Parameters.AddWithValue("@publicacion", SqlDbType.VarChar).Value = publicacion;
            cmd.Parameters.AddWithValue("@secure", SqlDbType.VarChar).Value = secure;

            SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);

            if (drd != null)
            {
                lEConsultaPaPersonal = new List<EConsultaPaPersonal>();

                EConsultaPaPersonal obEConsultaPaPersonal = null;
                while (drd.Read())
                {
                    obEConsultaPaPersonal = new EConsultaPaPersonal();

                    obEConsultaPaPersonal.i_postulante = Convert.ToInt32(drd["i_postulante"].ToString());
                    obEConsultaPaPersonal.v_publicacion = drd["v_publicacion"].ToString();
                    obEConsultaPaPersonal.v_cargo = drd["v_cargo"].ToString();
                    obEConsultaPaPersonal.v_tipodoc = drd["v_tipodoc"].ToString();
                    obEConsultaPaPersonal.v_nombres = drd["v_nombres"].ToString();
                    obEConsultaPaPersonal.d_fnacimiento = (drd["d_fnacimiento"].ToString());
                    obEConsultaPaPersonal.v_dni = drd["v_dni"].ToString();
                    obEConsultaPaPersonal.v_sexo = drd["v_sexo"].ToString();
                    obEConsultaPaPersonal.v_civil = drd["v_civil"].ToString();
                    obEConsultaPaPersonal.v_pais = drd["v_pais"].ToString();
                    obEConsultaPaPersonal.v_departamento = drd["v_departamento"].ToString();
                    obEConsultaPaPersonal.v_provincia = drd["v_provincia"].ToString();
                    obEConsultaPaPersonal.v_distrito = drd["v_distrito"].ToString();
                    obEConsultaPaPersonal.v_domicilio = drd["v_domicilio"].ToString();
                    obEConsultaPaPersonal.v_celular = drd["v_celular"].ToString();
                    obEConsultaPaPersonal.v_correo = drd["v_correo"].ToString();
                    obEConsultaPaPersonal.i_hijos = Convert.ToInt32(drd["i_hijos"].ToString());
                    obEConsultaPaPersonal.i_essalud = drd["i_essalud"].ToString();
                    obEConsultaPaPersonal.v_essalud = drd["v_essalud"].ToString();
                    obEConsultaPaPersonal.i_domiciliado = drd["i_domiciliado"].ToString();
                    obEConsultaPaPersonal.v_afp = drd["v_afp"].ToString();
                    obEConsultaPaPersonal.v_comfluafp = drd["v_comfluafp"].ToString();
                    obEConsultaPaPersonal.v_codafp = drd["v_codafp"].ToString();
                    obEConsultaPaPersonal.i_regimen = drd["i_regimen"].ToString();
                    obEConsultaPaPersonal.v_niveleducacion = drd["v_niveleducacion"].ToString();
                    obEConsultaPaPersonal.i_discapacidad = drd["i_discapacidad"].ToString();
                    obEConsultaPaPersonal.v_acepto = drd["v_acepto"].ToString();
                    obEConsultaPaPersonal.v_ruta = drd["v_ruta"].ToString();

                    lEConsultaPaPersonal.Add(obEConsultaPaPersonal);
                }
                drd.Close();
            }

            return (lEConsultaPaPersonal);
        }
    }
}