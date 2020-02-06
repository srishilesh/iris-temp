CREATE DATABASE  IF NOT EXISTS `iris_db` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `iris_db`;
-- MySQL dump 10.13  Distrib 8.0.17, for Win64 (x86_64)
--
-- Host: iris-se-database.mysql.database.azure.com    Database: iris_db
-- ------------------------------------------------------
-- Server version	5.6.42.0

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
-- Table structure for table `emp_attendance`
--

DROP TABLE IF EXISTS `emp_attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emp_attendance` (
  `f_roll` varchar(20) NOT NULL,
  `f_email` varchar(50) NOT NULL,
  `f_date` varchar(10) NOT NULL,
  `attd_status` varchar(5) DEFAULT NULL,
  `leave_type` varchar(10) DEFAULT NULL,
  `leave_reason` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`f_email`,`f_date`,`f_roll`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emp_attendance`
--

LOCK TABLES `emp_attendance` WRITE;
/*!40000 ALTER TABLE `emp_attendance` DISABLE KEYS */;
INSERT INTO `emp_attendance` VALUES ('1235','egayu3@gmail.com','1/15/2020','0','2','ffff'),('1234','srishilesh@gmail.com','1/10/2020','1','-1',NULL),('1234','srishilesh@gmail.com','1/11/2020','0','0','summa'),('1234','srishilesh@gmail.com','1/12/2020','0','0','simply'),('1234','srishilesh@gmail.com','1/13/2020','0','1','teaching in other school'),('1234','srishilesh@gmail.com','1/14/2020','0','1','outing'),('1234','srishilesh@gmail.com','1/15/2020','0','2','madurai trip'),('1234','srishilesh@gmail.com','1/16/2020','0','0','goa trip'),('1234 ','srishilesh@gmail.com','1/17/2020','1','-1',NULL),('1234','srishilesh@gmail.com','1/18/2020','0','2','fever'),('1234','srishilesh@gmail.com','1/19/2020','0','3','ff'),('1234','srishilesh@gmail.com','1/8/2020','1','-1',NULL),('1234','srishilesh@gmail.com','1/9/2020','1','-1',NULL);
/*!40000 ALTER TABLE `emp_attendance` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-02-06 22:29:05
