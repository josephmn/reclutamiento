using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VDepartamento : BDconexion
    {
        public List<EDepartamento> Departamento()
        {
            List<EDepartamento> lCDepartamento = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CDepartamento oVDepartamento = new CDepartamento();
                    lCDepartamento = oVDepartamento.Departamento(con);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCDepartamento);
        }
    }
}