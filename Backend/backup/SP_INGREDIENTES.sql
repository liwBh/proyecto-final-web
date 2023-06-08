---------------------------------------------------------------------
CREATE PROCEDURE dbo.SP_INSERTAR_INGREDIENTE
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

---------------------------------------------------------------------
CREATE PROCEDURE dbo.SP_ACTUALIZAR_INGREDIENTE
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

---------------------------------------------------------------------
CREATE PROCEDURE dbo.SP_ELIMINAR_INGREDIENTE
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


---------------------------------------------------------------------
CREATE PROCEDURE SP_OBTENER_INGREDIENTE_ID
    @Id bigint
AS
BEGIN
    SELECT *
    FROM tbingrediente
    WHERE ingredienteid = @Id;
END


---------------------------------------------------------------------
CREATE PROCEDURE SP_OBTENER_INGREDIENTES
AS
BEGIN
    SELECT *
    FROM tbingrediente;
END

---------------------------------------------------------------------

