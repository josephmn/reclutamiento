using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WSReclutamiento.Entity
{
    public class EPublicado
    {
        public string v_codigo { get; set; }
        public Int32 i_estado { get; set; }
        public string v_titulo { get; set; }
        public string v_complemento { get; set; }
        public string v_descripcion_puesto { get; set; }
        public Int32 i_descripcion_len { get; set; }
        public Int32 i_pais { get; set; }
        public Int32 i_departamento { get; set; }
        public Int32 i_provincia { get; set; }
        public Int32 i_distrito { get; set; }
        public Int32 i_jornada { get; set; }
        public Int32 i_contrato { get; set; }
        public string v_salario1 { get; set; }
        public string v_salario2 { get; set; }
        public Boolean v_mostrar_salario { get; set; }
        public string d_fecha { get; set; }
        public Int32 i_vacantes { get; set; }
        public Int32 i_experiencia { get; set; }
        public Int32 i_edad_min { get; set; }
        public Int32 i_edad_max { get; set; }
        public Boolean v_mostrar_edad { get; set; }
        public Int32 i_estudios { get; set; }
        public Boolean v_rdviaje1 { get; set; }
        public Boolean v_rdviaje2 { get; set; }
        public Boolean v_rdresidencia1 { get; set; }
        public Boolean v_rdresidencia2 { get; set; }
        public Boolean v_rddiscapacidad1 { get; set; }
        public Boolean v_rddiscapacidad2 { get; set; }
    }
}