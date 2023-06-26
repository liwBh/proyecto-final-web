using BebidasBackend.AccesoDatos;
using BebidasBackend.Entidades;
using BebidasBackend.Entidades.Enum;
using BebidasBackend.Entidades.Request;
using BebidasBackend.Entidades.Response;
using BebidasBackend.Logica;
using ForoBackend.Logica;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Hosting;
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

			// Obtener la ruta de la carpeta "images"
			string imagesFolderPath = HostingEnvironment.MapPath("~/images");

			// Verificar si la carpeta "images" existe, si no, crearla
			if (!Directory.Exists(imagesFolderPath))
			{
				Directory.CreateDirectory(imagesFolderPath);
			}

			// Obtener el nombre de la imagen
			string imageName = Path.GetFileName(req.laBebida.image.path);

			// Construir la ruta completa del archivo de imagen
			string imagePath = Path.Combine(imagesFolderPath, imageName);

			// Convertir la cadena base64 en bytes de imagen
			string base64Data = req.laBebida.image.base64Data;
			string trimmedData = base64Data.Substring(base64Data.IndexOf(',') + 1);
			byte[] imageData = Convert.FromBase64String(trimmedData);

			// Guardar el archivo de imagen en la carpeta "images"
			File.WriteAllBytes(imagePath, imageData);

			// Obtener la URL base de la aplicación
			string baseUrl = HttpContext.Current.Request.Url.GetLeftPart(UriPartial.Authority);

			// Construir la URL completa de la imagen
			string imageUrl = baseUrl + "/images/" + imageName;

			// Actualizar la propiedad "image" con la URL de la imagen
			req.laBebida.image.path = imageUrl;
			req.laBebida.ruta = imageUrl;

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

			// Obtener la ruta de la carpeta "images"
			string imagesFolderPath = HostingEnvironment.MapPath("~/images");

			// Verificar si la carpeta "images" existe, si no, crearla
			if (!Directory.Exists(imagesFolderPath))
			{
				Directory.CreateDirectory(imagesFolderPath);
			}

			// Obtener el nombre de la imagen
			string imageName = Path.GetFileName(req.laBebida.image.path);

			// Construir la ruta completa del archivo de imagen
			string imagePath = Path.Combine(imagesFolderPath, imageName);

			// Convertir la cadena base64 en bytes de imagen
			string base64Data = req.laBebida.image.base64Data;
			string trimmedData = base64Data.Substring(base64Data.IndexOf(',') + 1);
			byte[] imageData = Convert.FromBase64String(trimmedData);

			// Guardar el archivo de imagen en la carpeta "images"
			File.WriteAllBytes(imagePath, imageData);

			// Obtener la URL base de la aplicación
			string baseUrl = HttpContext.Current.Request.Url.GetLeftPart(UriPartial.Authority);

			// Construir la URL completa de la imagen
			string imageUrl = baseUrl + "/images/" + imageName;

			// Actualizar la propiedad "image" con la URL de la imagen
			req.laBebida.image.path = imageUrl;
			req.laBebida.ruta = imageUrl;

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
