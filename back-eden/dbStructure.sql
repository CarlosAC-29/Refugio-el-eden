CREATE TABLE ANIMALES(
Id_animal SERIAL NOT NULL,
Nombre_animal varchar(10) NOT NULL,
Talla char(1) NULL,
Edad float(2) NULL,
Tipo varchar(10) NULL,
Motivo_ingreso text NULL,
Observaciones  text NULL,
CONSTRAINT PK_ANIMALES PRIMARY KEY ( Id_animal));

CREATE TABLE FECHA_SALIDA_ANIMAL(
Id_animal SERIAL NOT NULL,
Estado char(1) NOT NULL,
Fecha_salida date NULL,
CONSTRAINT PK_FECHA_SALIDA_ANIMAL PRIMARY KEY ( Id_animal));

CREATE TABLE TIEMPO_ESTANCIA_ANIMAL(
Id_animal SERIAL NOT NULL,
Fecha_ingreso date NULL,
Fecha_salida date NULL,
Tiempo_estancia integer NULL,
CONSTRAINT PK_TIEMPO_ESTANCIA_ANIMAL PRIMARY KEY ( Id_animal));

CREATE TABLE C_PAGAN_POR(
Id_animal SERIAL NOT NULL,
Cedula varchar(11) NOT NULL,
Id_voluntario varchar(11) NOT NULL,
Ingresos float(10) NULL,
Fecha date NULL,
CONSTRAINT PK_C_PAGAN_POR PRIMARY KEY ( Id_animal ,Cedula,  Id_voluntario));

CREATE TABLE CUIDAN(
Id_voluntario varchar(11) NOT NULL,
Id_animal SERIAL NOT NULL,
CONSTRAINT PK_CUIDAN PRIMARY KEY ( Id_voluntario, Id_animal));

CREATE TABLE VOLUNTARIOS(
Id_voluntario varchar(11) NOT NULL,
Cargo varchar(20) NULL,
Nombre_voluntario varchar(40) NOT NULL,
Numero_telefono char(10) NULL,
CONSTRAINT PK_VOLUNTARIOS PRIMARY KEY ( Id_voluntario));

CREATE TABLE PATROCINADOR(
Cedula varchar(11) NOT NULL,
Nombre varchar(20) NOT NULL,
Apellido varchar(20) NULL,
Correo varchar(80) NULL,
Tipo_via varchar(15) NULL,
Numero_calle varchar(10) NULL,
Numero_casa varchar(10) NULL,
Telefono char(10) NULL,
CONSTRAINT PK_PATROCINADOR PRIMARY KEY ( Cedula));




CREATE TABLE CLIENTE(
Cedula varchar(11) NOT NULL,
CONSTRAINT PK_CLIENTE PRIMARY KEY ( Cedula));

CREATE TABLE TIPO_CLIENTE(
Cedula varchar(11) NOT NULL,
Tipo char(8) NULL,
CONSTRAINT PK_TIPO_CLIENTE PRIMARY KEY ( Cedula));

CREATE TABLE DONADOR(
Cedula varchar(11) NOT NULL,
CONSTRAINT PK_DONADOR PRIMARY KEY ( Cedula));

CREATE TABLE D_PAGAN_A(
Cedula varchar(11) NOT NULL,
Id_voluntario varchar(11) NOT NULL,
Ingresos float(15) NULL,
Fecha date NULL,
CONSTRAINT PK_D_PAGAN_A PRIMARY KEY ( Cedula, Id_voluntario));

CREATE TABLE USUARIOS(
User_name varchar(30) NOT NULL,
Password varchar(30) NOT NULL,
Id_voluntario varchar(11) NOT NULL,
CONSTRAINT PK_USUARIOS PRIMARY KEY ( User_name, Id_voluntario));

CREATE TABLE datos_animal (
    Id_animal SERIAL NOT NULL,
    Nombre_animal varchar(20) NOT NULL,
    Talla char(1) NULL,
    Edad float(2) NULL,
    Tipo varchar(15) NULL,
    Motivo_ingreso text NULL,
    Observaciones  text NULL,
    estado char(1) NULL,
    fecha_ingreso date NULL,
    fecha_salida date NULL,
    tiempo_estancia float(2) NULL,
CONSTRAINT PK_DATOS_ANIMAL PRIMARY KEY (id_animal)
);

