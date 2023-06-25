using BebidasBackend.Entidades;
using BebidasBackend.Entidades.Request;
using BebidasBackend.Entidades.Response;
using BebidasBackend.Logica;
using System.Web.Http;

namespace BebidasAPI.Controllers
{
    public class UsuarioController : ApiController
    {
		[System.Web.Http.HttpPost]
		[System.Web.Http.Route("api/Usuario/ingresarUsuario")]
		public ResIngresarUsuario ingresarUsuario([FromBody] ReqIngresarUsuario req)
        {
            LogUsuario logicaDelBackend = new LogUsuario();
            return logicaDelBackend.ingresarUsuario(req);

        }

		[System.Web.Http.HttpPost]
		[System.Web.Http.Route("api/Usuario/activarUsuario")]
		public ResActivarUsuario activarUsuario([FromBody] ReqActivarUsuario req)
		{
			LogUsuario logicaDelBackend = new LogUsuario();
			return logicaDelBackend.activarUsuario(req);

		}

        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("api/Usuario/ActualizarUsuario")]
        public ResActualizarUsuario actualizarUsuario([FromBody] ReqActualizarUsuario req)
        {
            LogUsuario logicaDelBackend = new LogUsuario();
            return logicaDelBackend.actualizarUsuario(req);

        }

        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("api/Usuario/login")]
        public ResLogin login([FromBody] ReqLogin req)
        {
            LogUsuario logicaDelBackend = new LogUsuario();
            return logicaDelBackend.login(req);

        }

        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("api/Usuario/EliminarUsuario")]
        public ResEliminarUsuario eliminarUsuario([FromBody] ReqEliminarUsuario req)
        {
            LogUsuario logicaDelBackend = new LogUsuario();
            return logicaDelBackend.eliminarUsuario(req);

        }

    }
}