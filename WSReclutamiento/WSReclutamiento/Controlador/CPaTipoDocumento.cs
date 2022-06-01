using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Collections.Specialized;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using WSReclutamiento.Entity;

namespace WSReclutamiento.Controller
{
    public class CPaTipoDocumento
    {
        public List<EPaTipoDocumento> PaTipoDocumento(SqlConnection con)
        {
            List<EPaTipoDocumento> lEPaTipoDocumento = null;
            SqlCommand cmd = new SqlCommand("ASP_SOLOMON_TIPO_DOC", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);

            if (drd != null)
            {
                lEPaTipoDocumento = new List<EPaTipoDocumento>();

                EPaTipoDocumento obEPaTipoDocumento = null;
                while (drd.Read())
                {
                    obEPaTipoDocumento = new EPaTipoDocumento();
                    obEPaTipoDocumento.i_codigo = drd["i_codigo"].ToString();
                    obEPaTipoDocumento.v_descripcion = drd["v_descripcion"].ToString();
                    obEPaTipoDocumento.v_default = drd["v_default"].ToString();
                    lEPaTipoDocumento.Add(obEPaTipoDocumento);
                }
                drd.Close();
            }

            return (lEPaTipoDocumento);
        }
    }
}