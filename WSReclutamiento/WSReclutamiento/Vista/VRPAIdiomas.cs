using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VRPAIdiomas : BDconexion
    {
        public List<EMantenimiento> RPAIdiomas(
            Int32 post,
            String correlativo,
            Int32 id,
            String idioma,
            Int32 ihabla,
            String vhabla,
            Int32 ilee,
            String vlee,
            Int32 iescribe,
            String vescribe,
            Int32 user
            )
        {
            List<EMantenimiento> lCEMantenimiento = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CRPAIdiomas oVRPAIdiomas = new CRPAIdiomas();
                    lCEMantenimiento = oVRPAIdiomas.RPAIdiomas(con, post, correlativo, id, idioma, ihabla, vhabla, ilee, vlee, iescribe, vescribe, user);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCEMantenimiento);
        }
    }
}