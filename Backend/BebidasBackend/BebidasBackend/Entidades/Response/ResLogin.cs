using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BebidasBackend.Entidades
{
    public class ResLogin : ResBase
    {
        public Usuario elUsuario { get; set; }
        public String session { get; set; }
    }
}