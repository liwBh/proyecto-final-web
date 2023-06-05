CREATE PROCEDURE dbo.SP_INGRESAR_COMPOSICION
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
