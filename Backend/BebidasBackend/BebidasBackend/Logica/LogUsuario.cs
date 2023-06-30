using System;
using System.Collections.Generic;
using System.Linq;
using BebidasBackend.Entidades;
using ForoBackend.Logica;
using BebidasBackend.Entidades.Enum;
using BebidasBackend.Entidades.Response;
using BebidasBackend.Entidades.Request;
using BebidasBackend.AccesoDatos;

namespace BebidasBackend.Logica
{
	public class LogUsuario
	{
		public static string connection = "Data Source=LiwBH-pc\\SQLEXPRESS;Initial Catalog=bdbebidas;Integrated Security=True";
		public ResIngresarUsuario ingresarUsuario(ReqIngresarUsuario req) {
			ResIngresarUsuario res = new ResIngresarUsuario();
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
					if (String.IsNullOrEmpty(req.elUsuario.nombre))
					{
						//Falta el nombre
						res.result = false;
						res.errors.Add("Nombre faltante");
					}
					if (String.IsNullOrEmpty(req.elUsuario.apellidos))
					{
						res.result = false;
						res.errors.Add("Apellidos faltantes");
					}
					if (String.IsNullOrEmpty(req.elUsuario.correoElectronico))
					{
						res.result = false;
						res.errors.Add("Correo electronico");
					}
					if (String.IsNullOrEmpty(req.elUsuario.password))
					{
						res.result = false;
						res.errors.Add("Password");
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

						Random rdm = new Random();
						int intNumeroVerificacion = rdm.Next();
						string strNumeroVerificacion = Utilitarios.Encrypt(intNumeroVerificacion.ToString(), "sarapiquiUNA2023");
						strNumeroVerificacion = strNumeroVerificacion.Replace("/", "-");

						string strNewPass = Utilitarios.Encrypt(req.elUsuario.password, "sarapiquiUNA2023");

						conexionbdDataContext miLinq = new conexionbdDataContext(connection);
                        miLinq.SP_INGRESAR_USUARIO(req.elUsuario.nombre, req.elUsuario.apellidos, req.elUsuario.correoElectronico, strNewPass, strNumeroVerificacion, ref idReturn, ref idError, ref errorBD);
						
						if (idError == 0)
						{
							//EnviarCorreoElectronico de confirmación.
							Utilitarios.enviarCorreoElectronico(req.elUsuario.correoElectronico, strNumeroVerificacion);

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
			finally {
				//Bitacorear TODOOO lo que pasó (bueno o malo)
				//Utilitarios.bitacorear(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType.Name, MethodBase.GetCurrentMethod().Name, tipoTransccion, (int)errorId, descripcionError, JsonConvert.SerializeObject(req), JsonConvert.SerializeObject(res));
			}

			return res;
		}

		public ResActivarUsuario activarUsuario(ReqActivarUsuario req)
		{
			ResActivarUsuario res = new ResActivarUsuario();
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
					if (String.IsNullOrEmpty(req.correoElectronico))
					{
						//Falta el nombre
						res.result = false;
						res.errors.Add("Correo faltante");
					}
					if (String.IsNullOrEmpty(req.numeroDeActivacion))
					{
						res.result = false;
						res.errors.Add("Numero de activación faltantes");
					}
					else
					{
						//No hay errores
						//Mandar a AD
						int? idReturn = 0;
						int? idError = 0;
						int? cantFilasAfectadas = 0;
						string errorBD = "";

						conexionbdDataContext miLinq = new conexionbdDataContext(connection);
                        miLinq.SP_ACTIVAR_USUARIO(req.correoElectronico, req.numeroDeActivacion, ref idReturn, ref idError, ref errorBD, ref cantFilasAfectadas);
				
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

		public ResLogin login(ReqLogin req) {
			ResLogin res = new ResLogin();
			res.errors = new List<string>();

            try
            {
                if (req == null)
                {
                    res.result = false;
                    res.errors.Add("Request null");
                }
                else
                {
					if (String.IsNullOrEmpty(req.elUsuario.correoElectronico))
					{
						//Falta el nombre
						res.result = false;
						res.errors.Add("Correo faltante");
					}
                    if (String.IsNullOrEmpty(req.elUsuario.password))
                    {
                        res.result = false;
                        res.errors.Add("Password faltante");
                    }
                    if (!res.errors.Any())
                    {
                        string strNewPass = Utilitarios.Encrypt(req.elUsuario.password, "sarapiquiUNA2023");
						int? idDelUsuario = 0;
                        int? estado = 0;
                        string nombre = "";
						string apellidos = "";
						
                        conexionbdDataContext miLinq = new conexionbdDataContext(connection);
                        miLinq.sp_Login(req.elUsuario.correoElectronico, strNewPass, ref idDelUsuario, ref estado, ref nombre, ref apellidos);

						if (idDelUsuario != 0) //¿El usuario existe?
						{
                            //Si. El usuario si se encontró

                            if (estado == 1) // El usuario encontrado ¿está autenticado?
                            {
  
                                res.elUsuario = new Usuario();
                                res.elUsuario.id = (int)idDelUsuario;
                                res.elUsuario.nombre = nombre;
                                res.elUsuario.apellidos = apellidos;
                                res.elUsuario.correoElectronico = req.elUsuario.correoElectronico;
                              //  res.elUsuario.likes = crearListaDeFavoritos(listaDeLinq);
                                res.session = this.abrirSesion((int)idDelUsuario, req.origen);

                                res.result = true;
                            }
							else {
                                //No. El usuario encontrado no está autenticado
                                res.result = false;
                                res.errors.Add("Su cuenta aún no ha sido autenticada. Revise su correo electrónico.");

                            }
                        }
                        else
                        {
							//No. El usuario no se encontró
                            res.result = false;
							res.errors.Add("Correo electrónico o contraseña incorrectos");
                        }

                    }
                }

            }
            catch (Exception ex)
            {
                res.result = false;
                res.errors.Add($"{ex.Message}");

            }
            finally
            {
                //Bitacorear TODOOO lo que pasó (bueno o malo)
                //Utilitarios.bitacorear(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType.Name, MethodBase.GetCurrentMethod().Name, tipoTransccion, (int)errorId, descripcionError, JsonConvert.SerializeObject(req), JsonConvert.SerializeObject(res));
            }
			return res;

        }
        public ResActualizarUsuario actualizarUsuario(ReqActualizarUsuario req)
        {
            ResActualizarUsuario res = new ResActualizarUsuario();
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
                    if (String.IsNullOrEmpty(req.elUsuario.nombre))
                    {
                        //Falta el nombre
                        res.result = false;
                        res.errors.Add("Nombre faltante");
                    }
                    if (String.IsNullOrEmpty(req.elUsuario.apellidos))
                    {
                        res.result = false;
                        res.errors.Add("Apellidos faltantes");
                    }
                    if (String.IsNullOrEmpty(req.elUsuario.correoElectronico))
                    {
                        res.result = false;
                        res.errors.Add("Correo electronico");
                    }
                    if (String.IsNullOrEmpty(req.elUsuario.password))
                    {
                        res.result = false;
                        res.errors.Add("Password");
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
                        string strNewPass = Utilitarios.Encrypt(req.elUsuario.password, "sarapiquiUNA2023");
                        conexionbdDataContext miLinq = new conexionbdDataContext(connection);
                        miLinq.SP_ACTUALIZAR_USUARIO(req.elUsuario.id, req.elUsuario.nombre, req.elUsuario.apellidos, req.elUsuario.correoElectronico, strNewPass, ref errorId, ref descripcionError);
                       

                        if (idError == 0)
                        {
                            //EnviarCorreoElectronico de confirmación.
                            //  Utilitarios.enviarCorreoElectronico(req.elUsuario.correoElectronico, strNumeroVerificacion);

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

        public ResEliminarUsuario eliminarUsuario(ReqEliminarUsuario req)
        {
            ResEliminarUsuario res = new ResEliminarUsuario();
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
                    if (req.elUsuario.id == null)
                    {
                        //Falta el nombre
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

                        conexionbdDataContext miLinq = new conexionbdDataContext(connection);
                        miLinq.SP_ELIMINAR_USUARIO(req.elUsuario.id, ref errorId, ref descripcionError);
                        

                        if (idError == 0)
                        {
                            //EnviarCorreoElectronico de confirmación.
                            //  Utilitarios.enviarCorreoElectronico(req.elUsuario.correoElectronico, strNumeroVerificacion);

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
        private string abrirSesion(int idDeUsuario, string origen) {
           conexionbdDataContext con = new conexionbdDataContext(connection);
            Guid miGuid = Guid.NewGuid();
            int? returnBD = 0;
            int? errorIdBD = 0;
            string descripcionBD = "";
            con.SP_ABRIR_SESION(miGuid.ToString(), idDeUsuario, origen, ref returnBD, ref errorIdBD, ref descripcionBD);
			return miGuid.ToString();
        }

	}
}