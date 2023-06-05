CREATE TABLE tbusuario (
  usuarioid bigint NOT NULL,
  usuarionombre nvarchar(50) NOT NULL,
  usuarioapellidos nvarchar(50) NOT NULL,
  usuariocorreo nvarchar(50) NOT NULL,
  usuariopassword nvarchar(max) NOT NULL,
  usuariofecharegistro datetime NOT NULL,
  usuarionumeroverificacion nvarchar(max) NOT NULL,
  usuarioestado int NOT NULL
) 

Create TABLE tbfavorito (
  favoritoid bigint NOT NULL,
  favoritousuarioid bigint NOT NULL,
  favoritobebidaid bigint NOT NULL
 constraint Pk_favorito primary key (favoritoid),
 constraint Fk_usuari foreign key (favoritousuarioid) references tbusuario(usuarioid),
 constraint Fk_bebi foreign key (favoritobebidaid) references tbbebida(bebidaid)
) 

Create table tbbebida(
bebidaid bigint NOT NULL,
bebidanombre nvarchar(50) NOT NULL,
bebidapreparacion nvarchar(200) NOT NULL,
bebidatipoalcohol varchar(100) NOT NULL,
bebidavasoid bigint NOT NULL,
bebidacategoriaid bigint NOT NULL,
constraint Pk_bebida primary key (bebidaid),
constraint Fk_vaso foreign key (bebidavasoid) references tbvaso(vasoid),
constraint Fk_categoria foreign key (bebidacategoriaid) references tbcategoria(categoriaid)
) 

Create table tbvaso(
vasoid bigint not null,
vasonombre nvarchar(50) not null
constraint Pk_vaso primary key (vasoid)

)

Create table tbcategoria(
categoriaid bigint not null,
çategorianombre nvarchar(50) not null,
constraint Pk_categoria primary key (categoriaid)


)


Create table tbsesion(
sesionid bigint not null,
sesionusuarioid bigint not null,
sesionorigen nvarchar(max) not null,
sesionfechainicio datetime not null,
sesionfechafinal datetime not null,
sesionestado int not null,
sesionfechaactualizacion datetime not null,
constraint Pk_sesion primary key (sesionid),
constraint Fk_usuarios foreign key (sesionusuarioid) references tbusuario(usuarioid)

)

Create table tbcomposicion(
composicionid bigint not null,
composicionbebidaid bigint not null,
composicioningredienteid bigint not null,
constraint Pk_composicion primary key (composicionid),
constraint Fk_bebid foreign key (composicionbebidaid) references tbbebida(bebidaid),
constraint Fk_ingrediente foreign key (composicioningredienteid) references tbingrediente(ingredienteid)

)

Create table tbingrediente(
ingredienteid bigint not null,
ingredientenombre nvarchar(50) not null,
constraint Pk_ingrediente primary key (ingredienteid)

)


Create table tbutiliza(
utilizaid bigint not null,
utilizaingredienteid bigint not null,
utilizamedidaid bigint not null,
constraint Pk_utiliza primary key (utilizaid),
constraint Fk_medida foreign key (utilizamedidaid) references tbmedida(medidaid),
constraint Fk_ingredient foreign key (utilizaingredienteid) references tbingrediente(ingredienteid)

)

Create table tbmedida(
medidaid bigint not null,
medidacantidad varchar(10) not null,
constraint Pk_medida primary key (medidaid)

)