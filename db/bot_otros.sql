-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: bot
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `otros`
--

DROP TABLE IF EXISTS `otros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `otros` (
  `idOtros` int NOT NULL AUTO_INCREMENT,
  `chatId` bigint NOT NULL,
  `nombre` varchar(60) DEFAULT NULL,
  `motivo` varchar(400) DEFAULT NULL,
  `revisado` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`idOtros`),
  UNIQUE KEY `chatId` (`chatId`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `otros`
--

LOCK TABLES `otros` WRITE;
/*!40000 ALTER TABLE `otros` DISABLE KEYS */;
INSERT INTO `otros` VALUES (10,573195733720,'Mi corazón','Quiero renunciar',1),(12,573226352733,'Elduin José Baño Sánchez','Q el día miércoles en la mañana solicite una carta de trabajo y quedaron enviármela x este medio y aún no me ah llegado y la necesito con carácter de urgencia',0),(18,573105468042,'Jhon david mosquera mejia','Estoy  realizando proceso   para ingresar',0),(20,573106906894,'Edward barco','Que documentos ne cesito para retirar las cesantias',0),(21,573136652137,'Es sobre el tema de las cesantías','Que todavía no me han llegado',0),(24,573170930650,'José Fernando Uzuriaga Vivero','Quiero Saber Que Paso Con Un Proceso Que Estoy Llevando Para Trabajar Con Loa Compañía De Integral',0),(26,573046227694,'Jhon Edinson Rodríguez Rojas','Una consulta es q realice la entrevista y luego hice los exámenes aún no me han dicho nd de cuando es el ingreso',0);
/*!40000 ALTER TABLE `otros` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-15 13:02:31
