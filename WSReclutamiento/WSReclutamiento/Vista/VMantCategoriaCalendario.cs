using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VMantCategoriaCalendario : BDconexion
    {
        public List<EMantenimiento> MantCategoriaCalendario(Int32 post, Int32 id, String categoria, String color, Int32 user)
        {
            List<EMantenimiento> lCEMantenimiento = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CMantCategoriaCalendario oVMantCategoriaCalendario = new CMantCategoriaCalendario();
                    lCEMantenimiento = oVMantCategoriaCalendario.MantCategoriaCalendario(con, post, id, categoria, color, user);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCEMantenimiento);
        }
    }
}