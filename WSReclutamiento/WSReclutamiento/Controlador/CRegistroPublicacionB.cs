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
            Int32 estado,
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

            cmd.Parameters.AddWithValue("@post", SqlDbType.Int).Value = post;
            cmd.Parameters.AddWithValue("@estado", SqlDbType.Int).Value = estado;
            cmd.Parameters.AddWithValue("@correlativo", SqlDbType.VarChar).Value = correlativo;
            cmd.Parameters.AddWithValue("@titulo", SqlDbType.VarChar).Value = titulo;
            cmd.Parameters.AddWithValue("@complemento", SqlDbType.VarChar).Value = complemento;
            cmd.Parameters.AddWithValue("@descripcion", SqlDbType.VarChar).Value = descripcion;
            cmd.Parameters.AddWithValue("@pais", SqlDbType.Int).Value = pais;
            cmd.Parameters.AddWithValue("@departamento", SqlDbType.Int).Value = departamento;
            cmd.Parameters.AddWithValue("@provincia", SqlDbType.Int).Value = provincia;
            cmd.Parameters.AddWithValue("@distrito", SqlDbType.Int).Value = distrito;
            cmd.Parameters.AddWithValue("@jornada", SqlDbType.Int).Value = jornada;
            cmd.Parameters.AddWithValue("@desc_jornada", SqlDbType.VarChar).Value = desc_jornada;
            cmd.Parameters.AddWithValue("@contrato", SqlDbType.Int).Value = contrato;
            cmd.Parameters.AddWithValue("@salario1", SqlDbType.VarChar).Value = salario1;
            cmd.Parameters.AddWithValue("@salario2", SqlDbType.VarChar).Value = salario2;
            cmd.Parameters.AddWithValue("@mostrar_salario", SqlDbType.VarChar).Value = mostrar_salario;
            cmd.Parameters.AddWithValue("@fecha", SqlDbType.VarChar).Value = fecha;
            cmd.Parameters.AddWithValue("@vacantes", SqlDbType.Int).Value = vacantes;
            cmd.Parameters.AddWithValue("@experiencia", SqlDbType.Int).Value = experiencia;
            cmd.Parameters.AddWithValue("@edad_min", SqlDbType.Int).Value = edad_min;
            cmd.Parameters.AddWithValue("@edad_max", SqlDbType.Int).Value = edad_max;
            cmd.Parameters.AddWithValue("@mostrar_edad", SqlDbType.VarChar).Value = mostrar_edad;
            cmd.Parameters.AddWithValue("@estudios", SqlDbType.Int).Value = estudios;
            cmd.Parameters.AddWithValue("@desc_estudios", SqlDbType.VarChar).Value = desc_estudios;
            cmd.Parameters.AddWithValue("@rdviaje1", SqlDbType.VarChar).Value = rdviaje1;
            cmd.Parameters.AddWithValue("@rdviaje2", SqlDbType.VarChar).Value = rdviaje2;
            cmd.Parameters.AddWithValue("@rdresidencia1", SqlDbType.VarChar).Value = rdresidencia1;
            cmd.Parameters.AddWithValue("@rdresidencia2", SqlDbType.VarChar).Value = rdresidencia2;
            cmd.Parameters.AddWithValue("@rddiscapacidad1", SqlDbType.VarChar).Value = rddiscapacidad1;
            cmd.Parameters.AddWithValue("@rddiscapacidad2", SqlDbType.VarChar).Value = rddiscapacidad2;
            cmd.Parameters.AddWithValue("@puesto", SqlDbType.Int).Value = puesto;
            cmd.Parameters.AddWithValue("@user", SqlDbType.Int).Value = user;

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