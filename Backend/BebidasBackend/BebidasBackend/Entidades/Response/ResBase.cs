using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BebidasBackend.Entidades
{
    public class ResBase
    {
        public Boolean result { get; set; }
        public List<String> errors { get; set; }
    }
}