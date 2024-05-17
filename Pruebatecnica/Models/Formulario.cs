using System;
using System.Collections.Generic;

namespace Pruebatecnica.Models
{
    public partial class Formulario
    {
        public Formulario()
        {
            CampoEnFormularios = new HashSet<CampoEnFormulario>();
        }

        public string LinkFormulario { get; set; } = null!;
        public string NombreEncuesta { get; set; } = null!;
        public string DescripcionEncuesta { get; set; } = null!;

        public virtual ICollection<CampoEnFormulario> CampoEnFormularios { get; set; }
    }
}
