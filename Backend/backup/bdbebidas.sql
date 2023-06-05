USE [master]
GO
/****** Object:  Database [bdbebidas]    Script Date: 04/06/2023 09:18:07 p. m. ******/
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
/****** Object:  Table [dbo].[tbbebida]    Script Date: 04/06/2023 09:18:07 p. m. ******/
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
/****** Object:  Table [dbo].[tbcategoria]    Script Date: 04/06/2023 09:18:08 p. m. ******/
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
/****** Object:  Table [dbo].[tbcomposicion]    Script Date: 04/06/2023 09:18:08 p. m. ******/
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
/****** Object:  Table [dbo].[tbfavorito]    Script Date: 04/06/2023 09:18:08 p. m. ******/
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
/****** Object:  Table [dbo].[tbingrediente]    Script Date: 04/06/2023 09:18:08 p. m. ******/
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
/****** Object:  Table [dbo].[tbmedida]    Script Date: 04/06/2023 09:18:08 p. m. ******/
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
/****** Object:  Table [dbo].[tbsesion]    Script Date: 04/06/2023 09:18:08 p. m. ******/
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
/****** Object:  Table [dbo].[tbusuario]    Script Date: 04/06/2023 09:18:08 p. m. ******/
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
/****** Object:  Table [dbo].[tbutiliza]    Script Date: 04/06/2023 09:18:08 p. m. ******/
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
/****** Object:  Table [dbo].[tbvaso]    Script Date: 04/06/2023 09:18:08 p. m. ******/
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
USE [master]
GO
ALTER DATABASE [bdbebidas] SET  READ_WRITE 
GO
