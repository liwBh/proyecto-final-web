using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BebidasBackend.Entidades
{
    public class ReqIngresarUsuario : ReqBase
    {
        public Usuario elUsuario { get; set; }
    }
}