using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VNotas : BDconexion
    {
        public List<ENotas> Notas(String publicacion, Int32 postulacion)
        {
            List<ENotas> lCNotas = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CNotas oVNotas = new CNotas();
                    lCNotas = oVNotas.Notas(con, publicacion, postulacion);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCNotas);
        }
    }
}