# Pruebatecnica-Angular-NetCore

## Descripción del Proyecto
Este proyecto consiste en el desarrollo de una aplicación de encuestas utilizando tecnologías como Angular, ASP.NET Core, Entity Framework, JWT y SQL Server. La aplicación permite:

1. **Login con usuario y contraseña.**
2. **Creación, modificación y eliminación de encuestas.**
3. **Llenado de encuestas sin necesidad de login.**
4. **Consulta de resultados de encuestas (requiere login).**

## Funcionalidades

### 1. Login con Usuario y Contraseña
![Login](https://github.com/Re-21-12/Pruebatecnica-Angular-NetCore/assets/104967229/7a927e50-f25b-4416-bd06-7ed64d12b752)

### 2. Gestión de Encuestas (Requiere Login)
Permite la creación, modificación y eliminación de encuestas. Cada encuesta incluye:
- Nombre de la encuesta
- Descripción de la encuesta
- Listado de campos:
  - Nombre del campo
  - Título del campo (se mostrará en la pantalla)
  - Es requerido (s/n)
  - Tipo de campo (Texto, Número y Fecha)

Al crear el formulario se generará un link único que servirá para llenar la encuesta.

![Gestión de Encuestas](https://github.com/Re-21-12/Pruebatecnica-Angular-NetCore/assets/104967229/1e8784bb-d5d1-49f5-9acf-96ace94e7ab4)

### 3. Llenado de Encuestas (No Requiere Login)
Accediendo al link generado, se desplegarán los campos configurados en la encuesta y se permitirá ingresar los valores correspondientes. Al guardar la encuesta, se almacenarán los valores ingresados para cada campo.

![Llenado de Encuestas](https://github.com/Re-21-12/Pruebatecnica-Angular-NetCore/assets/104967229/a9510fcc-f231-46f3-9f1a-3f528068eca3)
![Llenado de Encuestas](https://github.com/Re-21-12/Pruebatecnica-Angular-NetCore/assets/104967229/f3758c0c-16be-45d6-b1d3-094e83e4043d)

### 4. Consulta de Resultados de Encuestas (Requiere Login)
Permite consultar los resultados de cada encuesta.

![Consulta de Resultados](https://github.com/Re-21-12/Pruebatecnica-Angular-NetCore/assets/104967229/a2e00492-3d74-4e9e-aa27-ccc369a1a6e6)

## Tecnologías Utilizadas
- **Angular v17**
- **ASP.NET Core 6**
- **Entity Framework**
- **Postman**
- **JWT**
- **SQL Server**

<hr/>

## Video con programa en funcionamientoo


https://github.com/Re-21-12/Pruebatecnica-Angular-NetCore/assets/104967229/311a1845-58b4-4d7f-9ea4-0c5f6bccccb9


<h1>Collection en POSTMAN</h1>

https://elements.getpostman.com/redirect?entityId=28685331-41026e4b-a4cb-4a5b-b1a3-42fe34ea6277&entityType=collection


<hr/>

## Script de Base de Datos en SQL Server

```sql
CREATE DATABASE prueba_tecnica;
USE prueba_tecnica;

CREATE TABLE formulario (
    link_formulario VARCHAR(2000) PRIMARY KEY NOT NULL,
    nombre_encuesta VARCHAR(100) NOT NULL,
    descripcion_encuesta VARCHAR(250) NOT NULL
);

CREATE TABLE campo (
    id INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
    nombre_campo VARCHAR(100) NOT NULL,
    titulo_campo VARCHAR(100) NOT NULL,
    esrequerido CHAR NOT NULL,
    tipo_campo VARCHAR(10) NOT NULL,
    link_formulario VARCHAR(2000) NOT NULL
);

CREATE TABLE campo_en_formulario (
    id INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
    link_formulario VARCHAR(2000) NOT NULL,
    id_campo INT NOT NULL,
    valor VARCHAR(2000),
    FOREIGN KEY (link_formulario) REFERENCES formulario (link_formulario),
    FOREIGN KEY (id_campo) REFERENCES campo (id)
);

