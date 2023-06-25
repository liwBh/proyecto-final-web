using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using BebidasBackend.Entidades;
using ForoBackend.Logica;
using BebidasBackend.Entidades.Enum;
using BebidasBackend.Entidades.Response;
using BebidasBackend.Entidades.Request;
using BebidasBackend.AccesoDatos;

namespace BebidasBackend.Logica
{
	public class LogBebida
	{
		

		public ResObtenerBebidas obtenerBebidas(ReqObtenerBebidas req)
		{
			Int16 tipoDeTransaccion = 0;
			string descripcionError = "";
			int? errorId = 0;
			ResObtenerBebidas res = new ResObtenerBebidas();
			res.errors = new List<string>();

			try
			{


				conexionbdDataContext miLinq = new conexionbdDataContext();
				List<SP_OBTENER_BEBIDASResult> listaDeLinq = new List<SP_OBTENER_BEBIDASResult>();
				listaDeLinq = miLinq.SP_OBTENER_BEBIDAS().ToList();
				res.ListaDeBebidas = this.crearListaDeBebidas(listaDeLinq);
				res.result = true;


			}
			catch (Exception ex)
			{
				res.result = false;
				tipoDeTransaccion = (Int16)enumTipo.errorNoControlado;
				descripcionError = ex.StackTrace;
				res.errors.Add(ex.StackTrace); //!!!!!!
			}
			finally
			{
				//	Utilitarios.bitacorear(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType.Name, MethodBase.GetCurrentMethod().Name, tipoDeTransaccion, (int)errorId, descripcionError, JsonConvert.SerializeObject(req), JsonConvert.SerializeObject(res));
			}
			return res;
		}

		private List<Bebida> crearListaDeBebidas(List<SP_OBTENER_BEBIDASResult> listaDeLinq)
		{
			List<Bebida> listaArmada = new List<Bebida>();
			foreach (SP_OBTENER_BEBIDASResult tipoComplejo in listaDeLinq)
			{
				listaArmada.Add(this.crearBebida(tipoComplejo));
			}
			return listaArmada;
		}

		private List<Bebida> crearListaDeFavoritos(List<SP_OBTENER_FAVORITOS_USUARIOSResult> listaDeLinq)
		{
			List<Bebida> listaArmada = new List<Bebida>();
			foreach (SP_OBTENER_FAVORITOS_USUARIOSResult tipoComplejo in listaDeLinq)
			{
				listaArmada.Add(this.crearBebidasFavoritas(tipoComplejo));
			}
			return listaArmada;
		}

		private Bebida crearBebida(SP_OBTENER_BEBIDASResult tipoComplejo)
		{

			string medidas = tipoComplejo.bebidamedidas;
			List<string> listaMedidas = medidas.Split('-').ToList();

			string ingredientes = tipoComplejo.bebidaingredientes;
			List<string> listaIng = ingredientes.Split('-').ToList();

			string likes = tipoComplejo?.favoritosUsuarios; // Usamos el operador de navegación segura '?' para evitar una excepción si tipoComplejo es nulo

			List<int> listaLike = likes != null
				? likes.Split(',').Select(int.Parse).ToList()
				: new List<int>(); // Asignamos una lista vacía si likes es nulo




			Bebida unaBebida = new Bebida();
			unaBebida.id = (int)tipoComplejo.bebidaid;
			unaBebida.name = tipoComplejo.bebidanombre;
			unaBebida.measures = listaMedidas;
			unaBebida.ingredients = listaIng;
			unaBebida.image = tipoComplejo.bebidaimgruta;
			unaBebida.category = tipoComplejo.bebidacategoria;
			unaBebida.alcoholic = tipoComplejo.bebidatipoalcohol;
			unaBebida.preparation = tipoComplejo.bebidapreparacion;
			unaBebida.glass = tipoComplejo.bebidavaso;
			unaBebida.likes = listaLike;
			unaBebida.userId = tipoComplejo.bebidausuarioid;

			return unaBebida;
		}



		private Bebida crearBebidasFavoritas(SP_OBTENER_FAVORITOS_USUARIOSResult tipoComplejo)
		{

			string medidas = tipoComplejo.bebidamedidas;
			List<string> listaMedidas = medidas.Split('-').ToList();

			string ingredientes = tipoComplejo.bebidaingredientes;
			List<string> listaIng = ingredientes.Split('-').ToList();


			Bebida unaBebida = new Bebida();
			unaBebida.id = (int)tipoComplejo.bebidaid;
			unaBebida.name = tipoComplejo.bebidanombre;
			unaBebida.measures = listaMedidas;
			unaBebida.ingredients = listaIng;
			unaBebida.image = tipoComplejo.bebidaimgruta;
			unaBebida.category = tipoComplejo.bebidacategoria;
			unaBebida.alcoholic = tipoComplejo.bebidatipoalcohol;
			unaBebida.glass = tipoComplejo.bebidavaso;
			unaBebida.userId = tipoComplejo.bebidausuarioid;

			return unaBebida;
		}

