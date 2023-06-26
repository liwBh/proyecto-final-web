using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BebidasBackend.Entidades
{
	/*public class Bebida
	{
		public int id { get; set; }
		public string name { get; set; }
		public string preparation { get; set; }
		public List<string> measures { get; set; }
        public List<string> ingredients { get; set; }
        public string image{ get; set; }
		public string category { get; set; }
		public string alcoholic { get; set; }
		public string glass { get; set; }
		public List<int> likes { get; set; }
		public int userId { get; set; }


		
	}*/

	public class Bebida
	{
		public int id { get; set; }
		public string name { get; set; }
		public string preparation { get; set; }
		public List<string> measures { get; set; }
		public List<string> ingredients { get; set; }
		public string ruta;
		public ImageData image { get; set; }
		public string category { get; set; }
		public string alcoholic { get; set; }
		public string glass { get; set; }
		public List<int> likes { get; set; }
		public int userId { get; set; }

	}
}