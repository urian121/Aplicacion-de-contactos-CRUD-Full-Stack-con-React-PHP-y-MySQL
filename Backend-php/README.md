# Creando una API RESTful con PHP desde Cero 😱

##### Desarrollo de una API RESTful en PHP para gestionar datos de alumnos. Permite operaciones CRUD (GET, POST, PUT, DELETE) sobre la información almacenada en una base de datos MySQL, siguiendo los estándares HTTP y proporcionando respuestas JSON.

## Lista de Endpoint API

#### Método GET ✅

    👉 http://localhost/crud-full-stack-agenda-de-contactos-con-react-php-mysql/Backend-php/

    [
        {
            "id": "1",
            "nombre_alumno": "Braudin",
            "email_alumno": "braudin@gmail.com",
            "curso_alumno": "React Native",
            "sexo_alumno": "M",
            "habla_ingles": "0",
            "fecha_registro": "2024-02-18 20:49:51"
        },
        {
            "id": "3",
            "nombre_alumno": "urian Viera",
            "email_alumno": "urian@gmail.com",
            "curso_alumno": "REACT",
            "sexo_alumno": "M",
            "habla_ingles": "0",
            "fecha_registro": "2024-02-18 20:58:43"
        }
    ]

#### Método GET ✅

    👉 http://localhost/crud-full-stack-agenda-de-contactos-con-react-php-mysql/Backend-php/?id=4
    {
        "id": "4",
        "nombre_alumno": "Brenda Viera",
        "email_alumno": "brenda@gmail.com",
        "curso_alumno": "Python",
        "sexo_alumno": "F",
        "habla_ingles": "0",
        "fecha_registro": "2024-02-18 20:59:31"
    }

#### Método POST ✅

    👉 http://localhost/crud-full-stack-agenda-de-contactos-con-react-php-mysql/Backend-php/
    {
        "nombre_alumno": "Torres ",
        "email_alumno": "torres@gmail.com",
        "curso_alumno": "sql",
        "sexo_alumno": "F",
        "habla_ingles": "1",
        "fecha_registro": "2024-02-18 20:49:51"
    }

#### Método PUT ✅

    👉 http://localhost/crud-full-stack-agenda-de-contactos-con-react-php-mysql/Backend-php/
    {
        "id":"6",
        "nombre_alumno": "nuevo",
        "email_alumno": "nuevo@gmail.com",
        "curso_alumno": "React Native",
        "sexo_alumno": "M",
        "habla_ingles": "1",
        "fecha_registro": "2024-02-18 20:49:51"
    }

#### Método DELETE ✅

    👉 http://localhost/crud-full-stack-agenda-de-contactos-con-react-php-mysql/Backend-php/?id=2
