using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BebidasBackend.Entidades
{
	public class ReqIngresarBebida : ReqBase
	{
		public Bebida laBebida { get; set; }
	}
}