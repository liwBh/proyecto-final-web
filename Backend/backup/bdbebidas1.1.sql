USE [bdbebidas]
GO
/****** Object:  Table [dbo].[tbbebida]    Script Date: 7/6/2023 19:59:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbbebida](
	[bebidaid] [bigint] IDENTITY(1,1) NOT NULL,
	[bebidanombre] [nvarchar](50) NOT NULL,
	[bebidapreparacion] [nvarchar](200) NOT NULL,
	[bebidatipoalcohol] [varchar](100) NOT NULL,
	[bebidavasoid] [bigint] NOT NULL,
	[bebidacategoriaid] [bigint] NOT NULL,
 CONSTRAINT [Pk_bebida] PRIMARY KEY CLUSTERED 
(
	[bebidaid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbcategoria]    Script Date: 7/6/2023 19:59:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbcategoria](
	[categoriaid] [bigint] IDENTITY(1,1) NOT NULL,
	[çategorianombre] [nvarchar](50) NOT NULL,
 CONSTRAINT [Pk_categoria] PRIMARY KEY CLUSTERED 
(
	[categoriaid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbcomposicion]    Script Date: 7/6/2023 19:59:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbcomposicion](
	[composicionid] [bigint] IDENTITY(1,1) NOT NULL,
	[composicionbebidaid] [bigint] NOT NULL,
	[composicioningredienteid] [bigint] NOT NULL,
 CONSTRAINT [Pk_composicion] PRIMARY KEY CLUSTERED 
(
	[composicionid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbfavorito]    Script Date: 7/6/2023 19:59:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbfavorito](
	[favoritoid] [bigint] NOT NULL,
	[favoritousuarioid] [bigint] NOT NULL,
	[favoritobebidaid] [bigint] NOT NULL,
 CONSTRAINT [Pk_favorito] PRIMARY KEY CLUSTERED 
(
	[favoritoid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbingrediente]    Script Date: 7/6/2023 19:59:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbingrediente](
	[ingredienteid] [bigint] IDENTITY(1,1) NOT NULL,
	[ingredientenombre] [nvarchar](50) NOT NULL,
 CONSTRAINT [Pk_ingrediente] PRIMARY KEY CLUSTERED 
(
	[ingredienteid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbmedida]    Script Date: 7/6/2023 19:59:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbmedida](
	[medidaid] [bigint] IDENTITY(1,1) NOT NULL,
	[medidacantidad] [varchar](10) NOT NULL,
 CONSTRAINT [Pk_medida] PRIMARY KEY CLUSTERED 
(
	[medidaid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbsesion]    Script Date: 7/6/2023 19:59:16 ******/
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
/****** Object:  Table [dbo].[tbusuario]    Script Date: 7/6/2023 19:59:16 ******/
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
/****** Object:  Table [dbo].[tbutiliza]    Script Date: 7/6/2023 19:59:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbutiliza](
	[utilizaid] [bigint] IDENTITY(1,1) NOT NULL,
	[utilizaingredienteid] [bigint] NOT NULL,
	[utilizamedidaid] [bigint] NOT NULL,
 CONSTRAINT [Pk_utiliza] PRIMARY KEY CLUSTERED 
(
	[utilizaid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbvaso]    Script Date: 7/6/2023 19:59:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbvaso](
	[vasoid] [bigint] IDENTITY(1,1) NOT NULL,
	[vasonombre] [nvarchar](50) NOT NULL,
 CONSTRAINT [Pk_vaso] PRIMARY KEY CLUSTERED 
(
	[vasoid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[tbbebida]  WITH CHECK ADD  CONSTRAINT [Fk_categoria] FOREIGN KEY([bebidacategoriaid])
REFERENCES [dbo].[tbcategoria] ([categoriaid])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[tbbebida] CHECK CONSTRAINT [Fk_categoria]
GO
ALTER TABLE [dbo].[tbbebida]  WITH CHECK ADD  CONSTRAINT [Fk_vaso] FOREIGN KEY([bebidavasoid])
REFERENCES [dbo].[tbvaso] ([vasoid])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[tbbebida] CHECK CONSTRAINT [Fk_vaso]
GO
ALTER TABLE [dbo].[tbcomposicion]  WITH CHECK ADD  CONSTRAINT [Fk_bebid] FOREIGN KEY([composicionbebidaid])
REFERENCES [dbo].[tbbebida] ([bebidaid])
GO
ALTER TABLE [dbo].[tbcomposicion] CHECK CONSTRAINT [Fk_bebid]
GO
ALTER TABLE [dbo].[tbcomposicion]  WITH CHECK ADD  CONSTRAINT [Fk_ingrediente] FOREIGN KEY([composicioningredienteid])
REFERENCES [dbo].[tbingrediente] ([ingredienteid])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[tbcomposicion] CHECK CONSTRAINT [Fk_ingrediente]
GO
ALTER TABLE [dbo].[tbfavorito]  WITH CHECK ADD  CONSTRAINT [Fk_bebi] FOREIGN KEY([favoritobebidaid])
REFERENCES [dbo].[tbbebida] ([bebidaid])
GO
ALTER TABLE [dbo].[tbfavorito] CHECK CONSTRAINT [Fk_bebi]
GO
ALTER TABLE [dbo].[tbfavorito]  WITH CHECK ADD  CONSTRAINT [Fk_usuari] FOREIGN KEY([favoritousuarioid])
REFERENCES [dbo].[tbusuario] ([usuarioid])
GO
ALTER TABLE [dbo].[tbfavorito] CHECK CONSTRAINT [Fk_usuari]
GO
ALTER TABLE [dbo].[tbsesion]  WITH CHECK ADD  CONSTRAINT [Fk_usuarios] FOREIGN KEY([sesionusuarioid])
REFERENCES [dbo].[tbusuario] ([usuarioid])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[tbsesion] CHECK CONSTRAINT [Fk_usuarios]
GO
ALTER TABLE [dbo].[tbutiliza]  WITH CHECK ADD  CONSTRAINT [Fk_ingredient] FOREIGN KEY([utilizaingredienteid])
REFERENCES [dbo].[tbingrediente] ([ingredienteid])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[tbutiliza] CHECK CONSTRAINT [Fk_ingredient]
GO
ALTER TABLE [dbo].[tbutiliza]  WITH CHECK ADD  CONSTRAINT [Fk_medida] FOREIGN KEY([utilizamedidaid])
REFERENCES [dbo].[tbmedida] ([medidaid])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[tbutiliza] CHECK CONSTRAINT [Fk_medida]
GO
/****** Object:  StoredProcedure [dbo].[SP_ABRIR_SESION]    Script Date: 7/6/2023 19:59:16 ******/
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
/****** Object:  StoredProcedure [dbo].[SP_ACTIVAR_USUARIO]    Script Date: 7/6/2023 19:59:16 ******/
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
/****** Object:  StoredProcedure [dbo].[SP_ACTUALIZAR_BEBIDA]    Script Date: 7/6/2023 19:59:16 ******/
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
	@VASO_ID bigint,
	@CATEGORIA_ID bigint,
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
			bebidatipoalcohol = @TIPO_ALCOHOL,
			bebidavasoid = @VASO_ID,
			bebidacategoriaid = @CATEGORIA_ID
		WHERE
			bebidaid = @ID;

		SET @ERROR_ID = 0;
		SET @ERROR_DESCRIPCION = '';
	END TRY
	
	BEGIN CATCH
		SET @ERROR_ID = ERROR_NUMBER();
		SET @ERROR_DESCRIPCION = ERROR_MESSAGE();
	END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[SP_ACTUALIZAR_INGREDIENTE]    Script Date: 7/6/2023 19:59:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_ACTUALIZAR_INGREDIENTE]
