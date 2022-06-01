using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VVerificacion : BDconexion
    {
        public List<EMantenimiento> Verificacion(Int32 codigo)
        {
            List<EMantenimiento> lCEMantenimiento = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CVerificacion oVVerificacion = new CVerificacion();
                    lCEMantenimiento = oVVerificacion.Verificacion(con, codigo);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCEMantenimiento);
        }
    }
}