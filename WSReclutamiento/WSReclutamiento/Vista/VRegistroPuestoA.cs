using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WSReclutamiento.Controller;
using WSReclutamiento.Entity;

namespace WSReclutamiento.view
{
    public class VRegistroPuestoA : BDconexion
    {
        public List<EMantenimiento> RegistroPuestoA(
            Int32 post,
            String correlativo,
            Int32 estado,
            Int32 puesto,
            String fecha,
            String elaborado_por,
            String revisado_por,
            String gerencia,
            String posicion_reporta,
            String mision,
            String organizacion,
            String complejidad,
            String chktecnico,
            String chkuniversitario,
            String chkpostgrado,
            String chkotros,
            String otros,
            String profesion,
            String rd1,
            String rd2,
            String sector,
            Int32 anhio_sector,
            String personal_acargo,
            Int32 anhio_personal,
            String puestos_similares,
            Int32 anhio_puestos,
            String conocimiento,
            String otro_licencias,
            String desc_licencias,
            String otro_certificaciones,
            String desc_certificaciones,
            Int32 user
            )
        {
            List<EMantenimiento> lCEMantenimiento = null;
            using (SqlConnection con = new SqlConnection(conexion))
            {
                try
                {
                    con.Open();
                    CRegistroPuestoA oVRegistroPuestoA = new CRegistroPuestoA();
                    lCEMantenimiento = oVRegistroPuestoA.RegistroPuestoA(con, 
                        post, correlativo, estado, puesto, fecha, elaborado_por, revisado_por, gerencia, posicion_reporta, mision, organizacion, 
                        complejidad, chktecnico, chkuniversitario, chkpostgrado, chkotros, otros, profesion, rd1, rd2, sector, anhio_sector, 
                        personal_acargo, anhio_personal, puestos_similares, anhio_puestos, conocimiento, otro_licencias, desc_licencias, otro_certificaciones, desc_certificaciones, user);
                }
                catch (SqlException)
                {
                    
                }
            }
                return (lCEMantenimiento);
        }
    }
}