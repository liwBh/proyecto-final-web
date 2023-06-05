CREATE PROCEDURE dbo.SP_INSERTAR_UTILIZA
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

-------------------------------------------------------------------------
CREATE PROCEDURE dbo.SP_OBTENER_MEDIDAS_POR_INGREDIENTE
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


----------------------------------------