		public ResVincularFavorito vincularFavoritos( ReqVincularFavorito req)
		{
			int? resultado = 0;
			ResVincularFavorito res = new ResVincularFavorito();
			res.errors = new List<string>();
			Int16 tipoDeTransaccion = 0;
			string descripcionError = "";
			int? errorId = 0;
			try
			{
				if (req == null)
				{
					res.result = false;
					res.errors.Add("Request null");
					tipoDeTransaccion = (Int16)enumTipo.errorLogica;
				}
				else
				{
					

					if(req.idBebida == 0)
					{
						res.result = false;
						res.errors.Add("No se agrego Bebida");
					}

				

					if (req.idUsuario == 0)
					{

						res.result = false;
						res.errors.Add("No se agrego Usuario");
					}

					if (res.errors.Any())
					{
						//Hay errores
						tipoDeTransaccion = (Int16)enumTipo.errorLogica;
					}
					else
					{
					


						//No hay errores
						//Mandar a AD
						long? idReturn = 0;
						int? idError = 0;
						string errorBD = "";

						Random rdm = new Random();
						int intNumeroVerificacion = rdm.Next();


						conexionbdDataContext miLinq = new conexionbdDataContext();
						miLinq.SP_VERIFICAR_FAVORITO(req.idUsuario, req.idBebida, ref resultado);

						

						if (resultado == 0)
						{

							res.result = true;
							tipoDeTransaccion = 0;
							errorId = 0;
						}
						else
						{
							errorId = idError;
							descripcionError = errorBD;
							res.result = false;
							res.errors.Add(errorBD);
							tipoDeTransaccion = 1;
						}

					}
				}

			}
			catch (Exception ex)
			{
				descripcionError = ex.Message;
				res.result = false;
				res.errors.Add($"{ex.Message}");
				tipoDeTransaccion = (Int16)enumTipo.errorNoControlado;

			}
			finally
			{
				//Bitacorear TODOOO lo que pasó (bueno o malo)
				//Utilitarios.bitacorear(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType.Name, MethodBase.GetCurrentMethod().Name, tipoTransccion, (int)errorId, descripcionError, JsonConvert.SerializeObject(req), JsonConvert.SerializeObject(res));
			}

			return res;
		}

		public ResObtenerBebidas obtenerBebidasFavoritas(int id)
		{
			Int16 tipoDeTransaccion = 0;
			string descripcionError = "";
			int? errorId = 0;
			ResObtenerBebidas res = new ResObtenerBebidas();
			res.errors = new List<string>();

			try
			{


				conexionbdDataContext miLinq = new conexionbdDataContext();
				List<SP_OBTENER_FAVORITOS_USUARIOSResult> listaDeLinq = new List<SP_OBTENER_FAVORITOS_USUARIOSResult>();
				listaDeLinq = miLinq.SP_OBTENER_FAVORITOS_USUARIOS(id).ToList();
				res.ListaDeBebidas = this.crearListaDeFavoritos(listaDeLinq);
				res.result = true;


			}
			catch (Exception ex)
			{
				res.result = false;
				tipoDeTransaccion = (Int16)enumTipo.errorNoControlado;
				descripcionError = ex.StackTrace;
				res.errors.Add(ex.StackTrace); //!!!!!!
			}
			finally
			{
				//	Utilitarios.bitacorear(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType.Name, MethodBase.GetCurrentMethod().Name, tipoDeTransaccion, (int)errorId, descripcionError, JsonConvert.SerializeObject(req), JsonConvert.SerializeObject(res));
			}
			return res;
		}


