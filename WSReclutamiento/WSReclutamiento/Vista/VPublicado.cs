using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VPublicado : BDconexion
    {
        public List<EPublicado> Publicado(String codigo)
        {
            List<EPublicado> lCPublicado = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CPublicado oVPublicado = new CPublicado();
                    lCPublicado = oVPublicado.Publicado(con, codigo);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCPublicado);
        }
    }
}