(
	@INGREDIENTEID bigint,
	@NOMBRE nvarchar(50),
	@ERROR_ID int output,
	@ERROR_DESCRIPCION nvarchar(max) output
)
AS
BEGIN
	BEGIN TRY
		UPDATE tbingrediente
		SET ingredientenombre = @NOMBRE
		WHERE ingredienteid = @INGREDIENTEID;

		SET @ERROR_ID = 0;
		SET @ERROR_DESCRIPCION = '';
	END TRY
	
	BEGIN CATCH
		SET @ERROR_ID = ERROR_NUMBER();
		SET @ERROR_DESCRIPCION = ERROR_MESSAGE();
	END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[SP_ACTUALIZAR_USUARIO]    Script Date: 7/6/2023 19:59:16 ******/
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
/****** Object:  StoredProcedure [dbo].[SP_AGREGAR_FAVORITO]    Script Date: 7/6/2023 19:59:16 ******/
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
/****** Object:  StoredProcedure [dbo].[SP_CERRAR_SESION]    Script Date: 7/6/2023 19:59:16 ******/
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
/****** Object:  StoredProcedure [dbo].[SP_ELIMINAR_BEBIDA]    Script Date: 7/6/2023 19:59:16 ******/
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
/****** Object:  StoredProcedure [dbo].[SP_ELIMINAR_FAVORITO]    Script Date: 7/6/2023 19:59:16 ******/
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
/****** Object:  StoredProcedure [dbo].[SP_ELIMINAR_INGREDIENTE]    Script Date: 7/6/2023 19:59:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_ELIMINAR_INGREDIENTE]
(
	@INGREDIENTEID bigint,
	@ERROR_ID int output,
	@ERROR_DESCRIPCION nvarchar(max) output
)
AS
BEGIN
	BEGIN TRY
		DELETE FROM tbingrediente
		WHERE ingredienteid = @INGREDIENTEID;

		SET @ERROR_ID = 0;
		SET @ERROR_DESCRIPCION = '';
	END TRY
	
	BEGIN CATCH
		SET @ERROR_ID = ERROR_NUMBER();
		SET @ERROR_DESCRIPCION = ERROR_MESSAGE();
	END CATCH
END

GO
/****** Object:  StoredProcedure [dbo].[SP_ELIMINAR_USUARIO]    Script Date: 7/6/2023 19:59:16 ******/
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
/****** Object:  StoredProcedure [dbo].[SP_INGRESAR_COMPOSICION]    Script Date: 7/6/2023 19:59:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_INGRESAR_COMPOSICION]
(
	@BEBIDAID bigint,
	@INGREDIENTEID bigint,
	@COMPOSICIONID bigint output,
	@ERRORID int output,
	@ERRORDESCRIPCION nvarchar(max) output
)
AS
BEGIN
	BEGIN TRY
		-- Verificar si la bebida y el ingrediente existen
		IF EXISTS (
			SELECT 1
			FROM tbbebida
			WHERE bebidaid = @BEBIDAID
		) AND EXISTS (
			SELECT 1
			FROM tbingrediente
			WHERE ingredienteid = @INGREDIENTEID
		)
		BEGIN
			-- Insertar la composición de bebida e ingrediente
			INSERT INTO tbcomposicion
			(
				composicionbebidaid,
				composicioningredienteid
			)
			VALUES
			(
				@BEBIDAID,
				@INGREDIENTEID
			);

			SET @COMPOSICIONID = SCOPE_IDENTITY();
			SET @ERRORID = 0;
			SET @ERRORDESCRIPCION = '';
		END
		ELSE
		BEGIN
			SET @COMPOSICIONID = -1;
			SET @ERRORID = 1; -- Bebida o ingrediente no encontrado
			SET @ERRORDESCRIPCION = 'ERROR DESDE BD: BEBIDA O INGREDIENTE NO ENCONTRADO';
		END
	END TRY
	
	BEGIN CATCH
		SET @COMPOSICIONID = -1;
		SET @ERRORID = ERROR_NUMBER();
		SET @ERRORDESCRIPCION = ERROR_MESSAGE();
	END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[SP_INGRESAR_USUARIO]    Script Date: 7/6/2023 19:59:16 ******/
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
	@ID_RETURN bigint output,
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
/****** Object:  StoredProcedure [dbo].[SP_INSERTAR_BEBIDA]    Script Date: 7/6/2023 19:59:16 ******/
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
	@VASO_ID bigint,
	@CATEGORIA_ID bigint,
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
			bebidavasoid,
			bebidacategoriaid
		)
		VALUES
		(
			@NOMBRE,
			@PREPARACION,
			@TIPO_ALCOHOL,
			@VASO_ID,
			@CATEGORIA_ID
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
/****** Object:  StoredProcedure [dbo].[SP_INSERTAR_INGREDIENTE]    Script Date: 7/6/2023 19:59:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_INSERTAR_INGREDIENTE]
(
	@NOMBRE nvarchar(50),
	@INGREDIENTEID bigint output,
	@ERROR_ID int output,
	@ERROR_DESCRIPCION nvarchar(max) output
)
AS
BEGIN
	BEGIN TRY
		INSERT INTO tbingrediente (ingredientenombre)
		VALUES (@NOMBRE);

		SET @INGREDIENTEID = SCOPE_IDENTITY();
		SET @ERROR_ID = 0;
		SET @ERROR_DESCRIPCION = '';
	END TRY
	
	BEGIN CATCH
		SET @INGREDIENTEID = -1;
		SET @ERROR_ID = ERROR_NUMBER();
		SET @ERROR_DESCRIPCION = ERROR_MESSAGE();
	END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[SP_INSERTAR_UTILIZA]    Script Date: 7/6/2023 19:59:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_INSERTAR_UTILIZA]
(
	@INGREDIENTEID bigint,
	@MEDIDAID bigint,
	@UTILIZAID bigint output,
	@ERROR_ID int output,
	@ERROR_DESCRIPCION nvarchar(max) output
)
AS
BEGIN
	BEGIN TRY
		INSERT INTO tbutiliza (utilizaingredienteid, utilizamedidaid)
		VALUES (@INGREDIENTEID, @MEDIDAID);

		SET @UTILIZAID = SCOPE_IDENTITY();
		SET @ERROR_ID = 0;
		SET @ERROR_DESCRIPCION = '';
	END TRY
	
	BEGIN CATCH
		SET @UTILIZAID = -1;
		SET @ERROR_ID = ERROR_NUMBER();
		SET @ERROR_DESCRIPCION = ERROR_MESSAGE();
	END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[sp_Login]    Script Date: 7/6/2023 19:59:16 ******/
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
/****** Object:  StoredProcedure [dbo].[SP_OBTENER_INGREDIENTE_ID]    Script Date: 7/6/2023 19:59:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_OBTENER_INGREDIENTE_ID]
    @Id bigint
AS
BEGIN
    SELECT *
    FROM tbingrediente
    WHERE ingredienteid = @Id;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_OBTENER_INGREDIENTES]    Script Date: 7/6/2023 19:59:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_OBTENER_INGREDIENTES]
AS
BEGIN
    SELECT *
    FROM tbingrediente;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_OBTENER_MEDIDAS_POR_INGREDIENTE]    Script Date: 7/6/2023 19:59:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_OBTENER_MEDIDAS_POR_INGREDIENTE]
(
    @INGREDIENTEID bigint
)
AS
BEGIN
    BEGIN TRY
        SELECT m.medidaid, m.medidacantidad
        FROM tbutiliza u
        INNER JOIN tbmedida m ON u.utilizamedidaid = m.medidaid
        WHERE u.utilizaingredienteid = @INGREDIENTEID;
    END TRY

    BEGIN CATCH
        -- Manejo de errores
        THROW;
    END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[SP_OBTENER_TODAS_BEBIDAS]    Script Date: 7/6/2023 19:59:16 ******/
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
			bebidaid,
			bebidanombre,
			bebidapreparacion,
			bebidatipoalcohol,
			bebidavasoid,
			bebidacategoriaid
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
