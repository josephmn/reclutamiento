using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VLogin : BDconexion
    {
        public List<ELogin> Login(String correo, String Clave)
        {
            List<ELogin> lCLogin = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CLogin oVLogin = new CLogin();
                    lCLogin = oVLogin.Login(con, correo, Clave);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCLogin);
        }
    }
}