		public ResIngresarBebida ingresarBebida(ReqIngresarBebida req)
		{
			ResIngresarBebida res = new ResIngresarBebida();
			res.errors = new List<string>();
			Int16 tipoTransccion = 0;
			string descripcionError = "";
			int? errorId = 0;
			try
			{
				if (req == null)
				{
					res.result = false;
					res.errors.Add("Request null");
					tipoTransccion = (Int16)enumTipo.errorLogica;
				}
				else
				{
					if (String.IsNullOrEmpty(req.laBebida.name))
					{
						
						res.result = false;
						res.errors.Add("Name faltante");
					}
					if (String.IsNullOrEmpty(req.laBebida.preparation))
					{
						res.result = false;
						res.errors.Add("Preparacion faltante");
					}


					
					if (req.laBebida.measures == null)
					{
						res.result = false;
						res.errors.Add("La medida no se agregó");
					}
					

					if (req.laBebida.ingredients == null)
					{
						res.result = false;
						res.errors.Add("El ingrediente no se agregó");
					}
					


					if (String.IsNullOrEmpty(req.laBebida.image))
					{
						res.result = false;
						res.errors.Add("image faltante");
					}

					if (String.IsNullOrEmpty(req.laBebida.category))
					{
						res.result = false;
						res.errors.Add("category faltante");
					}

					if (String.IsNullOrEmpty(req.laBebida.alcoholic))
					{
						res.result = false;
						res.errors.Add("alcoholic faltante");
					}

					
					if (String.IsNullOrEmpty(req.laBebida.glass))
					{
						res.result = false;
						res.errors.Add("glass faltante");
					}


					if (req.laBebida.userId == 0)
					{

						res.result = false;
						res.errors.Add("No se agrego Usuario");
					}

					if (res.errors.Any())
					{
						//Hay errores
						tipoTransccion = (Int16)enumTipo.errorLogica;
					}
					else
					{
						List<string> medidas = req.laBebida.measures;
						string concatenatedMeasures = req.laBebida.measures[0].ToString();

						for (int i = 1; i < req.laBebida.measures.Count; i++)
						{
							concatenatedMeasures += "-" + req.laBebida.measures[i].ToString();
						}

						List<string> ingredientes = req.laBebida.ingredients;
						
							string concatenatedIngredients = req.laBebida.ingredients[0].ToString();

							for (int i = 1; i < req.laBebida.ingredients.Count; i++)
							{
								concatenatedIngredients += "-" + req.laBebida.ingredients[i].ToString();
							}


						

						//No hay errores
						//Mandar a AD
						long? idReturn = 0;
						int? idError = 0;
						string errorBD = "";

						Random rdm = new Random();
						int intNumeroVerificacion = rdm.Next();
					

						conexionbdDataContext miLinq = new conexionbdDataContext();
						miLinq.SP_INSERTAR_BEBIDA(req.laBebida.name, req.laBebida.preparation, req.laBebida.alcoholic, req.laBebida.image, req.laBebida.glass, req.laBebida.category, concatenatedIngredients, concatenatedMeasures,  req.laBebida.userId, ref idReturn, ref idError, ref errorBD);

						if (idError == 0)
						{
						
							res.result = true;
							tipoTransccion = (Int16)enumTipo.exitoso;
							errorId = 0;
						}
						else
						{
							errorId = idError;
							descripcionError = errorBD;
							res.result = false;
							res.errors.Add(errorBD);
							tipoTransccion = (Int16)enumTipo.errorDeBaseDatos;
						}

					}
				}

			}
			catch (Exception ex)
			{
				descripcionError = ex.Message;
				res.result = false;
				res.errors.Add($"{ex.Message}");
				tipoTransccion = (Int16)enumTipo.errorNoControlado;

			}
			finally
			{
				//Bitacorear TODOOO lo que pasó (bueno o malo)
				//Utilitarios.bitacorear(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType.Name, MethodBase.GetCurrentMethod().Name, tipoTransccion, (int)errorId, descripcionError, JsonConvert.SerializeObject(req), JsonConvert.SerializeObject(res));
			}

			return res;
		}

	

