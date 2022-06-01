using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VMantCalendario : BDconexion
    {
        public List<EMantenimiento> MantCalendario(Int32 post, Int32 id, String publicacion, Int32 idpostulacion, Int32 idcategoria, String descripcion, String finicio, String ffin, Int32 user)
        {
            List<EMantenimiento> lCEMantenimiento = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CMantCalendario oVMantCalendario = new CMantCalendario();
                    lCEMantenimiento = oVMantCalendario.MantCalendario(con, post, id, publicacion, idpostulacion, idcategoria, descripcion, finicio, ffin, user);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCEMantenimiento);
        }
    }
}