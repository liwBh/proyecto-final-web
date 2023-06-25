
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BebidasBackend.Entidades.Request
{
    public class ReqEliminarUsuario : ReqBase
    {
        public Usuario elUsuario { get; set; }
    }
}