-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: projet7
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `text` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int DEFAULT NULL,
  `postId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `postId` (`postId`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,'dsqdsqddsqd','2022-08-03 20:26:45','2022-08-03 20:26:45',13,3),(2,'sqds','2022-08-03 20:27:02','2022-08-03 20:27:02',13,2),(3,'dsqds','2022-08-03 20:33:32','2022-08-03 20:33:32',13,4),(7,'dsqdsqdsqd','2022-08-04 20:29:32','2022-08-04 20:29:36',14,4),(8,'cwdsqd','2022-08-04 20:31:17','2022-08-04 20:31:17',14,4),(9,'dsqds','2022-08-04 20:31:55','2022-08-04 20:31:55',14,4),(10,'dsqds','2022-08-04 20:32:19','2022-08-04 20:32:19',14,4),(11,'dsdsqdslal','2022-08-04 20:56:14','2022-08-04 20:56:42',2,4),(13,'dsqdsq','2022-08-10 07:00:33','2022-08-10 07:00:33',15,7),(14,'dsqd','2022-08-10 07:00:38','2022-08-10 07:00:38',15,7),(15,'sdfqfdff','2022-08-10 14:35:18','2022-08-10 14:35:34',15,1),(24,'le commentaire numéro 2 !!','2022-08-12 16:59:05','2022-08-12 17:54:57',1,3),(28,'sdqdsqd','2022-08-12 17:07:57','2022-08-12 17:07:57',1,8),(39,'dfdfsdslll','2022-08-13 17:15:43','2022-08-13 17:16:00',1,7),(41,'dfdfsdsfdfsdlhgghgx','2022-08-13 17:15:47','2022-08-14 11:28:56',1,7),(55,'dsqdsqd','2022-08-14 17:22:25','2022-08-14 17:22:25',1,11);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `postId` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `postId` (`postId`),
  KEY `userId` (`userId`),
  CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=497 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (1,'2022-08-03 17:57:20','2022-08-03 17:57:20',1,11),(2,'2022-08-03 17:57:22','2022-08-03 17:57:22',1,11),(3,'2022-08-03 17:57:22','2022-08-03 17:57:22',1,11),(6,'2022-08-10 06:56:31','2022-08-10 06:56:31',7,15),(7,'2022-08-10 06:56:37','2022-08-10 06:56:37',7,15),(8,'2022-08-10 06:56:43','2022-08-10 06:56:43',7,15),(9,'2022-08-10 06:56:46','2022-08-10 06:56:46',7,15),(10,'2022-08-10 06:56:56','2022-08-10 06:56:56',6,15),(11,'2022-08-10 06:57:01','2022-08-10 06:57:01',4,15),(12,'2022-08-10 06:57:01','2022-08-10 06:57:01',4,15),(13,'2022-08-10 06:57:01','2022-08-10 06:57:01',4,15),(14,'2022-08-10 06:57:02','2022-08-10 06:57:02',4,15),(15,'2022-08-10 06:57:02','2022-08-10 06:57:02',4,15),(16,'2022-08-10 06:57:02','2022-08-10 06:57:02',4,15),(17,'2022-08-10 06:57:02','2022-08-10 06:57:02',4,15),(18,'2022-08-10 06:57:10','2022-08-10 06:57:10',4,15),(20,'2022-08-10 06:57:22','2022-08-10 06:57:22',6,15),(21,'2022-08-10 06:57:31','2022-08-10 06:57:31',6,15),(22,'2022-08-10 06:57:37','2022-08-10 06:57:37',6,15),(25,'2022-08-10 06:57:56','2022-08-10 06:57:56',6,15),(26,'2022-08-10 06:58:15','2022-08-10 06:58:15',6,15),(27,'2022-08-10 06:58:47','2022-08-10 06:58:47',6,15),(29,'2022-08-10 14:00:12','2022-08-10 14:00:12',3,15),(53,'2022-08-10 14:41:33','2022-08-10 14:41:33',1,15),(54,'2022-08-10 14:44:24','2022-08-10 14:44:24',1,15),(55,'2022-08-10 14:44:26','2022-08-10 14:44:26',1,15),(56,'2022-08-10 14:44:30','2022-08-10 14:44:30',1,15),(57,'2022-08-10 14:44:35','2022-08-10 14:44:35',1,15),(58,'2022-08-10 14:50:30','2022-08-10 14:50:30',8,15),(59,'2022-08-10 14:50:35','2022-08-10 14:50:35',8,15),(60,'2022-08-10 14:50:39','2022-08-10 14:50:39',8,15),(61,'2022-08-10 14:50:43','2022-08-10 14:50:43',8,15),(62,'2022-08-10 14:50:44','2022-08-10 14:50:44',8,15),(72,'2022-08-10 15:00:53','2022-08-10 15:00:53',9,15),(73,'2022-08-10 15:00:54','2022-08-10 15:00:54',9,15),(74,'2022-08-10 15:00:55','2022-08-10 15:00:55',9,15),(75,'2022-08-10 15:00:56','2022-08-10 15:00:56',9,15),(76,'2022-08-10 15:01:31','2022-08-10 15:01:31',9,15),(77,'2022-08-10 15:01:34','2022-08-10 15:01:34',9,15),(419,'2022-08-13 17:24:09','2022-08-13 17:24:09',12,1),(428,'2022-08-13 17:24:36','2022-08-13 17:24:36',6,1),(433,'2022-08-13 17:24:42','2022-08-13 17:24:42',3,1),(441,'2022-08-13 17:24:51','2022-08-13 17:24:51',1,1),(442,'2022-08-13 17:42:28','2022-08-13 17:42:28',12,1),(443,'2022-08-13 17:42:29','2022-08-13 17:42:29',12,1),(444,'2022-08-13 17:42:29','2022-08-13 17:42:29',12,1),(450,'2022-08-14 11:28:28','2022-08-14 11:28:28',11,1),(453,'2022-08-14 11:44:16','2022-08-14 11:44:16',14,17),(454,'2022-08-14 11:44:24','2022-08-14 11:44:24',14,17),(455,'2022-08-14 11:44:25','2022-08-14 11:44:25',14,17),(456,'2022-08-14 11:44:25','2022-08-14 11:44:25',14,17),(460,'2022-08-14 11:44:30','2022-08-14 11:44:30',11,17),(465,'2022-08-14 11:44:41','2022-08-14 11:44:41',11,17),(466,'2022-08-14 11:44:42','2022-08-14 11:44:42',11,17),(467,'2022-08-14 11:44:42','2022-08-14 11:44:42',11,17),(468,'2022-08-14 11:44:48','2022-08-14 11:44:48',8,17),(469,'2022-08-14 11:44:48','2022-08-14 11:44:48',8,17),(470,'2022-08-14 11:44:48','2022-08-14 11:44:48',8,17),(471,'2022-08-14 11:44:49','2022-08-14 11:44:49',8,17),(472,'2022-08-14 11:44:53','2022-08-14 11:44:53',12,17),(473,'2022-08-14 11:44:53','2022-08-14 11:44:53',12,17),(474,'2022-08-14 11:44:54','2022-08-14 11:44:54',12,17),(475,'2022-08-14 11:44:54','2022-08-14 11:44:54',12,17),(476,'2022-08-14 11:45:09','2022-08-14 11:45:09',14,17),(477,'2022-08-14 11:45:10','2022-08-14 11:45:10',14,17),(478,'2022-08-14 11:45:10','2022-08-14 11:45:10',14,17);
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `text` varchar(255) DEFAULT NULL,
  `tag` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'dsqd','dsqds','Annonce','http://localhost:8080/images/Admin.png1659549431720.png','2022-08-03 17:57:11','2022-08-03 17:57:11',11),(2,'dsqdsd','sqdsqd','Annonce','http://localhost:8080/images/téléchargement.jpg1659557766207.jpg','2022-08-03 20:16:06','2022-08-03 20:16:06',13),(3,'dsqdsq','dsdsqd','Annonce','http://localhost:8080/images/utilisateur.png1659557962840.png','2022-08-03 20:19:22','2022-08-03 20:19:22',13),(4,'dsqds','dsqd','Annonce','http://localhost:8080/images/téléchargement.jpg1659558579235.jpg','2022-08-03 20:29:39','2022-08-03 20:29:39',13),(6,'sdsq','sqds','Annonce','http://localhost:8080/images/téléchargement.jpg1659645924339.jpg','2022-08-04 20:45:24','2022-08-04 20:45:24',2),(7,'mon post 2','lallaa','Transport','http://localhost:8080/images/téléchargement.jpg1660114518721.jpg','2022-08-10 06:54:27','2022-08-10 06:55:18',15),(8,'dsq','dsqd','Annonce','http://localhost:8080/images/téléchargement.jpg1660143025345.jpg','2022-08-10 14:50:25','2022-08-10 14:50:25',15),(9,'sdsqd','dsqds','Annonce','http://localhost:8080/images/Admin.png1660143063875.png','2022-08-10 14:51:03','2022-08-10 14:51:03',15),(11,'j\'ai changé mon titre !  YES !','et mon post aussi ! YES !','Annonce','http://localhost:8080/images/utilisateur.png1660498368389.png','2022-08-12 20:34:18','2022-08-14 17:32:48',1),(12,'mon titre','mon contenu','Annonce','http://localhost:8080/images/utilisateur.png1660406856698.png','2022-08-12 20:41:56','2022-08-13 16:07:36',1),(13,'lalal','lazzersdsq','Annonce','http://localhost:8080/images/Admin.png1660475655746.png','2022-08-14 11:14:15','2022-08-14 11:14:15',1),(14,'je suis la','et ça marche !','Trucs et astuces','http://localhost:8080/images/Admin.png1660477454764.png','2022-08-14 11:44:14','2022-08-14 11:44:14',17);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tags` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
