<?php

/**
 * Creando una API RESTful con los métodos GET, POST, PUT y DELETE utilizando PHP y MySQLi
 */
// Establecer encabezados CORS para permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require('configBD.php');
$metodo = $_SERVER['REQUEST_METHOD'];
$tbl_alumnos = 'tbl_amigos';


switch ($metodo) {
    case 'GET':
        // Verificar si se ha proporcionado un ID en la cadena de consulta
        if (isset($_GET['id'])) {
            // Obtener el ID de la cadena de consulta y escaparlo para evitar la inyección SQL
            $id = mysqli_real_escape_string($con, $_GET['id']);

            $query = "SELECT * FROM $tbl_alumnos WHERE id = $id";
            $resultado = mysqli_query($con, $query);

            // Verificar si se encontró el registro
            if (mysqli_num_rows($resultado) > 0) {
                // Si se encontró, obtener los datos y devolverlos como JSON
                $usuario = mysqli_fetch_assoc($resultado);
                echo json_encode($usuario);
            } else {
                // Si no se encontró el registro, devolver un mensaje de error
                echo json_encode(array('mensaje' => 'No se encontró ningún usuario con el ID proporcionado'));
            }
        } else {
            $query = "SELECT * FROM $tbl_alumnos";
            $resultado = mysqli_query($con, $query);

            $usuarios = array();
            while ($fila = mysqli_fetch_assoc($resultado)) {
                $usuarios[] = $fila;
            }
            echo json_encode($usuarios);
        }
        break;

    case 'POST':
        print_r($_FILES);
        print_r($_POST);
        $data = json_decode(file_get_contents("php://input"), true);
        $nombre = mysqli_real_escape_string($con, ucwords($data['nombre']));
        $email = mysqli_real_escape_string($con, $data['email']);
        $telefono = mysqli_real_escape_string($con, $data['telefono']);


        //Verificando si existe el directorio
        $dirLocal = "fotos_amigos";
        if (!file_exists($dirLocal)) {
            mkdir($dirLocal, 0777, true);
        }
        $miDir         = opendir($dirLocal); //Habro el directorio

        //move_uploaded_file($_FILES['file']['tmp_name'], 'archivos/' . $_FILES['file']['name']);


        $query = "INSERT INTO $tbl_alumnos (nombre, email, telefono) VALUES ('$nombre', '$email', '$telefono')";
        if (mysqli_query($con, $query)) {
            echo json_encode(array('message' => 'Nuevo amigo creado correctamente'));
        } else {
            echo json_encode(array('error' => 'Error al crear amigo: ' . mysqli_error($con)));
        }
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"), true);
        $id = $data['id'];
        $nombre_alumno = mysqli_real_escape_string($con, $data['nombre_alumno']);
        $email_alumno = mysqli_real_escape_string($con, $data['email_alumno']);
        $curso_alumno = mysqli_real_escape_string($con, $data['curso_alumno']);
        $sexo_alumno = mysqli_real_escape_string($con, $data['sexo_alumno']);
        $habla_ingles = mysqli_real_escape_string($con, $data['habla_ingles']);

        if ($habla_ingles == "true") {
            $habla_ingles = 1;
        } else {
            $habla_ingles = 0;
        }


        $query = "UPDATE $tbl_alumnos SET nombre_alumno='$nombre_alumno', email_alumno='$email_alumno', curso_alumno='$curso_alumno', sexo_alumno='$sexo_alumno', habla_ingles='$habla_ingles' WHERE id=$id";
        if (mysqli_query($con, $query)) {
            echo json_encode(array('message' => 'Usuario actualizado correctamente'));
        } else {
            echo json_encode(array('error' => 'Error al actualizar amigo: ' . mysqli_error($con)));
        }
        break;

    case 'DELETE':
        $id = $_GET['id'];
        // Eliminar un amigo
        $query = "DELETE FROM $tbl_alumnos WHERE id=$id";
        if (mysqli_query($con, $query)) {
            echo json_encode(array('message' => 'Amigo eliminado correctamente'));
        } else {
            echo json_encode(array('error' => 'Error al eliminar amigo: ' . mysqli_error($con)));
        }
        break;

    default:
        echo json_encode(array('error' => 'Método no permitido'));
        break;
}

mysqli_close($con);
