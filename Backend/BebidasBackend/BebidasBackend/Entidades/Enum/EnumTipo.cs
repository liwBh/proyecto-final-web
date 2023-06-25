using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BebidasBackend.Entidades.Enum
{
	public enum enumTipo
	{
		errorNoControlado = -1,
		errorLogica = 0, 
		exitoso = 1, 
		errorDeBaseDatos = 2, 
	}
}