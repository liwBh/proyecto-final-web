using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BebidasBackend.Entidades.Request
{
	public class ReqObtenerFavoritos : ReqBase
	{
		public int idusuario { get; set; }
	}
}