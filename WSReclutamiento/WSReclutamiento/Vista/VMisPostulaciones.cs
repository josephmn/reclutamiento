using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VMisPostulaciones : BDconexion
    {
        public List<EMisPostulaciones> MisPostulaciones(Int32 user)
        {
            List<EMisPostulaciones> lCMisPostulaciones = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CMisPostulaciones oVMisPostulaciones = new CMisPostulaciones();
                    lCMisPostulaciones = oVMisPostulaciones.MisPostulaciones(con, user);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCMisPostulaciones);
        }
    }
}