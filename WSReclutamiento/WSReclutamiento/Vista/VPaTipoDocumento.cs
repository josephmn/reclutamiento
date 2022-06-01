using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VPaTipoDocumento : BDconexion
    {
        public List<EPaTipoDocumento> PaTipoDocumento()
        {
            List<EPaTipoDocumento> lCPaTipoDocumento = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CPaTipoDocumento oVPaTipoDocumento = new CPaTipoDocumento();
                    lCPaTipoDocumento = oVPaTipoDocumento.PaTipoDocumento(con);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCPaTipoDocumento);
        }
    }
}