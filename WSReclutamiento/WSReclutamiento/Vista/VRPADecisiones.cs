﻿using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VRPADecisiones : BDconexion
    {
        public List<EMantenimiento> RPADecisiones(
            Int32 post,
            String correlativo,
            Int32 id,
            String decisiones,
            String recomendaciones,
            Int32 user)
        {
            List<EMantenimiento> lCEMantenimiento = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CRPADecisiones oVRPADecisiones = new CRPADecisiones();
                    lCEMantenimiento = oVRPADecisiones.RPADecisiones(con, post, correlativo, id, decisiones, recomendaciones, user);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCEMantenimiento);
        }
    }
}