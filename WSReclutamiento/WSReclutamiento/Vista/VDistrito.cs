using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VDistrito : BDconexion
    {
        public List<EDistrito> Distrito(Int32 provincia)
        {
            List<EDistrito> lCDistrito = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CDistrito oVDistrito = new CDistrito();
                    lCDistrito = oVDistrito.Distrito(con, provincia);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCDistrito);
        }
    }
}