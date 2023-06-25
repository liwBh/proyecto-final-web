using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BebidasBackend.Entidades.Request
{
	public class ReqVincularFavorito : ReqBase
	{
		public int idUsuario { get; set; }
		public int idBebida { get; set; }
	}
}