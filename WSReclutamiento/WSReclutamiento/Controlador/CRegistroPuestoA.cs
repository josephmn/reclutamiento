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
    public class CRegistroPuestoA
    {
        public List<EMantenimiento> RegistroPuestoA(
            SqlConnection con,
            Int32 post,
            String correlativo,
            Int32 estado,
            Int32 puesto,
            String fecha,
            String elaborado_por,
            String revisado_por,
            String gerencia,
            String posicion_reporta,
            String mision,
            String organizacion,
            String complejidad,
            String chktecnico,
            String chkuniversitario,
            String chkpostgrado,
            String chkotros,
            String otros,
            String profesion,
            String rd1,
            String rd2,
            String sector,
            Int32 anhio_sector,
            String personal_acargo,
            Int32 anhio_personal,
            String puestos_similares,
            Int32 anhio_puestos,
            String conocimiento,
            String otro_licencias,
            String desc_licencias,
            String otro_certificaciones,
            String desc_certificaciones,
            Int32 user
            )
        {
            List<EMantenimiento> lEMantenimiento = null;
            SqlCommand cmd = new SqlCommand("ASP_MANT_PUESTOA", con);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@post", SqlDbType.Int).Value = post;
            cmd.Parameters.AddWithValue("@correlativo", SqlDbType.VarChar).Value = correlativo;
            cmd.Parameters.AddWithValue("@estado", SqlDbType.Int).Value = estado;
            cmd.Parameters.AddWithValue("@puesto", SqlDbType.Int).Value = puesto;
            cmd.Parameters.AddWithValue("@fecha", SqlDbType.VarChar).Value = fecha;
            cmd.Parameters.AddWithValue("@elaborado_por", SqlDbType.VarChar).Value = elaborado_por;
            cmd.Parameters.AddWithValue("@revisado_por", SqlDbType.VarChar).Value = revisado_por;
            cmd.Parameters.AddWithValue("@gerencia", SqlDbType.VarChar).Value = gerencia;
            cmd.Parameters.AddWithValue("@posicion_reporta", SqlDbType.VarChar).Value = posicion_reporta;
            cmd.Parameters.AddWithValue("@mision", SqlDbType.VarChar).Value = mision;
            cmd.Parameters.AddWithValue("@organizacion", SqlDbType.VarChar).Value = organizacion;
            cmd.Parameters.AddWithValue("@complejidad", SqlDbType.VarChar).Value = complejidad;
            cmd.Parameters.AddWithValue("@chktecnico", SqlDbType.VarChar).Value = chktecnico;
            cmd.Parameters.AddWithValue("@chkuniversitario", SqlDbType.VarChar).Value = chkuniversitario;
            cmd.Parameters.AddWithValue("@chkpostgrado", SqlDbType.VarChar).Value = chkpostgrado;
            cmd.Parameters.AddWithValue("@chkotros", SqlDbType.VarChar).Value = chkotros;
            cmd.Parameters.AddWithValue("@otros", SqlDbType.VarChar).Value = otros;
            cmd.Parameters.AddWithValue("@profesion", SqlDbType.VarChar).Value = profesion;
            cmd.Parameters.AddWithValue("@rd1", SqlDbType.VarChar).Value = rd1;
            cmd.Parameters.AddWithValue("@rd2", SqlDbType.VarChar).Value = rd2;
            cmd.Parameters.AddWithValue("@sector", SqlDbType.VarChar).Value = sector;
            cmd.Parameters.AddWithValue("@anhio_sector", SqlDbType.Int).Value = anhio_sector;
            cmd.Parameters.AddWithValue("@personal_acargo", SqlDbType.VarChar).Value = personal_acargo;
            cmd.Parameters.AddWithValue("@anhio_personal", SqlDbType.Int).Value = anhio_personal;
            cmd.Parameters.AddWithValue("@puestos_similares", SqlDbType.VarChar).Value = puestos_similares; 
            cmd.Parameters.AddWithValue("@anhio_puestos", SqlDbType.Int).Value = anhio_puestos;
            cmd.Parameters.AddWithValue("@conocimiento", SqlDbType.VarChar).Value = conocimiento;
            cmd.Parameters.AddWithValue("@otro_licencias", SqlDbType.VarChar).Value = otro_licencias;
            cmd.Parameters.AddWithValue("@desc_licencias", SqlDbType.VarChar).Value = desc_licencias;
            cmd.Parameters.AddWithValue("@otro_certificaciones", SqlDbType.VarChar).Value = otro_certificaciones;
            cmd.Parameters.AddWithValue("@desc_certificaciones", SqlDbType.VarChar).Value = desc_certificaciones;
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