CREATE TABLE datos_patrocinador (
    cedula varchar(11) NOT NULL,
    nombre varchar(30) NOT NULL,
    apellido varchar(30) NULL,
    correo varchar(80) NULL,
    telefono varchar(20) NULL,
    tipo_via varchar(15) NULL,
    numero_calle varchar(7) NULL,
    numero_casa varchar(10) NULL,
    tipo varchar(20) NULL,
CONSTRAINT PK_DATOS_PATROCINADOR PRIMARY KEY (cedula)
);

CREATE TABLE datos_voluntario (
    nombre varchar(30) NOT NULL,
    cedula varchar(11) NOT NULL,
    cargo varchar(50) NULL,
    telefono varchar(15) NULL,
    username varchar(20) NULL,
    password varchar(20) NULL,
CONSTRAINT PK_DATOS_VOLUNTARIO PRIMARY KEY (cedula)
);
--** No se si hay que referenciar que la llave foránea se hereda desde LA otra relación muchos a muchos que hay antes o se hereda desde la llave primaria de la tabla grande como pasa con Patrocinadores que su llave primaria es cedula pero la hereda en todo lado.

--***Yo estoy haciendo las restricciones de llave justo como en el MR, que una llave foránea use de referencia a otra llave foránea y así, postgresql no debería tener problemas con eso

-- Constraints --

ALTER TABLE DONADOR
ADD CONSTRAINT FK_DONADOR_PATROCINADOR FOREIGN KEY(Cedula)
REFERENCES PATROCINADOR(Cedula)
on delete cascade on update cascade;

ALTER TABLE D_PAGAN_A
ADD CONSTRAINT FK_D_PAGAN_A_VOLUNTARIOS FOREIGN KEY(Id_voluntario)
REFERENCES VOLUNTARIOS(Id_voluntario)
on delete cascade on update cascade;

ALTER TABLE USUARIOS
ADD CONSTRAINT FK_USUARIOS_VOLUNTARIOS FOREIGN KEY(Id_voluntario)
REFERENCES VOLUNTARIOS(Id_voluntario)
on delete cascade on update cascade;

ALTER TABLE CLIENTE
ADD CONSTRAINT FK_CLIENTE_PATROCINADOR FOREIGN KEY(Cedula)
REFERENCES PATROCINADOR(Cedula)
on delete cascade on update cascade;

ALTER TABLE TIPO_CLIENTE
ADD CONSTRAINT FK_TIPO_CLIENTE_CLIENTE FOREIGN KEY(Cedula)
REFERENCES CLIENTE(Cedula)
on delete cascade on update cascade;

ALTER TABLE C_PAGAN_POR
ADD CONSTRAINT FK_C_PAGAN_POR_CLIENTE FOREIGN KEY(Cedula)
REFERENCES CLIENTE(Cedula)
on delete cascade on update cascade;

ALTER TABLE C_PAGAN_POR
ADD CONSTRAINT FK_C_PAGAN_POR_ANIMALES FOREIGN KEY(Id_animal)
REFERENCES ANIMALES(Id_animal)
on delete cascade on update cascade;

ALTER TABLE C_PAGAN_POR
ADD CONSTRAINT FK_C_PAGAN_POR_VOLUNTARIOS FOREIGN KEY(Id_voluntario)
REFERENCES VOLUNTARIOS(Id_voluntario)
on delete cascade on update cascade;

ALTER TABLE CUIDAN
ADD CONSTRAINT FK_CUIDAN_VOLUNTARIOS FOREIGN KEY(Id_voluntario)
REFERENCES VOLUNTARIOS(Id_voluntario)
on delete cascade on update cascade;

ALTER TABLE CUIDAN
ADD CONSTRAINT FK_CUIDAN_ANIMALES FOREIGN KEY(Id_animal)
REFERENCES ANIMALES(Id_animal)
on delete cascade on update cascade;

