

namespace BebidasBackend.Entidades
{
	public class ReqActivarUsuario : ReqBase
	{
		public string correoElectronico { get; set; }
		public string numeroDeActivacion { get; set; }
	}
}