CREATE PROCEDURE dbo.SP_AGREGAR_FAVORITO
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

---------------------------------------------------------------------------------------
CREATE PROCEDURE dbo.SP_ELIMINAR_FAVORITO
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

---------------------------------------------------------------------------------------

CREATE PROCEDURE [dbo].[SP_VERIFICAR_FAVORITO]
    @usuarioid bigint,
    @bebidaid bigint,
    @IsFavorite int OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS (
        SELECT 1
        FROM tbfavorito
        WHERE favoritousuarioid = @usuarioid
            AND favoritobebidaid = @bebidaid
    )
    BEGIN
       
        SET @IsFavorite = 1;
    END
    ELSE
    BEGIN    
        SET @IsFavorite = 0;
    END
END

------------------------------------------------------------------------------------------
Fecha de creación: 23-06-2023

CREATE PROCEDURE SP_OBTENER_FAVORITOS_USUARIO
    @usuarioid bigint
AS
BEGIN
    SELECT b.bebidaid as id, b.bebidanombre as nombre, b.bebidapreparacion as preparacion, b.bebidatipoalcohol as tipoalcohol, c.çategorianombre as categoria, v.vasonombre as vaso
    FROM tbfavorito f
    INNER JOIN tbbebida b ON f.favoritobebidaid = b.bebidaid
	INNER JOIN tbcategoria c ON b.bebidacategoriaid = c.categoriaid
	INNER JOIN tbvaso v ON b.bebidavasoid = v.vasoid
    INNER JOIN tbusuario u ON f.favoritousuarioid = u.usuarioid
    WHERE f.favoritousuarioid = @usuarioid;
END

