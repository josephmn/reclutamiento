using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VMantNotas : BDconexion
    {
        public List<EMantenimiento> MantNotas(Int32 post, Int32 id, String publicacion, Int32 idpostulacion, String nota, Int32 user)
        {
            List<EMantenimiento> lCEMantenimiento = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CMantNotas oVMantNotas = new CMantNotas();
                    lCEMantenimiento = oVMantNotas.MantNotas(con, post, id, publicacion, idpostulacion, nota, user);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCEMantenimiento);
        }
    }
}