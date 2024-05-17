using System;
using System.Collections.Generic;

namespace Pruebatecnica.Models
{
    public partial class Campo
    {
        public Campo()
        {
            CampoEnFormularios = new HashSet<CampoEnFormulario>();
        }

        public int Id { get; set; }
        public string NombreCampo { get; set; } = null!;
        public string TituloCampo { get; set; } = null!;
        public string Esrequerido { get; set; } = null!;
        public string TipoCampo { get; set; } = null!;
        public string LinkFormulario { get; set; } = null!;

        public virtual ICollection<CampoEnFormulario> CampoEnFormularios { get; set; }
    }
}
