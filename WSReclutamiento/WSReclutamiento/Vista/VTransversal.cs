using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VTransversal : BDconexion
    {
        public List<ETransversal> Transversal()
        {
            List<ETransversal> lCTransversal = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CTransversal oVTransversal = new CTransversal();
                    lCTransversal = oVTransversal.Transversal(con);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCTransversal);
        }
    }
}