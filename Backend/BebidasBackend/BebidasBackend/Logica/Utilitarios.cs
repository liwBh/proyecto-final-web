

using BebidasBackend.AccesoDatos;
using System;
using System.Collections.Generic;
using System.Data.SqlTypes;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using System.Web;

namespace ForoBackend.Logica
{
	public class Utilitarios
	{
		public static string connection = "Data Source=LiwBH-pc\\SQLEXPRESS;Initial Catalog=bdbebidas;Integrated Security=True";
		private static readonly byte[] initVectorBytes = Encoding.ASCII.GetBytes("tu89geji340t89u2");

        // This constant is used to determine the keysize of the encryption algorithm.
        private const int keysize = 256;

        public static void bitacorear(string laClase, string elMetodo, Int16 tipo, int errorId,string descripcion, string request, string response) {
			try
			{
				conexionbdDataContext miLinq = new conexionbdDataContext(connection);
				//miLinq.SP_INSERTAR_BITACORA(laClase,elMetodo,tipo,errorId,descripcion,request,response);
			}
			catch {
				string rutaArchivo = "miLog.txt";
				string texto = "NO SE PUDO BITACOREAR EN BD EL MENSAJE DE ERROR FUE:" + descripcion + "--> CLASE:" + laClase + " METODO: " + elMetodo + " TIPO: " + tipo + " ERRORID: " + errorId.ToString() + " DESCRIPCION " + descripcion + " REQ: " + request + " RES " + response + " FECHA: " + DateTime.Now.ToString();
				File.AppendAllText(rutaArchivo, texto + Environment.NewLine);
			}

		}

        public static string Encrypt(string plainText, string passPhrase)
        {
            byte[] plainTextBytes = Encoding.UTF8.GetBytes(plainText);
            using (PasswordDeriveBytes password = new PasswordDeriveBytes(passPhrase, null))
            {
                byte[] keyBytes = password.GetBytes(keysize / 8);
                using (RijndaelManaged symmetricKey = new RijndaelManaged())
                {
                    symmetricKey.Mode = CipherMode.CBC;
                    using (ICryptoTransform encryptor = symmetricKey.CreateEncryptor(keyBytes, initVectorBytes))
                    {
                        using (MemoryStream memoryStream = new MemoryStream())
                        {
                            using (CryptoStream cryptoStream = new CryptoStream(memoryStream, encryptor, CryptoStreamMode.Write))
                            {
                                cryptoStream.Write(plainTextBytes, 0, plainTextBytes.Length);
                                cryptoStream.FlushFinalBlock();
                                byte[] cipherTextBytes = memoryStream.ToArray();
                                string ncryptedText = Convert.ToBase64String(cipherTextBytes);
                                return ncryptedText.Substring(0, ncryptedText.Length - 2);
                            }
                        }
                    }
                }
            }
        }

        public static void enviarCorreoElectronico(string elMailDeEnvio, string strDeVerificacion)
        {
            using (MailMessage correo = new MailMessage())
            {
                correo.From = new MailAddress("villalobos.andrade.axel@gmail.com");
                correo.To.Add(elMailDeEnvio);
                correo.Subject = "Confirmación de cuenta";

                string htmlBody = @"
                                <!DOCTYPE html>
                                <html>
                                <head>
                                     <style>
                                body {
                                    font-family: Arial, sans-serif;
                                    background-color: #f0f0f0;
                                    padding: 30px;
                                }

                                .container {
                                    background-color: white;
                                    max-width: 600px;
                                    margin: 0 auto;
                                    padding: 20px;
                                    border-radius: 5px;
                                    box-shadow: 0px 0px 5px rgba(0,0,0,0.1);
                                }

                                h2 {
                                    color: #4caf50;
                                    margin-bottom: 20px;
                                }

                                p {
                                    font-size: 16px;
                                    line-height: 1.5;
                                    color: #333;
                                }

                                .button {
                                    display: inline-block;
                                    padding: 10px 20px;
                                    text-align: center;
                                    text-decoration: none;
                                    font-size: 18px;
                                    border-radius: 5px;
                                    background-color: #4caf50;
                                    color: white;
                                    font-weight: bold;
                                }
                            </style>
                                </head>
                                <body>
                                        <div class=""container"">
                                <h2>Bienvenido</h2>
                                <p>Por motivos de protección de su cuenta, le solicitamos que confirme esta dirección de correo electrónico.</p>
                                <p>Haga clic en el botón de abajo para confirmar su dirección de correo electrónico:</p>
                                 <a href=""http://localhost:3000/verify-email/{EMAIL}/{CODE}"" class=""button"">Confirmar dirección de correo electrónico</a>
                                <p>Gracias,</p>
                                <p>El equipo de desarrollo</p>
                            </div>
                                </body>
                                </html>";

                htmlBody = htmlBody.Replace("{EMAIL}", elMailDeEnvio);
                htmlBody = htmlBody.Replace("{CODE}", strDeVerificacion);

                correo.Body = htmlBody;
                correo.IsBodyHtml = true;
                correo.Priority = MailPriority.Normal;

                using (SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587))
                {
                    smtp.Credentials = new NetworkCredential("villalobos.andrade.axel@gmail.com", "alugkeplsmghhluk");
                    smtp.EnableSsl = true;

                    smtp.Send(correo);
                }
            }

        }

    }
}