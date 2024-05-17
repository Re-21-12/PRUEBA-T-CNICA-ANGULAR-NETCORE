using System;
using System.Collections.Generic;

namespace Pruebatecnica.Models
{
    public partial class CampoEnFormulario
    {
        public int Id { get; set; }
        public string LinkFormulario { get; set; } = null!;
        public int IdCampo { get; set; }
        public string? Valor { get; set; }

        public virtual Campo IdCampoNavigation { get; set; } = null!;
        public virtual Formulario LinkFormularioNavigation { get; set; } = null!;
    }
}