ALTER TABLE FECHA_SALIDA_ANIMAL
ADD CONSTRAINT FK_FECHA_SALIDA_ANIMAL_ANIMALES FOREIGN KEY(Id_animal)
REFERENCES ANIMALES(Id_animal)
on delete cascade on update cascade;

ALTER TABLE TIEMPO_ESTANCIA_ANIMAL
ADD CONSTRAINT FK_TIEMPO_ESTANCIA_ANIMAL_ANIMALES FOREIGN KEY(Id_animal)
REFERENCES ANIMALES(Id_animal)
on delete cascade on update cascade;

--------------------functiones----------------------


CREATE OR REPLACE FUNCTION f_crear_animal() RETURNS trigger AS
$$

BEGIN
    INSERT INTO animales (nombre_animal, talla, edad, tipo, motivo_ingreso, observaciones) VALUES (new.nombre_animal, new.talla, new.edad, new.tipo, new.motivo_ingreso, new.observaciones);
    INSERT INTO fecha_salida_animal(estado, fecha_salida) VALUES (new.estado, new.fecha_salida);
    INSERT INTO tiempo_estancia_animal(fecha_ingreso, fecha_salida, tiempo_estancia) VALUES (new.fecha_ingreso, new.fecha_salida, new.tiempo_estancia);
RETURN NULL;
END
$$ LANGUAGE plpgsql

CREATE TRIGGER insertar_animal AFTER INSERT ON datos_animal FOR EACH ROW EXECUTE PROCEDURE f_crear_animal();

drop function f_crear_animal cascade;
delete from animales cascade;
delete from datos_animal cascade;

CREATE OR REPLACE FUNCTION f_crear_patrocinador() RETURNS trigger AS
$$

BEGIN
    IF (new.tipo != 'donador') THEN
        INSERT INTO patrocinador (cedula,nombre,apellido,correo,tipo_via,numero_calle,numero_casa,telefono) VALUES (new.cedula,new.nombre,new.apellido,new.correo,new.tipo_via,new.numero_calle,new.numero_casa,new.telefono);
        INSERT INTO cliente(cedula) VALUES (new.cedula);
        INSERT INTO tipo_cliente(cedula,tipo) VALUES (new.cedula,new.tipo);
    ELSE 
        INSERT INTO patrocinador (cedula,nombre,apellido,correo,tipo_via,numero_calle,numero_casa,telefono) VALUES (new.cedula,new.nombre,new.apellido,new.correo,new.tipo_via,new.numero_calle,new.numero_casa,new.telefono);
        INSERT INTO donador(cedula) VALUES (new.cedula);
    END IF;
RETURN NULL;
END
$$ LANGUAGE plpgsql

CREATE TRIGGER insertar_patrocinador AFTER INSERT ON datos_patrocinador FOR EACH ROW EXECUTE PROCEDURE f_crear_patrocinador();

drop function f_crear_patrocinador cascade;
delete from patrocinador cascade;
delete from datos_patrocinador cascade;

CREATE OR REPLACE FUNCTION f_crear_voluntario() RETURNS trigger AS
$$

BEGIN
        INSERT INTO voluntarios (id_voluntario,cargo,nombre_voluntario,numero_telefono) VALUES (new.cedula,new.cargo,new.nombre,new.telefono);
        INSERT INTO usuarios(user_name,password,id_voluntario) VALUES (new.username,new.password,new.cedula);
RETURN NULL;
END
$$ LANGUAGE plpgsql

CREATE TRIGGER insertar_voluntario AFTER INSERT ON datos_voluntario FOR EACH ROW EXECUTE PROCEDURE f_crear_voluntario();

drop function f_crear_voluntario cascade;
delete from patrocinador cascade;
delete from datos_patrocinador cascade;

drop table datos_animal cascade;
drop table animales cascade;
drop table cuidan cascade;
drop table fecha_salida_animal cascade;
drop table tiempo_estancia_animal cascade;
drop table c_pagan_por cascade;
drop table cliente cascade;
drop table d_pagan_a cascade;
drop table datos_patrocinador cascade;
drop table datos_voluntario cascade;
drop table donador cascade;
drop table patrocinador cascade;
drop table tipo_cliente cascade;
drop table usuarios cascade;
drop table voluntarios cascade;
