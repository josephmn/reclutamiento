using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VMenu : BDconexion
    {
        public List<EMenu> Menu(Int32 perfil)
        {
            List<EMenu> lCMenu = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CMenu oVMenu = new CMenu();
                    lCMenu = oVMenu.Menu(con, perfil);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCMenu);
        }
    }
}