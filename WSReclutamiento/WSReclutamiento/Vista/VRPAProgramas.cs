using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VRPAProgramas : BDconexion
    {
        public List<EMantenimiento> RPAProgramas(
            Int32 post,
            String correlativo,
            Int32 id,
            String programa,
            Int32 inivel,
            String vnivel,
            Int32 user
            )
        {
            List<EMantenimiento> lCEMantenimiento = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CRPAProgramas oVRPAProgramas = new CRPAProgramas();
                    lCEMantenimiento = oVRPAProgramas.RPAProgramas(con, post, correlativo, id, programa, inivel, vnivel, user);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCEMantenimiento);
        }
    }
}