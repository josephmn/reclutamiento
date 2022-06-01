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
    public class CRegistroPublicacionB
    {
        public List<EMantenimiento> RegistroPublicacionB(
            SqlConnection con,
            Int32 post,
            String correlativo,
            String titulo,
            String complemento,
            String descripcion,
            Int32 pais,
            Int32 departamento,
            Int32 provincia,
            Int32 distrito,
            Int32 jornada,
            String desc_jornada,
            Int32 contrato,
            String salario1,
            String salario2,
            String mostrar_salario,
            String fecha,
            Int32 vacantes,
            Int32 experiencia,
            Int32 edad_min,
            Int32 edad_max,
            String mostrar_edad,
            Int32 estudios,
            String desc_estudios,
            String rdviaje1,
            String rdviaje2,
            String rdresidencia1,
            String rdresidencia2,
            String rddiscapacidad1,
            String rddiscapacidad2,
            Int32 puesto,
            Int32 user
            )
        {
            List<EMantenimiento> lEMantenimiento = null;
            SqlCommand cmd = new SqlCommand("ASP_MANT_PUBLICACIONB", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlParameter par1 = cmd.Parameters.Add("@post", SqlDbType.Int);
            par1.Direction = ParameterDirection.Input;
            par1.Value = post;

            SqlParameter par2 = cmd.Parameters.Add("@correlativo", SqlDbType.VarChar);
            par2.Direction = ParameterDirection.Input;
            par2.Value = correlativo;

            SqlParameter par3 = cmd.Parameters.Add("@titulo", SqlDbType.VarChar);
            par3.Direction = ParameterDirection.Input;
            par3.Value = titulo;

            SqlParameter par4 = cmd.Parameters.Add("@complemento", SqlDbType.VarChar);
            par4.Direction = ParameterDirection.Input;
            par4.Value = complemento;

            SqlParameter par5 = cmd.Parameters.Add("@descripcion", SqlDbType.VarChar);
            par5.Direction = ParameterDirection.Input;
            par5.Value = descripcion;

            SqlParameter par6 = cmd.Parameters.Add("@pais", SqlDbType.Int);
            par6.Direction = ParameterDirection.Input;
            par6.Value = pais;

            SqlParameter par7 = cmd.Parameters.Add("@departamento", SqlDbType.Int);
            par7.Direction = ParameterDirection.Input;
            par7.Value = departamento;

            SqlParameter par8 = cmd.Parameters.Add("@provincia", SqlDbType.Int);
            par8.Direction = ParameterDirection.Input;
            par8.Value = provincia;

            SqlParameter par9 = cmd.Parameters.Add("@distrito", SqlDbType.Int);
            par9.Direction = ParameterDirection.Input;
            par9.Value = distrito;

            SqlParameter par10 = cmd.Parameters.Add("@jornada", SqlDbType.Int);
            par10.Direction = ParameterDirection.Input;
            par10.Value = jornada;

            SqlParameter par11 = cmd.Parameters.Add("@desc_jornada", SqlDbType.VarChar);
            par11.Direction = ParameterDirection.Input;
            par11.Value = desc_jornada;

            SqlParameter par12 = cmd.Parameters.Add("@contrato", SqlDbType.Int);
            par12.Direction = ParameterDirection.Input;
            par12.Value = contrato;

            SqlParameter par13 = cmd.Parameters.Add("@salario1", SqlDbType.VarChar);
            par13.Direction = ParameterDirection.Input;
            par13.Value = salario1;

            SqlParameter par14 = cmd.Parameters.Add("@salario2", SqlDbType.VarChar);
            par14.Direction = ParameterDirection.Input;
            par14.Value = salario2;

            SqlParameter par15 = cmd.Parameters.Add("@mostrar_salario", SqlDbType.VarChar);
            par15.Direction = ParameterDirection.Input;
            par15.Value = mostrar_salario;

            SqlParameter par16 = cmd.Parameters.Add("@fecha", SqlDbType.VarChar);
            par16.Direction = ParameterDirection.Input;
            par16.Value = fecha;

            SqlParameter par17 = cmd.Parameters.Add("@vacantes", SqlDbType.Int);
            par17.Direction = ParameterDirection.Input;
            par17.Value = vacantes;

            SqlParameter par18 = cmd.Parameters.Add("@experiencia", SqlDbType.Int);
            par18.Direction = ParameterDirection.Input;
            par18.Value = experiencia;

            SqlParameter par19 = cmd.Parameters.Add("@edad_min", SqlDbType.Int);
            par19.Direction = ParameterDirection.Input;
            par19.Value = edad_min;

            SqlParameter par20 = cmd.Parameters.Add("@edad_max", SqlDbType.Int);
            par20.Direction = ParameterDirection.Input;
            par20.Value = edad_max;

            SqlParameter par21 = cmd.Parameters.Add("@mostrar_edad", SqlDbType.VarChar);
            par21.Direction = ParameterDirection.Input;
            par21.Value = mostrar_edad;

            SqlParameter par22 = cmd.Parameters.Add("@estudios", SqlDbType.Int);
            par22.Direction = ParameterDirection.Input;
            par22.Value = estudios;

            SqlParameter par23 = cmd.Parameters.Add("@desc_estudios", SqlDbType.VarChar);
            par23.Direction = ParameterDirection.Input;
            par23.Value = desc_estudios;

            SqlParameter par24 = cmd.Parameters.Add("@rdviaje1", SqlDbType.VarChar);
            par24.Direction = ParameterDirection.Input;
            par24.Value = rdviaje1;

            SqlParameter par25 = cmd.Parameters.Add("@rdviaje2", SqlDbType.VarChar);
            par25.Direction = ParameterDirection.Input;
            par25.Value = rdviaje2;

            SqlParameter par26 = cmd.Parameters.Add("@rdresidencia1", SqlDbType.VarChar);
            par26.Direction = ParameterDirection.Input;
            par26.Value = rdresidencia1;

            SqlParameter par27 = cmd.Parameters.Add("@rdresidencia2", SqlDbType.VarChar);
            par27.Direction = ParameterDirection.Input;
            par27.Value = rdresidencia2;

            SqlParameter par28 = cmd.Parameters.Add("@rddiscapacidad1", SqlDbType.VarChar);
            par28.Direction = ParameterDirection.Input;
            par28.Value = rddiscapacidad1;

            SqlParameter par29 = cmd.Parameters.Add("@rddiscapacidad2", SqlDbType.VarChar);
            par29.Direction = ParameterDirection.Input;
            par29.Value = rddiscapacidad2;

            SqlParameter par30 = cmd.Parameters.Add("@puesto", SqlDbType.Int);
            par30.Direction = ParameterDirection.Input;
            par30.Value = puesto;

            SqlParameter par31 = cmd.Parameters.Add("@user", SqlDbType.Int);
            par31.Direction = ParameterDirection.Input;
            par31.Value = user;

            SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);

            if (drd != null)
            {
                lEMantenimiento = new List<EMantenimiento>();

                EMantenimiento obEMantenimiento = null;
                while (drd.Read())
                {
                    obEMantenimiento = new EMantenimiento();
                    obEMantenimiento.v_icon = drd["v_icon"].ToString();
                    obEMantenimiento.v_title = drd["v_title"].ToString();
                    obEMantenimiento.v_text = drd["v_text"].ToString();
                    obEMantenimiento.i_timer = drd["i_timer"].ToString();
                    obEMantenimiento.i_case = drd["i_case"].ToString();
                    obEMantenimiento.v_progressbar = drd["v_progressbar"].ToString();
                    lEMantenimiento.Add(obEMantenimiento);
                }
                drd.Close();
            }

            return (lEMantenimiento);
        }
    }
}