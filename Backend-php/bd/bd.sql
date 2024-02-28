CREATE TABLE `tbl_alumnos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_alumno` varchar(255) DEFAULT NULL,
  `email_alumno` varchar(255) DEFAULT NULL,
  `curso_alumno` varchar(50) DEFAULT NULL,
  `sexo_alumno` varchar(20) DEFAULT NULL,
  `habla_ingles` tinyint(1) DEFAULT NULL,
  `fecha_registro` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO `tbl_alumnos` (`id`, `nombre_alumno`, `email_alumno`, `curso_alumno`, `sexo_alumno`, `habla_ingles`, `fecha_registro`)
VALUES
	(1,'Braudin','braudin@gmail.com','React Native','M',0,'2024-02-18 20:49:51'),
	(2,'urian Viera','urian@gmail.com','REACT','M',0,'2024-02-18 20:58:43'),
	(4,'Brenda Viera','brenda@gmail.com','Python','F',0,'2024-02-18 20:59:31'),
	(5,'Brenda ','brenda2@gmail.com','Python','F',1,'2024-02-18 21:08:20'),
	(6,'nuevo','nuevo@gmail.com','React Native','M',0,'2024-02-18 21:09:04'),
	(7,'Carlor T ','fre@gmail.com','Python','F',1,'2024-02-18 21:09:27'),
	(8,'Torres ','torres@gmail.com','sql','F',1,'2024-02-18 21:10:13');