INSERT INTO `tags` VALUES (1,'Annonce'),(2,'RH'),(3,'Trucs et astuces'),(4,'Transport'),(5,'Fun'),(6,'Bonnes adresses'),(7,'CSE / Avantages'),(8,'Question'),(9,'Culture'),(10,'Divertissement');
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tutorials`
--

DROP TABLE IF EXISTS `tutorials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tutorials` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `published` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tutorials`
--

LOCK TABLES `tutorials` WRITE;
/*!40000 ALTER TABLE `tutorials` DISABLE KEYS */;
/*!40000 ALTER TABLE `tutorials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `emailAddress` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `fonction` varchar(255) DEFAULT NULL,
  `site` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `emailAddress` (`emailAddress`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'utilisateur','supprimé','test6.groupoconnect@groupomania.com','$2b$10$DAUx5IO5RBqVNacwx9gqjeH0wzIDHL8NQQjPPWUFUUC2tOEUTy99y','deleted','dsqds','dsqds','http://localhost:8080/images/Snapchat-844322940.jpg1659543953001.jpg','2022-08-03 16:25:45','2022-08-14 17:54:56'),(2,'dsqd','dsqd','test1.groupoconnect@groupomania.com','$2b$10$tfKAmV/3hSRgILFcbY8Thun9216X8Mz5NfypLWL61uymlYz3QInzC','user','dsqdd','sqds','http://localhost:8080/images/téléchargement.jpg1659544126858.jpg','2022-08-03 16:28:41','2022-08-03 16:28:46'),(3,'dsqd','dsqdds','test2.groupoconnect@groupomania.com','$2b$10$GqTgXitr33y9PpYW5W5v/ufWgpNiaHg9qu7a/kt5P.FQy47FvM9JG','user','qd','dsqdsq','http://localhost:8080/images/téléchargement.jpg1659544321097.jpg','2022-08-03 16:29:18','2022-08-03 16:32:01'),(4,'sqd','dsqdd','test3.groupoconnect@groupomania.com','$2b$10$PTjdS/sQkgiFZTWdoAznZ.m2XFtnM6Rq11QPBm.GXPRY1WTKULoVu','user','sqd','dsqdsq','http://localhost:8080/images/téléchargement.jpg1659544475085.jpg','2022-08-03 16:32:31','2022-08-03 16:34:35'),(5,'dsqdsq','dsqd','erezr@groupomania.com','$2b$10$mYg8ndJvCQabeBHWK/Lh/ucq6YH5E5RGq7m8EzfErgjr4LNeRVTBq','user','dsqd','dsqds','http://localhost:8080/images/téléchargement.jpg1659544952207.jpg','2022-08-03 16:37:54','2022-08-03 16:42:32'),(6,'sdqd','sqd','sdqdsqd@groupomania.com','$2b$10$qqWHtVNtZEbGSwZ1sQ9xmu1p1WShY.ru2I53KJi/SfGeuoNBFMBPW','user','dsqd','dsqds','http://localhost:8080/images/téléchargement.jpg1659545007050.jpg','2022-08-03 16:43:22','2022-08-03 16:43:27'),(7,'dssfd','fdsf','test50.groupoconnect@groupomania.com','$2b$10$u2mli.9smpTidb4rYyZYQ.4AmGdg69shYfdy2Fm0C6PetS9JLpolm','user','dsfd','fdsfd','http://localhost:8080/images/téléchargement.jpg1659545179468.jpg','2022-08-03 16:46:12','2022-08-03 16:46:19'),(8,'sdqdd','sqd','testdffds@groupomania.com','$2b$10$CvNfxnbMNHluNgxnYI3VPeiNc3vQ1zMsr3MvNuY0LhUijGF0spHeu','user','dsqd','dsqds','http://localhost:8080/images/téléchargement.jpg1659545297734.jpg','2022-08-03 16:47:01','2022-08-03 16:48:17'),(9,'dsqdsd','sqd','dsdsq@groupomania.com','$2b$10$pPLNZ7NOUxwO8xNV1zhaouxcpLVPRmFk9CgpbRuREn7.LnrfX6AoS','user','dsqd','dsdsq','http://localhost:8080/images/Admin.png1659545341140.png','2022-08-03 16:48:54','2022-08-03 16:49:01'),(10,'dsqd','dsqd','testheaders@groupomania.com','$2b$10$rWgb.P7JhfpB.ctyMbCWWuDoAC07wnkG/qXDWfbVmsDlCupQLlKGW','user','dsq','dsqd','http://localhost:8080/images/Admin.png1659545658589.png','2022-08-03 16:52:46','2022-08-03 16:54:18'),(11,'dsqdd','sqdd','testauth@groupomania.com','$2b$10$4S51Y4pWduZ3JxbcEsP6s.UI5/z.l4Qh8H0o/cTXnUL0fftzdvTwG','user','sqdsds','dsds','http://localhost:8080/images/téléchargement.jpg1659545895804.jpg','2022-08-03 16:58:09','2022-08-03 16:58:15'),(12,'dsqd','dsq','lala@groupomania.com','$2b$10$ut.ZeEVO1wHF/dA5lIpayuqzfJtsYmdhceNdU8RVfLIMBzStM.GzC','user','dsq','dsq','http://localhost:8080/images/téléchargement.jpg1659549811818.jpg','2022-08-03 18:03:26','2022-08-03 18:03:31'),(13,'sdfdsf','fdsfd','e.e@groupomania.com','$2b$10$ymJg.oLgj35UqJho5FBSdeLZR/ktWSgANHoLskZ1rYwhdsV7anUEa','user','fdsfdff','dsfdf','http://localhost:8080/images/téléchargement.jpg1659557141249.jpg','2022-08-03 20:05:29','2022-08-03 20:05:41'),(14,'qdds','dd','tralala@groupomania.com','$2b$10$3wTn9dKLsZtAx7noO/Tb9uhXN4n2tVICy.4UrFg9cLg3uzFoDZrW6','user','sdsds','qds','http://localhost:8080/images/téléchargement.jpg1659644720679.jpg','2022-08-04 20:25:07','2022-08-04 20:25:20'),(15,'jb','mentorat','test.mentorat@groupomania.com','$2b$10$u9Meg6PxgRMIAnv1Me6DZeU8t59G8mH48c48prF0ul7D.7JY7clCm','user','dev','paris','http://localhost:8080/images/téléchargement.jpg1660114174896.jpg','2022-08-10 06:48:47','2022-08-10 06:49:34'),(17,'jb','mabit','testfinal@groupomania.com','$2b$10$o23yHtwxQlNS5owbB5aFIe6uVjf747Xbq0lZpn05.CMeZcI0Rdob6','user','dev','groupomani','http://localhost:8080/images/utilisateur.png1660477403239.png','2022-08-14 11:33:07','2022-08-14 11:43:23'),(18,'Admin','Groupoconnect','admin.groupoconnect@groupomania.com','$2b$10$ywh2wDWEcgw7Kn3Yg1FKg.hGyrUUCkQvSbVKBnvXNvCYwgyQtsyNi','admin','Administrateur','ici','http://localhost:8080/images/Admin.png1660499373222.png','2022-08-14 17:49:18','2022-08-14 17:49:33');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-14 19:58:00
