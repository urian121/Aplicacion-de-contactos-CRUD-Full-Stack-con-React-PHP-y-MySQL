<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);


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
$dirLocal = "fotos_amigos";
$extensionesPermitidas = array("jpg", "jpeg", "png", "gif");

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
            $query = "SELECT * FROM $tbl_alumnos ORDER BY id DESC";
            $resultado = mysqli_query($con, $query);

            $usuarios = array();
            while ($fila = mysqli_fetch_assoc($resultado)) {
                $usuarios[] = $fila;
            }
            echo json_encode($usuarios);
        }
        break;

    case 'POST':
        // Verificar si se ha enviado un archivo
        if (isset($_FILES['avatar'])) {
            $archivoTemporal = $_FILES['avatar']['tmp_name'];
            $nombreArchivo = $_FILES['avatar']['name'];

            $extension = strtolower(pathinfo($nombreArchivo, PATHINFO_EXTENSION));

            if (in_array($extension, $extensionesPermitidas)) {
                // Generar un nombre único y seguro para el archivo
                $nombreArchivo = substr(md5(uniqid(rand())), 0, 10) . "." . $extension;
                $rutaDestino = $dirLocal . '/' . $nombreArchivo;

                // Mover el archivo a la ubicación deseada
                if (move_uploaded_file($archivoTemporal, $rutaDestino)) {
                    $nombre = $_POST['nombre'];
                    $email = $_POST['email'];
                    $telefono = $_POST['telefono'];
                    $query = "INSERT INTO $tbl_alumnos (nombre, email, telefono, avatar) VALUES ('$nombre', '$email', '$telefono', '$nombreArchivo')";
                    if (mysqli_query($con, $query)) {
                        echo json_encode(array('message' => 'Nuevo amigo creado correctamente'));
                    } else {
                        echo json_encode(array('error' => 'Error al crear amigo: ' . mysqli_error($con)));
                    }
                } else {
                    echo json_encode(array('error' => 'Error al mover el archivo'));
                }
            } else {
                echo json_encode(array('error' => 'Tipo de archivo no permitido'));
            }
        } else {
            echo json_encode(array('error' => 'No se ha enviado ningún archivo o ha ocurrido un error al cargar el archivo'));
        }
        break;

    case 'PUT':
        print_r($_POST);
        $data = json_decode(file_get_contents("php://input"), true);
        $id = $data['id'];
        $nombre = mysqli_real_escape_string($con, $data['nombre']);
        $email = mysqli_real_escape_string($con, $data['email']);
        $telefono = mysqli_real_escape_string($con, $data['telefono']);
        print('nombre: ' . $nombre . ' email: ' . $email . ' telefono: ' . $telefono);

        $archivoTemporal = $_FILES['avatar']['tmp_name'];
        $nombreArchivo = $_FILES['avatar']['name'];
        print_r($archivoTemporal);
        print_r($nombreArchivo);
        echo '<br>';

        $nombre = $_POST['nombre'];
        $email = $_POST['email'];
        $telefono = $_POST['telefono'];
        print_r($nombre);
        print_r($email);
        print_r($telefono);

        /*
        $query = "UPDATE $tbl_alumnos SET nombre='$nombre', email='$email', telefono='$telefono' WHERE id=$id";
        if (mysqli_query($con, $query)) {
            echo json_encode(array('message' => 'Contacto actualizado correctamente'));
        } else {
            echo json_encode(array('error' => 'Error al actualizar contacto: ' . mysqli_error($con)));
        }*/
        break;

    case 'DELETE':
        $id = $_GET['id'];

        // Obtener el nombre del archivo de imagen asociado al contacto
        $query = "SELECT avatar FROM $tbl_alumnos WHERE id=$id";
        $result = mysqli_query($con, $query);
        $row = mysqli_fetch_assoc($result);
        $avatarName = $row['avatar'];

        // Eliminar la entrada del contacto de la base de datos
        $deleteQuery = "DELETE FROM $tbl_alumnos WHERE id=$id";
        if (mysqli_query($con, $deleteQuery)) {
            // Eliminar el archivo de imagen si existe
            if ($avatarName) {
                $filePath = $dirLocal . '/' . $avatarName;
                if (file_exists($filePath)) {
                    unlink($filePath); // Eliminar el archivo de imagen
                }
            }

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
