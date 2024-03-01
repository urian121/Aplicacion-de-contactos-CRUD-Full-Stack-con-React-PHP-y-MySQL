CREATE TABLE `tbl_amigos` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `telefono` int(20) DEFAULT NULL,
  `avatar` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



INSERT INTO `tbl_amigos` (`id`, `nombre`, `email`, `telefono`, `avatar`)
VALUES
	(1,'Urian','urianwebdeveloper@gmail.com',21354851,'be8d406ee9.png'),
	(3,'Any','any@gmail.com',21457,'dc1c94cd1f.jpg'),
	(4,'Abelardo','abelardo@gmail.com',2225452,'c354b5ab89.jpg'),
	(5,'Camilo','camilo@gmail.com',99985,'ba7535e104.png'),
	(6,'Karok','karo@gmail.com',7778455,'b341163528.jpeg'),
	(8,'Carlos','carlos@gmail.com',3444444,'4f8f69455a.png'),
	(10,'Dary','dary@gmail.com',1221,'6390894255.jpg'),
	(13,'Braudin','braudin@gmail.com',22,'fe59218070.jpg'),
	(14,'Carmen','carmen@gmail.com',43432,'07a687574a.png'),
	(15,'Dev','dev@gmail.com',4344443,'9ef0f847f1.jpg'),
	(19,'Angel T','angel@gmail.com',444444,'0f7e3b70ab.jpg'),
	(22,'Angel','angel@gmail.com',76757,'36953fd08a.jpg'),
	(23,'Angel','angel@gmail.com',76757,'0d579248a5.png'),
	(24,'Brenda Cataleya','brendacatalella@gmail.com',32323,'9127723b1d.jpg'),
	(25,'Teresa R','teresa@gmail.com',23232323,'27045038c3.jpg');