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
    public class CTipoContrato
    {
        public List<ETipoContrato> TipoContrato(SqlConnection con)
        {
            List<ETipoContrato> lETipoContrato = null;
            SqlCommand cmd = new SqlCommand("ASP_TIPO_CONTRATO", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);

            if (drd != null)
            {
                lETipoContrato = new List<ETipoContrato>();

                ETipoContrato obETipoContrato = null;
                while (drd.Read())
                {
                    obETipoContrato = new ETipoContrato();
                    obETipoContrato.i_codigo = drd["i_codigo"].ToString();
                    obETipoContrato.v_descripcion = drd["v_descripcion"].ToString();
                    lETipoContrato.Add(obETipoContrato);
                }
                drd.Close();
            }

            return (lETipoContrato);
        }
    }
}