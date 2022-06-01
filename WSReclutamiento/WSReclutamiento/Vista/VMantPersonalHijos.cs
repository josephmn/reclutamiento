using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VMantPersonalHijos : BDconexion
    {
        public List<EMantenimiento> MantPersonalHijos(Int32 post, String dnipadre, String nombre, String fecha, Int32 edad, Int32 user)
        {
            List<EMantenimiento> lCEMantenimiento = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CMantPersonalHijos oVMantPersonalHijos = new CMantPersonalHijos();
                    lCEMantenimiento = oVMantPersonalHijos.MantPersonalHijos(con, post, dnipadre, nombre, fecha, edad, user);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCEMantenimiento);
        }
    }
}