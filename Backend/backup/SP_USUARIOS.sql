CREATE PROCEDURE dbo.SP_INGRESAR_USUARIO
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


-------------------------------------------------------------------------------------------
CREATE PROCEDURE dbo.SP_ACTUALIZAR_USUARIO
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

----------------------------------------------------------------------------------

CREATE PROCEDURE dbo.SP_ELIMINAR_USUARIO
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

--------------------------------------------------------------------------
CREATE PROCEDURE dbo.SP_ACTIVAR_USUARIO
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

----------------------------------------------------------------------------------------------------
CREATE PROCEDURE dbo.sp_Login
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
