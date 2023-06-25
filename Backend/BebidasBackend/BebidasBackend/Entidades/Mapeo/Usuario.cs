using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BebidasBackend.Entidades
{
    public class Usuario
    {
        public int id { get; set; }
        public string nombre { get; set; }
        public string apellidos { get; set; }
        public string correoElectronico { get; set; }
        public string password { get; set; }
        public string repetirPassword { get; set; }
        public int numeroVerificacion { get; set; }
        //public List<Bebida> likes { get; set; }
    }
}