		public ResActualizarBebida actualizarBebida(ReqActualizarBebida req)
		{
			ResActualizarBebida res = new ResActualizarBebida();
			res.errors = new List<string>();
			Int16 tipoTransccion = 0;
			string descripcionError = "";
			int? errorId = 0;

			//Validaciones
			try
			{
				if (req == null)
				{
					res.result = false;
					res.errors.Add("Request null");
					tipoTransccion = (Int16)enumTipo.errorLogica;
				}
				else
				{
					if (req.laBebida.id == 0  )
					{
						//Falta el id
						res.result = false;
						res.errors.Add("id bebida faltante");
					}
					if (String.IsNullOrEmpty(req.laBebida.name))
					{
						//Falta el nombre
						res.result = false;
						res.errors.Add("Nombre faltante");
					}
					if (String.IsNullOrEmpty(req.laBebida.preparation))
					{
						res.result = false;
						res.errors.Add("Preparacion faltantes");
					}
					if (req.laBebida.measures == null)
					{
						res.result = false;
						res.errors.Add("La medida no se agregó");
					}


					if (req.laBebida.ingredients == null)
					{
						res.result = false;
						res.errors.Add("El ingrediente no se agregó");
					}
					if (String.IsNullOrEmpty(req.laBebida.image))
					{
						res.result = false;
						res.errors.Add("image faltante");
					}

					if (String.IsNullOrEmpty(req.laBebida.category))
					{
						res.result = false;
						res.errors.Add("category faltante");
					}

					if (String.IsNullOrEmpty(req.laBebida.alcoholic))
					{
						res.result = false;
						res.errors.Add("alcoholic faltante");
					}


					if (String.IsNullOrEmpty(req.laBebida.glass))
					{
						res.result = false;
						res.errors.Add("glass faltante");
					}


					if (req.laBebida.userId == 0)
					{

						res.result = false;
						res.errors.Add("No se agrego Usuario");
					}


					if (res.errors.Any())
					{
						//Hay errores
						tipoTransccion = (Int16)enumTipo.errorLogica;
					}
					else
					{
						List<string> medidas = req.laBebida.measures;
						string concatenatedMeasures = req.laBebida.measures[0].ToString();

						for (int i = 1; i < req.laBebida.measures.Count; i++)
						{
							concatenatedMeasures += "-" + req.laBebida.measures[i].ToString();
						}

						List<string> ingredientes = req.laBebida.ingredients;

						string concatenatedIngredients = req.laBebida.ingredients[0].ToString();

						for (int i = 1; i < req.laBebida.ingredients.Count; i++)
						{
							concatenatedIngredients += "-" + req.laBebida.ingredients[i].ToString();
						}

						//No hay errores
						//Mandar a AD
						int? idReturn = 0;
						int? idError = 0;
						string errorBD = "";
					
						conexionbdDataContext miLinq = new conexionbdDataContext();
						miLinq.SP_ACTUALIZAR_BEBIDA(req.laBebida.id, req.laBebida.name, req.laBebida.preparation, req.laBebida.alcoholic, req.laBebida.image, req.laBebida.glass, req.laBebida.category, concatenatedIngredients, concatenatedMeasures, req.laBebida.userId, ref idError, ref errorBD);


						if (idError == 0)
						{
							
							res.result = true;
							tipoTransccion = (Int16)enumTipo.exitoso;
							errorId = 0;
						}
						else
						{
							errorId = idError;
							descripcionError = errorBD;
							res.result = false;
							res.errors.Add(errorBD);
							tipoTransccion = (Int16)enumTipo.errorDeBaseDatos;
						}


					}

				}
			}
			catch (Exception ex)
			{

				descripcionError = ex.Message;
				res.result = false;
				res.errors.Add($"{ex.Message}");
				tipoTransccion = (Int16)enumTipo.errorNoControlado;

			}
			finally
			{
				//Bitácora
			}


			return res;

		}
		public ResEliminarBebida eliminarBebida(ReqEliminarBebida req)
		{
			ResEliminarBebida res = new ResEliminarBebida();
			res.errors = new List<string>();
			Int16 tipoTransccion = 0;
			string descripcionError = "";
			int? errorId = 0;

			//Validaciones
			try
			{
				if (req == null)
				{
					res.result = false;
					res.errors.Add("Request null");
					tipoTransccion = (Int16)enumTipo.errorLogica;
				}
				else
				{
					if (req.laBebida.id == null)
					{
						
						res.result = false;
						res.errors.Add("Ningún ID enviado");
					}

					if (res.errors.Any())
					{
						//Hay errores
						tipoTransccion = (Int16)enumTipo.errorLogica;
					}
					else
					{
						//No hay errores
						//Mandar a AD
						int? idReturn = 0;
						int? idError = 0;
						string errorBD = "";

						conexionbdDataContext miLinq = new conexionbdDataContext();
						miLinq.SP_ELIMINAR_BEBIDA(req.laBebida.id, ref errorId, ref descripcionError);


						if (idError == 0)
						{
							
						
							res.result = true;
							tipoTransccion = (Int16)enumTipo.exitoso;
							errorId = 0;
						}
						else
						{
							errorId = idError;
							descripcionError = errorBD;
							res.result = false;
							res.errors.Add(errorBD);
							tipoTransccion = (Int16)enumTipo.errorDeBaseDatos;
						}


					}

				}
			}
			catch (Exception ex)
			{

				descripcionError = ex.Message;
				res.result = false;
				res.errors.Add($"{ex.Message}");
				tipoTransccion = (Int16)enumTipo.errorNoControlado;

			}
			finally
			{
				//Bitácora
			}


			return res;

		}

	}
}