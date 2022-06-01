using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VEspecifica : BDconexion
    {
        public List<EEspecifica> Especifica()
        {
            List<EEspecifica> lCEspecifica = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CEspecifica oVEspecifica = new CEspecifica();
                    lCEspecifica = oVEspecifica.Especifica(con);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCEspecifica);
        }
    }
}