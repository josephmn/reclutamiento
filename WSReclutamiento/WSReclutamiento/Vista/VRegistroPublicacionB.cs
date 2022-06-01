using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VRegistroPublicacionB : BDconexion
    {
        public List<EMantenimiento> RegistroPublicacionB(
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
            List<EMantenimiento> lCEMantenimiento = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CRegistroPublicacionB oVRegistroPublicacionB = new CRegistroPublicacionB();
                    lCEMantenimiento = oVRegistroPublicacionB.RegistroPublicacionB(con,
                       post, correlativo, titulo, complemento, descripcion, pais, departamento, provincia, distrito, jornada, desc_jornada,
                       contrato, salario1, salario2, mostrar_salario, fecha, vacantes, experiencia, edad_min, edad_max, mostrar_edad, estudios, 
                       desc_estudios, rdviaje1, rdviaje2, rdresidencia1, rdresidencia2, rddiscapacidad1, rddiscapacidad2, puesto, user);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCEMantenimiento);
        }
    }
}