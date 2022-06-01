using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VMantPersonal : BDconexion
    {
        public List<EMantenimiento> MantPersonal(
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
            List<EMantenimiento> lCEMantenimiento = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CMantPersonal oVMantPersonal = new CMantPersonal();
                    lCEMantenimiento = oVMantPersonal.MantPersonal(con, post, postulante, publicacion, puesto, nombre, paterno, materno, fnacimiento, tipodocumento, dni,
                sexo, civil, pais, departamento, provincia, distrito, domicilio, celular, correo, iessalud, vessalud,
                domiciliado, afp, comfluapf, codafp, regimen, niveleducacion, discapacidad, acepto, user);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCEMantenimiento);
        }
    }
}