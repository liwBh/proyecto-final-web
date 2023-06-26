using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BebidasBackend.Entidades
{
	public class ImageData
	{
		public string name { get; set; }
		public string path { get; set; }
		public string base64Data { get; set; } // Cambiado a string para almacenar el base64 en lugar de byte[]
		public string type { get; set; }
	}
}