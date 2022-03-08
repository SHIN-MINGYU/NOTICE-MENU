-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: nayami
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `author`
--

DROP TABLE IF EXISTS `author`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `author` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `profile` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `author`
--

LOCK TABLES `author` WRITE;
/*!40000 ALTER TABLE `author` DISABLE KEYS */;
/*!40000 ALTER TABLE `author` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `Cname` varchar(20) NOT NULL,
  `Cpassword` varchar(20) NOT NULL,
  `Ccontent` blob NOT NULL,
  `comment_id` int NOT NULL,
  `notice_id` int NOT NULL,
  KEY `notice_id` (`notice_id`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`notice_id`) REFERENCES `notice` (`notice_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login_info`
--

DROP TABLE IF EXISTS `login_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login_info` (
  `username` varchar(15) NOT NULL,
  `password` varchar(15) NOT NULL,
  `nickname` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login_info`
--

LOCK TABLES `login_info` WRITE;
/*!40000 ALTER TABLE `login_info` DISABLE KEYS */;
INSERT INTO `login_info` VALUES ('root','@tlsalsrb123','admin');
/*!40000 ALTER TABLE `login_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notice`
--

DROP TABLE IF EXISTS `notice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notice` (
  `notice_id` int NOT NULL,
  `title` varchar(30) NOT NULL,
  `name` varchar(20) NOT NULL,
  `date` date NOT NULL,
  `sympathy` int NOT NULL,
  `hate` int NOT NULL,
  `content` blob NOT NULL,
  `password` varchar(10) NOT NULL,
  PRIMARY KEY (`notice_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notice`
--

LOCK TABLES `notice` WRITE;
/*!40000 ALTER TABLE `notice` DISABLE KEYS */;
INSERT INTO `notice` VALUES (2,'123123','123123','2022-02-12',21,0,_binary '23232323','2323'),(3,'123123','123123','2022-02-12',26,0,_binary '123123123123','123123'),(4,'12312312','31231231','2022-02-12',21,0,_binary '123123','23123123'),(5,'1231231','32132','2022-02-12',21,0,_binary '3','12312312'),(6,'123123','123123','2022-02-12',21,0,_binary '123123123','123123'),(7,'123123123','12312312','2022-02-12',26,0,_binary '123123123','3123123'),(8,'23123123','123123123','2022-02-12',21,0,_binary '123123123','123123'),(10,'123123123','123123','2022-02-12',24,0,_binary '23123123123','231231'),(11,'12312312','312312312','2022-02-12',47,0,_binary '23123123','31231231'),(12,'123123','123123','2022-02-12',32,0,_binary '23213123','2323'),(13,'1111111111111','1111','2022-02-12',22,3,_binary '1111111111111','1'),(14,'123123','123123','2022-02-12',23,0,_binary '123123','123123'),(16,'1231','123','2022-02-17',0,0,_binary '123','123'),(17,'123','123','2022-02-22',0,0,_binary '123','123'),(18,'123123','232','2022-02-22',0,0,_binary '123123123123','323'),(19,'123123','123','2022-02-22',0,0,_binary '123123','123123'),(20,'123123','123123','2022-02-22',0,0,_binary '123123','213123'),(21,'123123','123123','2022-02-22',0,0,_binary '123123','123123'),(22,'123123','123123','2022-02-22',0,0,_binary '123123','123123'),(23,'123','123','2022-03-06',4,0,_binary '123','123');
/*!40000 ALTER TABLE `notice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('nmhAAwPbImDLbyiEoVSVwXqAjFqA4RyB',1646631369,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2022-03-07T05:36:09.037Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":\"root\"}}'),('uI6q8oNQ2oQPeRxIp9_vzQXMFEO8N_7f',1645620179,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2022-02-23T12:42:58.969Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":\"root\"}}'),('wIqTJPCdMs1D3uJKP4C8Ip7CTdRleIZ0',1645622406,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2022-02-23T13:20:05.834Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":\"root\"}}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sympathygroup`
--

DROP TABLE IF EXISTS `sympathygroup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sympathygroup` (
  `sympathy_id` int NOT NULL,
  `notice_id` int NOT NULL,
  KEY `notice_id` (`notice_id`),
  CONSTRAINT `sympathygroup_ibfk_1` FOREIGN KEY (`notice_id`) REFERENCES `notice` (`notice_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sympathygroup`
--

LOCK TABLES `sympathygroup` WRITE;
/*!40000 ALTER TABLE `sympathygroup` DISABLE KEYS */;
INSERT INTO `sympathygroup` VALUES (0,12),(1,7),(4,14),(5,13),(6,11),(7,10),(9,8),(10,6),(11,5),(12,4),(13,3),(14,2);
/*!40000 ALTER TABLE `sympathygroup` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-08 14:50:43
