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
    public class CMantPersonal
    {
        public List<EMantenimiento> MantPersonal(SqlConnection con, 
            Int32 post,
            Int32 postulante,
            String publicacion,
            String puesto,
            String nombre,
            String paterno,
            String materno,
            String fnacimiento,
            String tipodocumento,
            String dni,
            Int32 sexo,
            String civil,
            Int32 pais,
            Int32 departamento,
            Int32 provincia,
            Int32 distrito,
            String domicilio,
            String celular,
            String correo,
            Int32 iessalud,
            String vessalud,
            Int32 domiciliado,
            String afp,
            String comfluapf,
            String codafp,
            Int32 regimen,
            Int32 niveleducacion,
            Int32 discapacidad,
            String acepto,
            Int32 user)
        {
            List<EMantenimiento> lEMantenimiento = null;
            SqlCommand cmd = new SqlCommand("ASP_MANT_PERSONAL", con);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@post", SqlDbType.Int).Value = post;
            cmd.Parameters.AddWithValue("@postulante", SqlDbType.Int).Value = postulante;
            cmd.Parameters.AddWithValue("@publicacion", SqlDbType.VarChar).Value = publicacion;
            cmd.Parameters.AddWithValue("@puesto", SqlDbType.VarChar).Value = puesto; 
            cmd.Parameters.AddWithValue("@nombre", SqlDbType.VarChar).Value = nombre;
            cmd.Parameters.AddWithValue("@paterno", SqlDbType.VarChar).Value = paterno;
            cmd.Parameters.AddWithValue("@materno", SqlDbType.VarChar).Value = materno;
            cmd.Parameters.AddWithValue("@fnacimiento", SqlDbType.VarChar).Value = fnacimiento;
            cmd.Parameters.AddWithValue("@tipodocumento", SqlDbType.VarChar).Value = tipodocumento;
            cmd.Parameters.AddWithValue("@dni", SqlDbType.VarChar).Value = dni;
            cmd.Parameters.AddWithValue("@sexo", SqlDbType.Int).Value = sexo;
            cmd.Parameters.AddWithValue("@civil", SqlDbType.VarChar).Value = civil;
            cmd.Parameters.AddWithValue("@pais", SqlDbType.Int).Value = pais;
            cmd.Parameters.AddWithValue("@departamento", SqlDbType.Int).Value = departamento;
            cmd.Parameters.AddWithValue("@provincia", SqlDbType.Int).Value = provincia;
            cmd.Parameters.AddWithValue("@distrito", SqlDbType.Int).Value = distrito;
            cmd.Parameters.AddWithValue("@domicilio", SqlDbType.VarChar).Value = domicilio;
            cmd.Parameters.AddWithValue("@celular", SqlDbType.VarChar).Value = celular;
            cmd.Parameters.AddWithValue("@correo", SqlDbType.VarChar).Value = correo;
            cmd.Parameters.AddWithValue("@iessalud", SqlDbType.Int).Value = iessalud;
            cmd.Parameters.AddWithValue("@vessalud", SqlDbType.VarChar).Value = vessalud;
            cmd.Parameters.AddWithValue("@domiciliado", SqlDbType.Int).Value = domiciliado;
            cmd.Parameters.AddWithValue("@afp", SqlDbType.VarChar).Value = afp;
            cmd.Parameters.AddWithValue("@comfluapf", SqlDbType.VarChar).Value = comfluapf;
            cmd.Parameters.AddWithValue("@codafp", SqlDbType.VarChar).Value = codafp;
            cmd.Parameters.AddWithValue("@regimen", SqlDbType.Int).Value = regimen;
            cmd.Parameters.AddWithValue("@niveleducacion", SqlDbType.Int).Value = niveleducacion;
            cmd.Parameters.AddWithValue("@discapacidad", SqlDbType.Int).Value = discapacidad;
            cmd.Parameters.AddWithValue("@acepto", SqlDbType.VarChar).Value = acepto;
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