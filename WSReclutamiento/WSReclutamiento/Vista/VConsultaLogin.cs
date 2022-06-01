﻿using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VConsultaLogin : BDconexion
    {
        public List<EConsultaLogin> ConsultaLogin(Int32 id)
        {
            List<EConsultaLogin> lCConsultaLogin = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CConsultaLogin oVConsultaLogin = new CConsultaLogin();
                    lCConsultaLogin = oVConsultaLogin.ConsultaLogin(con, id);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCConsultaLogin);
        }
    }
}