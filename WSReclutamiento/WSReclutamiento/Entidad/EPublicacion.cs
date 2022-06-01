using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WSReclutamiento.Entity
{
    public class EPublicacion
    {
        public string v_codigo { get; set; }
        public string v_empresa { get; set; }
        public string d_fecha { get; set; }
        public string v_titulo { get; set; }
        public string v_complemento { get; set; }
        public string v_descripcion_puesto { get; set; }
        public string v_pais { get; set; }
        public string v_departamento { get; set; }
        public string v_provincia { get; set; }
        public string v_distrito { get; set; }
        public string v_jornada { get; set; }
        public string v_salario { get; set; }
        public string i_vacantes { get; set; }
        public string i_experiencia { get; set; }
        public string v_edad { get; set; }
        public string v_estudios { get; set; }
        public string v_viaje { get; set; }
        public string v_residencia { get; set; }
        public string v_discapacidad { get; set; }
        public string v_puesto { get; set; }
    }
}