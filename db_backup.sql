-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: projet7
-- ------------------------------------------------------
-- Server version	8.0.28

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
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `text` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'qsds','dsqd dsq ','2022-02-22 18:41:26','2022-02-22 18:41:26'),(2,'Post 2','sdqsdsqds','2022-02-25 10:16:09','2022-02-25 10:16:09'),(3,'fds','fdsssssssssssssssssssssssssssssssssdsfdsfdsfdfdsfdsfdfdsfdsfdsfdsfdsfdsfdsfsdf','2022-03-01 14:50:21','2022-03-01 14:50:21'),(4,'fds','fdsssssssssssssssssssssssssssssssssdsfdsfdsfdfdsfdsfdfdsfdsfdsfdsfdsfdsfdsfsdf','2022-03-01 14:50:22','2022-03-01 14:50:22'),(5,'fds','fdsssssssssssssssssssssssssssssssssdsfdsfdsfdfdsfdsfdfdsfdsfdsfdsfdsfdsfdsfsdf','2022-03-01 14:50:23','2022-03-01 14:50:23'),(6,'Loremipsoum','Loremipsumdolorsitamet','2022-03-01 14:52:09','2022-03-01 14:52:09'),(7,'Lorem ipsoum','Loremipsumdolorsitamet','2022-03-01 14:52:20','2022-03-01 14:52:20'),(8,'Lorem ipsoum','Lorem ipsumdolorsitamet','2022-03-01 14:52:32','2022-03-01 14:52:32');
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
  `imageUrl` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `emailAddress` (`emailAddress`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,NULL,NULL,'test1.groupoconnect@groupomania.com','$2b$10$y5lh76YSy6YRJ9/DaaziOuKN0wM7NMQp4pSOFnt//jiBzRvgzOXaC','newUser',NULL,NULL,NULL,'2022-05-17 17:36:06','2022-05-17 17:36:06'),(4,NULL,NULL,'test2.groupoconnect@groupomania.com','$2b$10$o69SQfKOcoMqMLnqeYj5TeXU1mPL1HMFlRoNbcQYcoi9v/UExgZg2','newUser',NULL,NULL,NULL,'2022-05-17 17:40:44','2022-05-17 17:40:44'),(5,NULL,NULL,'test3.groupoconnect@groupomania.com','$2b$10$xgl6uEorvOLDQc2wcXS7Eeoxx4y2AqoGBkLloGChNkz5ptiBLhQ3C','newUser',NULL,NULL,NULL,'2022-05-17 17:43:38','2022-05-17 17:43:38'),(7,NULL,NULL,'test4.groupoconnect@groupomania.com','$2b$10$MhK03guUlZ7kv5X2gleZkuT31SwkUeQNztWih0za7zdl.5w8VmjYm','newUser',NULL,NULL,NULL,'2022-05-17 20:15:01','2022-05-17 20:15:01'),(8,NULL,NULL,'test5.groupoconnect@groupomania.com','$2b$10$.Dg5ousTy1eWf1XcZIOf4ebGm6UXWSOd/QosPHyUSYe9QHrMRptjW','newUser',NULL,NULL,NULL,'2022-05-17 20:20:55','2022-05-17 20:20:55'),(9,NULL,NULL,'test6.groupoconnect@groupomania.com','$2b$10$SC3Df/0KoYMjqXM/da8MBOhlyXsO8CmbHU6LTUyjImIVzfiDWRBsO','newUser',NULL,NULL,NULL,'2022-05-17 20:22:37','2022-05-17 20:22:37'),(11,NULL,NULL,'test7.groupoconnect@groupomania.com','$2b$10$EceWnrDtqY2lUuYnuPguNOAVcd2Gf/8DqiM4jLKQueHbpkDyH/Hk2','newUser',NULL,NULL,NULL,'2022-05-17 20:27:36','2022-05-17 20:27:36'),(12,NULL,NULL,'test8.groupoconnect@groupomania.com','$2b$10$UznYFaWzpESWjNJyldffoeQhBxSZAP0I7EHqFRhLPP8A3DiRLBvv.','newUser',NULL,NULL,NULL,'2022-05-17 20:28:25','2022-05-17 20:28:25'),(14,NULL,NULL,'test9.groupoconnect@groupomania.com','$2b$10$qGaNdZPVBdC8xpUX7ctftev1a7VFYgdo0a1gzy7OS.g9MNi2d1wc6','newUser',NULL,NULL,NULL,'2022-05-17 20:33:02','2022-05-17 20:33:02'),(15,NULL,NULL,'test10.groupoconnect@groupomania.com','$2b$10$f4BVbrL5jjkmO2d6GupLwOYzxtsiGe5xVBNfw66j691Wxoj2SBenK','newUser',NULL,NULL,NULL,'2022-05-25 21:02:06','2022-05-25 21:02:06'),(29,'sqdsq','sqd','test11.groupoconnect@groupomania.com','$2b$10$jGqrPPi3cko/dpYLcDg/1OA8NXkTHXhtE7U.1B.2yMrZUEIJHzUCC','newUser','dsq','dsq',NULL,'2022-05-26 17:32:29','2022-05-26 17:45:17'),(30,'jb','mab','test12.groupoconnect@groupomania.com','$2b$10$mLt7rfh5wa5nHRt5/XXNeul3Y.YagaodFkgVQLgoNdSCaoZzN7DnK','newUser','PDG','Paris','blob:http://localhost:3000/f4c12e12-b458-45e5-a730-e6e72cd8effc','2022-05-27 18:18:31','2022-05-27 18:18:47');
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

-- Dump completed on 2022-05-27 22:09:37
