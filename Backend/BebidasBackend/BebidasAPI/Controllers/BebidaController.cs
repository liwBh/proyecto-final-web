using BebidasBackend.AccesoDatos;
using BebidasBackend.Entidades;
using BebidasBackend.Entidades.Enum;
using BebidasBackend.Entidades.Request;
using BebidasBackend.Entidades.Response;
using BebidasBackend.Logica;
using ForoBackend.Logica;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace BebidasAPI.Controllers
{
    public class BebidaController : ApiController
	{

		
		public ResObtenerBebidas Get()
		{
			ReqObtenerBebidas req = new ReqObtenerBebidas();
		

			LogBebida logicaDelBackend = new LogBebida();
			return logicaDelBackend.obtenerBebidas(req);
		}

		public ResObtenerBebidas Get(int id)
		{
			ReqObtenerBebidas req = new ReqObtenerBebidas();


			LogBebida logicaDelBackend = new LogBebida();
			return logicaDelBackend.obtenerBebidasFavoritas(id);
		}


		[System.Web.Http.HttpPost]
		[System.Web.Http.Route("api/Bebida/ingresarBebida")]
		public ResIngresarBebida ingresarBebida([FromBody] ReqIngresarBebida req)
		{
			LogBebida logicaDelBackend = new LogBebida();
			return logicaDelBackend.ingresarBebida(req);

		}

		

		[System.Web.Http.HttpPost]
		[System.Web.Http.Route("api/Bebida/eliminarBebida")]
		public ResEliminarBebida eliminarBebida([FromBody] ReqEliminarBebida req)
		{
			LogBebida logicaDelBackend = new LogBebida();
			return logicaDelBackend.eliminarBebida(req);

		}


		[System.Web.Http.HttpPost]
		[System.Web.Http.Route("api/Bebida/actualizarBebida")]
		public ResActualizarBebida actualizarBebida([FromBody] ReqActualizarBebida req)
		{
			LogBebida logicaDelBackend = new LogBebida();
			return logicaDelBackend.actualizarBebida(req);

		}

		[System.Web.Http.HttpPost]
		[System.Web.Http.Route("api/Bebida/vincularFavorito")]
		public ResVincularFavorito vincularFavoritos([FromBody] ReqVincularFavorito req)
		{
			LogBebida logicaDelBackend = new LogBebida();
			return logicaDelBackend.vincularFavoritos(req);

		}
	}
}
