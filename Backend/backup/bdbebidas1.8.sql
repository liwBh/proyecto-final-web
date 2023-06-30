USE [master]
GO
/****** Object:  Database [bdbebidas]    Script Date: 29/06/2023 11:14:46 p. m. ******/
CREATE DATABASE [bdbebidas]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'bdbebidas', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS03\MSSQL\DATA\bdbebidas.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'bdbebidas_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS03\MSSQL\DATA\bdbebidas_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [bdbebidas] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [bdbebidas].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [bdbebidas] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [bdbebidas] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [bdbebidas] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [bdbebidas] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [bdbebidas] SET ARITHABORT OFF 
GO
ALTER DATABASE [bdbebidas] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [bdbebidas] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [bdbebidas] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [bdbebidas] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [bdbebidas] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [bdbebidas] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [bdbebidas] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [bdbebidas] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [bdbebidas] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [bdbebidas] SET  DISABLE_BROKER 
GO
ALTER DATABASE [bdbebidas] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [bdbebidas] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [bdbebidas] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [bdbebidas] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [bdbebidas] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [bdbebidas] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [bdbebidas] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [bdbebidas] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [bdbebidas] SET  MULTI_USER 
GO
ALTER DATABASE [bdbebidas] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [bdbebidas] SET DB_CHAINING OFF 
GO
ALTER DATABASE [bdbebidas] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [bdbebidas] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [bdbebidas] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [bdbebidas] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [bdbebidas] SET QUERY_STORE = OFF
GO
USE [bdbebidas]
GO
/****** Object:  Table [dbo].[tbbebida]    Script Date: 29/06/2023 11:14:46 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbbebida](
	[bebidaid] [bigint] IDENTITY(1,1) NOT NULL,
	[bebidanombre] [nvarchar](50) NOT NULL,
	[bebidapreparacion] [nvarchar](200) NOT NULL,
	[bebidaimgruta] [nvarchar](255) NOT NULL,
	[bebidatipoalcohol] [varchar](100) NOT NULL,
	[bebidavaso] [varchar](50) NOT NULL,
	[bebidacategoria] [varchar](50) NOT NULL,
	[bebidaingredientes] [varchar](255) NOT NULL,
	[bebidamedidas] [varchar](255) NOT NULL,
	[bebidausuarioid] [bigint] NOT NULL,
 CONSTRAINT [Pk_bebida] PRIMARY KEY CLUSTERED 
(
	[bebidaid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbfavorito]    Script Date: 29/06/2023 11:14:46 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbfavorito](
	[favoritoid] [bigint] IDENTITY(1,1) NOT NULL,
	[favoritousuarioid] [bigint] NOT NULL,
	[favoritobebidaid] [bigint] NOT NULL,
 CONSTRAINT [Pk_favorito] PRIMARY KEY CLUSTERED 
(
	[favoritoid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbsesion]    Script Date: 29/06/2023 11:14:46 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbsesion](
	[sesionid] [bigint] IDENTITY(1,1) NOT NULL,
	[sesionusuarioid] [bigint] NOT NULL,
	[sesionorigen] [nvarchar](max) NOT NULL,
	[sesionfechainicio] [datetime] NOT NULL,
	[sesionfechafinal] [datetime] NOT NULL,
	[sesionestado] [int] NOT NULL,
	[sesionfechaactualizacion] [datetime] NOT NULL,
 CONSTRAINT [Pk_sesion] PRIMARY KEY CLUSTERED 
(
	[sesionid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbusuario]    Script Date: 29/06/2023 11:14:46 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbusuario](
	[usuarioid] [bigint] IDENTITY(1,1) NOT NULL,
	[usuarionombre] [nvarchar](50) NOT NULL,
	[usuarioapellidos] [nvarchar](50) NOT NULL,
	[usuariocorreo] [nvarchar](50) NOT NULL,
	[usuariopassword] [nvarchar](max) NOT NULL,
	[usuariofecharegistro] [datetime] NOT NULL,
	[usuarionumeroverificacion] [nvarchar](max) NOT NULL,
	[usuarioestado] [int] NOT NULL,
 CONSTRAINT [PK_tbusuario] PRIMARY KEY CLUSTERED 
(
	[usuarioid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[tbbebida] ON 
GO
INSERT [dbo].[tbbebida] ([bebidaid], [bebidanombre], [bebidapreparacion], [bebidaimgruta], [bebidatipoalcohol], [bebidavaso], [bebidacategoria], [bebidaingredientes], [bebidamedidas], [bebidausuarioid]) VALUES (1, N'Cucaracha', N'Se mezcla todo en el recipiente y se enciende el trago', N'https://localhost:44328/images/Cucaracha.jpg', N'Alcoholic', N'Shot glass', N'Shot', N'Tequila-Peach Vodka-Whiskey', N'8 Ounce (oz)-3 Ounce (oz)-3 Ounce (oz)', 1)
GO
INSERT [dbo].[tbbebida] ([bebidaid], [bebidanombre], [bebidapreparacion], [bebidaimgruta], [bebidatipoalcohol], [bebidavaso], [bebidacategoria], [bebidaingredientes], [bebidamedidas], [bebidausuarioid]) VALUES (2, N'Mamadita', N'Se mezclan los ingredientes y se agrega crema chantilly', N'https://localhost:44328/images/square.jpg', N'Alcoholic', N'Shot glass', N'Shot', N'Tequila-Amaretto-Brandy', N'3 Ounce (oz)-4 Ounce (oz)-4 Ounce (oz)', 1)
GO
INSERT [dbo].[tbbebida] ([bebidaid], [bebidanombre], [bebidapreparacion], [bebidaimgruta], [bebidatipoalcohol], [bebidavaso], [bebidacategoria], [bebidaingredientes], [bebidamedidas], [bebidausuarioid]) VALUES (3, N'Pitufo', N'Se agrega al vaso el vodka, luego el strawberrie azul, luego agrega el jugo de limon y por ultimo agrega el peach vodka, decora con limon y hierbabuena', N'https://localhost:44328/images/pitufo.jpg', N'Alcoholic', N'Whiskey Glass', N'Cocktail', N'Vodka-Strawberries-Lime juice-Peach Vodka', N'4 Ounce (oz)-3 Ounce (oz)-3 Ounce (oz)-2 Ounce (oz)', 1)
GO
INSERT [dbo].[tbbebida] ([bebidaid], [bebidanombre], [bebidapreparacion], [bebidaimgruta], [bebidatipoalcohol], [bebidavaso], [bebidacategoria], [bebidaingredientes], [bebidamedidas], [bebidausuarioid]) VALUES (4, N'Caipiriña', N'Se mezclan los ingredientes , se agrega hielo y se decora con limon', N'https://localhost:44328/images/caipirinha.jpg', N'Alcoholic', N'Whiskey Glass', N'Cocktail', N'Tequila-Lemon juice-Vodka', N'5 Ounce (oz)-4 Ounce (oz)-3 Ounce (oz)', 1)
GO
SET IDENTITY_INSERT [dbo].[tbbebida] OFF
GO
SET IDENTITY_INSERT [dbo].[tbfavorito] ON 
GO
INSERT [dbo].[tbfavorito] ([favoritoid], [favoritousuarioid], [favoritobebidaid]) VALUES (1, 1, 2)
GO
SET IDENTITY_INSERT [dbo].[tbfavorito] OFF
GO
SET IDENTITY_INSERT [dbo].[tbusuario] ON 
GO
INSERT [dbo].[tbusuario] ([usuarioid], [usuarionombre], [usuarioapellidos], [usuariocorreo], [usuariopassword], [usuariofecharegistro], [usuarionumeroverificacion], [usuarioestado]) VALUES (1, N'Mary', N'Zambrana', N'maryzambrana98@gmail.com', N'fIalgOIOL1f8T45AtDL2jA', CAST(N'2023-06-30T04:46:56.727' AS DateTime), N'YpFT15k2GVQzGUCnM6RLhw', 1)
GO
SET IDENTITY_INSERT [dbo].[tbusuario] OFF
GO
ALTER TABLE [dbo].[tbbebida]  WITH CHECK ADD  CONSTRAINT [Fk_bebida_usuario] FOREIGN KEY([bebidaid])
REFERENCES [dbo].[tbbebida] ([bebidaid])
GO
ALTER TABLE [dbo].[tbbebida] CHECK CONSTRAINT [Fk_bebida_usuario]
GO
ALTER TABLE [dbo].[tbfavorito]  WITH CHECK ADD  CONSTRAINT [Fk_bebi] FOREIGN KEY([favoritobebidaid])
REFERENCES [dbo].[tbbebida] ([bebidaid])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[tbfavorito] CHECK CONSTRAINT [Fk_bebi]
GO
ALTER TABLE [dbo].[tbfavorito]  WITH CHECK ADD  CONSTRAINT [Fk_usuari] FOREIGN KEY([favoritousuarioid])
REFERENCES [dbo].[tbusuario] ([usuarioid])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[tbfavorito] CHECK CONSTRAINT [Fk_usuari]
GO
ALTER TABLE [dbo].[tbsesion]  WITH CHECK ADD  CONSTRAINT [Fk_usuarios] FOREIGN KEY([sesionusuarioid])
REFERENCES [dbo].[tbusuario] ([usuarioid])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[tbsesion] CHECK CONSTRAINT [Fk_usuarios]
GO
/****** Object:  StoredProcedure [dbo].[SP_ABRIR_SESION]    Script Date: 29/06/2023 11:14:46 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

--------------------------------------------------------------------------------
CREATE PROCEDURE [dbo].[SP_ABRIR_SESION]
(
	@SESION nvarchar(max),
	@USUARIO BIGINT,
	@ORIGEN nvarchar(max),
	@IDRETURN int output,
	@ERRORID int output,
	@ERRORDESCRIPCION nvarchar(max) output
)
AS
BEGIN
	BEGIN TRY
		INSERT INTO tbsesion 
		(
			sesionusuarioid,
			sesionorigen,
			sesionfechainicio,
			sesionfechafinal,
			sesionestado,
			sesionfechaactualizacion
		)
		VALUES
		(
			@USUARIO,
			@ORIGEN,
			GETUTCDATE(),
			GETUTCDATE(),
			1,
			GETUTCDATE()
		);

		SET @IDRETURN = SCOPE_IDENTITY();
		SET @ERRORID = 0;
		SET @ERRORDESCRIPCION = '';
	END TRY
	
	BEGIN CATCH
		SET @IDRETURN = -1;
		SET @ERRORID = ERROR_NUMBER();
		SET @ERRORDESCRIPCION = ERROR_MESSAGE();
	END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[SP_ACTIVAR_USUARIO]    Script Date: 29/06/2023 11:14:46 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

--------------------------------------------------------------------------
CREATE PROCEDURE [dbo].[SP_ACTIVAR_USUARIO]
(
	@CORREO_ELECTRONICO nvarchar(max),
	@NUMEROVERIFICACION nvarchar(max),
	@IDRETURN int OUTPUT,
	@ERRORID int OUTPUT,
	@ERRORDESCRIPCION nvarchar(max) OUTPUT,
	@FILASACTUALIZADAS int OUTPUT
)
AS
BEGIN
	BEGIN TRY
		IF NOT EXISTS (SELECT * FROM tbusuario WHERE usuariocorreo = @CORREO_ELECTRONICO AND usuarionumeroverificacion = @NUMEROVERIFICACION AND usuarioestado = 0) --¿el correo está registrada?
		BEGIN
			SET @IDRETURN = -1;
			SET @ERRORID = 1; --correo ya registrada
			SET @ERRORDESCRIPCION = 'USUARIO YA VERIFICADO O NO EXISTENTE';
		END
		ELSE
		BEGIN
			UPDATE tbusuario
			SET
				usuarioestado = 1
			WHERE
				usuariocorreo = @CORREO_ELECTRONICO
				AND usuarionumeroverificacion = @NUMEROVERIFICACION
				AND usuarioestado = 0;

			SET @FILASACTUALIZADAS = @@ROWCOUNT;
		END
	END TRY
	
	BEGIN CATCH
		SET @IDRETURN = -1;
		SET @ERRORID = ERROR_NUMBER();
		SET @ERRORDESCRIPCION = ERROR_MESSAGE();
	END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[SP_ACTUALIZAR_BEBIDA]    Script Date: 29/06/2023 11:14:46 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-----------------------------------------------------------------------------------------------
CREATE PROCEDURE [dbo].[SP_ACTUALIZAR_BEBIDA]
(
	@ID bigint,
	@NOMBRE nvarchar(50),
	@PREPARACION nvarchar(200),
	@TIPO_ALCOHOL varchar(100),
	@RUTA varchar(255),
	@VASO varchar(50),
	@CATEGORIA varchar(50),
	@INGREDIENTES varchar(255),
	@MEDIDAS varchar(255),
	@USUARIOID int,
	@ERROR_ID int output,
	@ERROR_DESCRIPCION nvarchar(max) output
)
AS
BEGIN
	BEGIN TRY
		UPDATE tbbebida
		SET
			bebidanombre = @NOMBRE,
			bebidapreparacion = @PREPARACION,
			bebidaimgruta = @RUTA,
			bebidatipoalcohol = @TIPO_ALCOHOL,
			bebidavaso = @VASO,
			bebidacategoria = @CATEGORIA,
			bebidaingredientes = @INGREDIENTES,
			bebidamedidas = @MEDIDAS
		WHERE
			bebidaid = @ID AND bebidausuarioid = @USUARIOID

		SET @ERROR_ID = 0;
		SET @ERROR_DESCRIPCION = '';
	END TRY
	
	BEGIN CATCH
		SET @ERROR_ID = ERROR_NUMBER();
		SET @ERROR_DESCRIPCION = ERROR_MESSAGE();
	END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[SP_ACTUALIZAR_USUARIO]    Script Date: 29/06/2023 11:14:46 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-------------------------------------------------------------------------------------------
CREATE PROCEDURE [dbo].[SP_ACTUALIZAR_USUARIO]
(
	@ID int,
	@NOMBRE nvarchar(50),
	@APELLIDOS nvarchar(50),
	@CORREO_ELECTRONICO nvarchar(max),
	@PASSWORD nvarchar(max),
	@ERRORID int output,
	@ERRORDESCRIPCION nvarchar(max) output
)
AS
BEGIN
	BEGIN TRY
		IF EXISTS (SELECT * FROM tbusuario WHERE usuarioid = @ID)
		BEGIN
			IF EXISTS (SELECT * FROM tbusuario WHERE usuariocorreo = @CORREO_ELECTRONICO AND usuarioid != @ID)
			BEGIN
				SET @ERRORID = 2;
				SET @ERRORDESCRIPCION = 'ERROR DESDE BD: CORREO YA REGISTRADO PARA OTRO USUARIO';
			END
			ELSE
			BEGIN
				UPDATE tbusuario
				SET
					usuarionombre = @NOMBRE,
					usuarioapellidos = @APELLIDOS,
					usuariocorreo = @CORREO_ELECTRONICO,
					usuariopassword = @PASSWORD
				
				WHERE usuarioid = @ID;
			END
		END
		ELSE
		BEGIN
			SET @ERRORID = 1;
			SET @ERRORDESCRIPCION = 'ERROR DESDE BD: USUARIO NO ENCONTRADO';
		END
	END TRY
	
	BEGIN CATCH
		SET @ERRORID = ERROR_NUMBER();
		SET @ERRORDESCRIPCION = ERROR_MESSAGE();
	END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[SP_AGREGAR_FAVORITO]    Script Date: 29/06/2023 11:14:46 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_AGREGAR_FAVORITO]
(
	@USUARIO_ID bigint,
	@BEBIDA_ID bigint,
	@FAVORITO_ID bigint output,
	@ERROR_ID int output,
	@ERROR_DESCRIPCION nvarchar(max) output
)
AS
BEGIN
	BEGIN TRY
		INSERT INTO tbfavorito
		(
			favoritousuarioid,
			favoritobebidaid
		)
		VALUES
		(
			@USUARIO_ID,
			@BEBIDA_ID
		);

		SET @FAVORITO_ID = SCOPE_IDENTITY();
		SET @ERROR_ID = 0;
		SET @ERROR_DESCRIPCION = '';
	END TRY
	
	BEGIN CATCH
		SET @FAVORITO_ID = -1;
		SET @ERROR_ID = ERROR_NUMBER();
		SET @ERROR_DESCRIPCION = ERROR_MESSAGE();
	END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[SP_CERRAR_SESION]    Script Date: 29/06/2023 11:14:46 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



---------------------------------------------------------------------------------------------------
CREATE PROCEDURE [dbo].[SP_CERRAR_SESION]
(
	@SESION_ID bigint,
	@FECHA_FINAL datetime,
	@ERROR_ID int output,
	@ERROR_DESCRIPCION nvarchar(max) output
)
AS
BEGIN
	BEGIN TRY
		UPDATE tbsesion 
		SET
			sesionestado = 0,
			sesionfechafinal = @FECHA_FINAL,
			sesionfechaactualizacion = GETUTCDATE()
		WHERE
			sesionid = @SESION_ID;

		SET @ERROR_ID = 0;
		SET @ERROR_DESCRIPCION = '';
	END TRY
	
	BEGIN CATCH
		SET @ERROR_ID = ERROR_NUMBER();
		SET @ERROR_DESCRIPCION = ERROR_MESSAGE();
	END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[SP_ELIMINAR_BEBIDA]    Script Date: 29/06/2023 11:14:46 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-----------------------------------------------------------------------------------------------
CREATE PROCEDURE [dbo].[SP_ELIMINAR_BEBIDA]
(
	@ID bigint,
	@ERROR_ID int output,
	@ERROR_DESCRIPCION nvarchar(max) output
)
AS
BEGIN
	BEGIN TRY
		DELETE FROM tbbebida
		WHERE bebidaid = @ID;

		SET @ERROR_ID = 0;
		SET @ERROR_DESCRIPCION = '';
	END TRY
	
	BEGIN CATCH
		SET @ERROR_ID = ERROR_NUMBER();
		SET @ERROR_DESCRIPCION = ERROR_MESSAGE();
	END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[SP_ELIMINAR_FAVORITO]    Script Date: 29/06/2023 11:14:46 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

---------------------------------------------------------------------------------------
CREATE PROCEDURE [dbo].[SP_ELIMINAR_FAVORITO]
(
	@USUARIOID bigint,
	@BEBIDAID bigint,
	@ERRORID int output,
	@ERRORDESCRIPCION nvarchar(max) output
)
AS
BEGIN
	BEGIN TRY
		-- Verificar si la bebida existe en las favoritas del usuario
		IF EXISTS (
			SELECT 1
			FROM tbfavorito
			WHERE favoritousuarioid = @USUARIOID
			AND favoritobebidaid = @BEBIDAID
		)
		BEGIN
			-- Eliminar la bebida favorita del usuario
			DELETE FROM tbfavorito
			WHERE favoritousuarioid = @USUARIOID
			AND favoritobebidaid = @BEBIDAID

			SET @ERRORID = 0;
			SET @ERRORDESCRIPCION = '';
		END
		ELSE
		BEGIN
			SET @ERRORID = 1; -- Bebida no encontrada en las favoritas del usuario
			SET @ERRORDESCRIPCION = 'ERROR DESDE BD: BEBIDA NO ENCONTRADA EN LAS FAVORITAS DEL USUARIO';
		END
	END TRY
	
	BEGIN CATCH
		SET @ERRORID = ERROR_NUMBER();
		SET @ERRORDESCRIPCION = ERROR_MESSAGE();
	END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[SP_ELIMINAR_USUARIO]    Script Date: 29/06/2023 11:14:46 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

----------------------------------------------------------------------------------

CREATE PROCEDURE [dbo].[SP_ELIMINAR_USUARIO]
(
	@ID int,
	@ERRORID int output,
	@ERRORDESCRIPCION nvarchar(max) output
)
AS
BEGIN
	BEGIN TRY
		IF EXISTS (SELECT * FROM tbusuario WHERE usuarioid = @ID)
		BEGIN
			DELETE FROM tbusuario WHERE usuarioid = @ID;
		END
		ELSE
		BEGIN
			SET @ERRORID = 1;
			SET @ERRORDESCRIPCION = 'ERROR DESDE BD: USUARIO NO ENCONTRADO';
		END
	END TRY
	
	BEGIN CATCH
		SET @ERRORID = ERROR_NUMBER();
		SET @ERRORDESCRIPCION = ERROR_MESSAGE();
	END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[SP_INGRESAR_USUARIO]    Script Date: 29/06/2023 11:14:46 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_INGRESAR_USUARIO]
(
	@NOMBRE nvarchar(50),
	@APELLIDOS nvarchar(50),
	@CORREO_ELECTRONICO nvarchar(max),
	@PASSWORD nvarchar(max),
	@NUMERO_VERIFICACION nvarchar(max),
	@ID_RETURN int output,
	@ERROR_ID int output,
	@ERROR_DESCRIPCION nvarchar(max) output
)
AS
BEGIN
	BEGIN TRY
		IF EXISTS (SELECT * FROM tbusuario WHERE usuariocorreo = @CORREO_ELECTRONICO)
		BEGIN
			SET @ID_RETURN = -1;
			SET @ERROR_ID = 1;
			SET @ERROR_DESCRIPCION = 'ERROR DESDE BD: CORREO YA REGISTRADO';
		END
		ELSE
		BEGIN
			INSERT INTO tbusuario 
			(
				usuarionombre,
				usuarioapellidos,
				usuariocorreo,
				usuariopassword,
				usuariofecharegistro,
				usuarionumeroverificacion,
				usuarioestado
			)
			VALUES
			(
				@NOMBRE,
				@APELLIDOS,
				@CORREO_ELECTRONICO,
				@PASSWORD,
				GETUTCDATE(),
				@NUMERO_VERIFICACION,
				0
			);

			SET @ID_RETURN = SCOPE_IDENTITY();
		END
	END TRY
	
	BEGIN CATCH
		SET @ID_RETURN = -1;
		SET @ERROR_ID = ERROR_NUMBER();
		SET @ERROR_DESCRIPCION = ERROR_MESSAGE();
	END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[SP_INSERTAR_BEBIDA]    Script Date: 29/06/2023 11:14:46 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-----------------------------------------------------------------------------------------------
CREATE PROCEDURE [dbo].[SP_INSERTAR_BEBIDA]
(
	@NOMBRE nvarchar(50),
	@PREPARACION nvarchar(200),
	@TIPO_ALCOHOL varchar(100),
	@RUTA varchar(255),
	@VASO varchar(100),
	@CATEGORIA varchar(100),
	@INGREDIENTES varchar(255),
	@MEDIDAS varchar(255),
	@USUARIOID int,
	@ID_RETURN bigint output,
	@ERROR_ID int output,
	@ERROR_DESCRIPCION nvarchar(max) output
)
AS
BEGIN
	BEGIN TRY
		INSERT INTO tbbebida
		(
			bebidanombre,
			bebidapreparacion,
			bebidatipoalcohol,
			bebidaimgruta,
			bebidavaso,
			bebidacategoria,
			bebidaingredientes,
			bebidamedidas,
			bebidausuarioid
		)
		VALUES
		(
			@NOMBRE,
			@PREPARACION,
			@TIPO_ALCOHOL,
			@RUTA,
			@VASO,
			@CATEGORIA,
			@INGREDIENTES,
			@MEDIDAS,
			@USUARIOID
		);

		SET @ID_RETURN = SCOPE_IDENTITY();
		SET @ERROR_ID = 0;
		SET @ERROR_DESCRIPCION = '';
	END TRY
	
	BEGIN CATCH
		SET @ID_RETURN = -1;
		SET @ERROR_ID = ERROR_NUMBER();
		SET @ERROR_DESCRIPCION = ERROR_MESSAGE();
	END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[sp_Login]    Script Date: 29/06/2023 11:14:46 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

----------------------------------------------------------------------------------------------------
CREATE PROCEDURE [dbo].[sp_Login]
    @CORREO_ELECTRONICO nVARCHAR(50),
    @PASSWORD NVARCHAR(max),
    @id_usuario INT OUTPUT,
    @estado INT OUTPUT,
    @nombre NVARCHAR(50) OUTPUT,
    @apellidos NVARCHAR(50) OUTPUT
AS
BEGIN
    SET @id_usuario = 0;
    SET @estado = 0;
    SET @nombre = '';
    SET @apellidos = '';
    
    IF EXISTS (
        SELECT usuarioid, usuarioestado, usuarionombre, usuarioapellidos
        FROM tbusuario
        WHERE usuariocorreo = @CORREO_ELECTRONICO
            AND usuariopassword = @PASSWORD
    )
    BEGIN
        SELECT @id_usuario = usuarioid, @estado = usuarioestado, @nombre = usuarionombre, @apellidos = usuarioapellidos
        FROM tbusuario
        WHERE usuariocorreo = @CORREO_ELECTRONICO
            AND usuariopassword = @PASSWORD;
    END
END;
GO
/****** Object:  StoredProcedure [dbo].[SP_OBTENER_BEBIDAS]    Script Date: 29/06/2023 11:14:46 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_OBTENER_BEBIDAS]
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        b.bebidaid,
        b.bebidanombre,
        b.bebidapreparacion,
        b.bebidaimgruta,
        b.bebidatipoalcohol,
        b.bebidavaso,
        b.bebidacategoria,
        b.bebidaingredientes,
        b.bebidamedidas,
        b.bebidausuarioid,
        STRING_AGG(f.favoritousuarioid, ',') AS favoritosUsuarios
    FROM tbbebida b
    LEFT JOIN tbfavorito f ON b.bebidaid = f.favoritobebidaid
    GROUP BY
        b.bebidaid,
        b.bebidanombre,
        b.bebidapreparacion,
        b.bebidaimgruta,
        b.bebidatipoalcohol,
        b.bebidavaso,
        b.bebidacategoria,
        b.bebidaingredientes,
        b.bebidamedidas,
        b.bebidausuarioid;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_OBTENER_FAVORITOS_USUARIOS]    Script Date: 29/06/2023 11:14:46 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_OBTENER_FAVORITOS_USUARIOS]
    @usuarioId INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        b.bebidaid,
        b.bebidanombre,
        b.bebidapreparacion,
        b.bebidaimgruta,
        b.bebidatipoalcohol,
        b.bebidavaso,
        b.bebidacategoria,
        b.bebidaingredientes,
        b.bebidamedidas,
        b.bebidausuarioid
    FROM tbbebida b
    INNER JOIN tbfavorito f ON b.bebidaid = f.favoritobebidaid
    WHERE f.favoritousuarioid = @usuarioId;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_OBTENER_TODAS_BEBIDAS]    Script Date: 29/06/2023 11:14:46 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-----------------------------------------------------------------------------------------------
CREATE PROCEDURE [dbo].[SP_OBTENER_TODAS_BEBIDAS]
(
	@ERROR_ID int output,
	@ERROR_DESCRIPCION nvarchar(max) output
)
AS
BEGIN
	BEGIN TRY
		SELECT
			*
		FROM tbbebida;

		SET @ERROR_ID = 0;
		SET @ERROR_DESCRIPCION = '';
	END TRY
	
	BEGIN CATCH
		SET @ERROR_ID = ERROR_NUMBER();
		SET @ERROR_DESCRIPCION = ERROR_MESSAGE();
	END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[SP_VERIFICAR_FAVORITO]    Script Date: 29/06/2023 11:14:46 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_VERIFICAR_FAVORITO]
(
	@USUARIO_ID bigint,
	@BEBIDA_ID bigint,
	@RESULTADO int OUTPUT
)
AS
BEGIN
	BEGIN TRY
		IF EXISTS (
			SELECT 1
			FROM tbfavorito
			WHERE favoritousuarioid = @USUARIO_ID AND favoritobebidaid = @BEBIDA_ID
		)
		BEGIN
			-- La bebida ya está agregada como favorita
			DELETE FROM tbfavorito
			WHERE favoritousuarioid = @USUARIO_ID AND favoritobebidaid = @BEBIDA_ID

			SET @RESULTADO = 0; -- Eliminado de favoritos
		END
		ELSE
		BEGIN
			-- La bebida no está agregada como favorita
			INSERT INTO tbfavorito (favoritousuarioid, favoritobebidaid)
			VALUES (@USUARIO_ID, @BEBIDA_ID)

			SET @RESULTADO = 1; -- Agregado a favoritos
		END
	END TRY
	
	BEGIN CATCH
		SET @RESULTADO = -1; -- Error
	END CATCH
END
GO
USE [master]
GO
ALTER DATABASE [bdbebidas] SET  READ_WRITE 
GO
