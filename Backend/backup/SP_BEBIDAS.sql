-----------------------------------------------------------------------------------------------
CREATE PROCEDURE dbo.SP_INSERTAR_BEBIDA
(
	@NOMBRE nvarchar(50),
	@PREPARACION nvarchar(200),
	@TIPO_ALCOHOL varchar(100),
	@VASO_ID bigint,
	@CATEGORIA_ID bigint,
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
			bebidavasoid,
			bebidacategoriaid,
			bebidausuarioid
		)
		VALUES
		(
			@NOMBRE,
			@PREPARACION,
			@TIPO_ALCOHOL,
			@VASO_ID,
			@CATEGORIA_ID,
			@USUARIOID,
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

-----------------------------------------------------------------------------------------------
CREATE PROCEDURE dbo.SP_ACTUALIZAR_BEBIDA
(
	@ID bigint,
	@NOMBRE nvarchar(50),
	@PREPARACION nvarchar(200),
	@TIPO_ALCOHOL varchar(100),
	@VASO_ID bigint,
	@CATEGORIA_ID bigint,
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
			bebidatipoalcohol = @TIPO_ALCOHOL,
			bebidavasoid = @VASO_ID,
			bebidacategoriaid = @CATEGORIA_ID
		WHERE
			bebidaid = @ID AND bebidausuarioid = @USUARIOID;

		SET @ERROR_ID = 0;
		SET @ERROR_DESCRIPCION = '';
	END TRY
	
	BEGIN CATCH
		SET @ERROR_ID = ERROR_NUMBER();
		SET @ERROR_DESCRIPCION = ERROR_MESSAGE();
	END CATCH
END
GO


-----------------------------------------------------------------------------------------------
CREATE PROCEDURE dbo.SP_OBTENER_TODAS_BEBIDAS
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
			bebidacategoriaid,
			bebidausuarioid
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


-----------------------------------------------------------------------------------------------
CREATE PROCEDURE dbo.SP_ELIMINAR_BEBIDA
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
-----------------------------------------------------------------------------------------------

