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
-- Table structure for table `reclutamiento`
--

DROP TABLE IF EXISTS `reclutamiento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reclutamiento` (
  `idReclutamiento` int NOT NULL AUTO_INCREMENT,
  `chatId` bigint NOT NULL,
  `nombre` varchar(60) DEFAULT NULL,
  `telefono` varchar(60) DEFAULT NULL,
  `ciudad` varchar(60) DEFAULT NULL,
  `revisado` tinyint(1) DEFAULT '0',
  `cargo` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idReclutamiento`),
  UNIQUE KEY `chatId` (`chatId`)
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reclutamiento`
--

LOCK TABLES `reclutamiento` WRITE;
/*!40000 ALTER TABLE `reclutamiento` DISABLE KEYS */;
INSERT INTO `reclutamiento` VALUES (50,573224961178,'Jennifer moreno racines','3224961178','Santander de quilichado cauca',0,'-'),(53,573134285858,'Jimena Molina Castillo','3134285858','Cali',0,'-'),(61,573117182350,'David Felipe carabali vanguero','3117182350','Puerto Tejada cauca',0,'-'),(64,573116499571,'Cesar Stiven Riascos Ararat','3116499571','Puerto Tejada Cauca',0,'-'),(67,573116255391,'Carmen Rosa guaza Díaz','3116255391','Puerto tejada',0,'-'),(70,573206570547,'Liceth dayana Guevara Rivas','3206570547','Puerto Tejada cauca',0,'-'),(77,573233674859,'Hellerman Alexander Rentería López','3233674859','Cali',0,'Operario de producción'),(81,573137298686,'Juan Manuel Riascos Riascos','3137298686','Cali',0,'Muchas gracias'),(85,573155848807,'Graicy Alejandra Mañunga Zapata','3184322727','Puerto Tejada',0,'Otros aprendiz en seguridad y salud en el trabajo'),(89,573143944790,'Darwin Alexis Gomez chacon','3143944790','Pradera valle',0,'Auxiliar de servicios generales en tejeduria');
/*!40000 ALTER TABLE `reclutamiento` ENABLE KEYS */;
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
