using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VMantFinalista : BDconexion
    {
        public List<EMantenimiento> MantFinalista(Int32 post, Int32 id, Int32 finalista, String comentario, String nompostulante, String puesto, String publicacion, Int32 user)
        {
            List<EMantenimiento> lCEMantenimiento = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CMantFinalista oVMantFinalista = new CMantFinalista();
                    lCEMantenimiento = oVMantFinalista.MantFinalista(con, post, id, finalista, comentario, nompostulante, puesto, publicacion, user);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCEMantenimiento);
        }
    }
}