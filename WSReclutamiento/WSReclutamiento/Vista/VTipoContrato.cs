using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VTipoContrato : BDconexion
    {
        public List<ETipoContrato> TipoContrato()
        {
            List<ETipoContrato> lCTipoContrato = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CTipoContrato oVTipoContrato = new CTipoContrato();
                    lCTipoContrato = oVTipoContrato.TipoContrato(con);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCTipoContrato);
        }
    }
}