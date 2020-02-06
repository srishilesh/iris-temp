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
-- Table structure for table `student_attendance`
--

DROP TABLE IF EXISTS `student_attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_attendance` (
  `s_roll` varchar(20) NOT NULL,
  `f_email` varchar(50) DEFAULT NULL,
  `department` varchar(10) DEFAULT NULL,
  `section` varchar(5) DEFAULT NULL,
  `semester` varchar(5) DEFAULT NULL,
  `batch` varchar(10) DEFAULT NULL,
  `c_date` varchar(10) NOT NULL,
  `c_period` varchar(10) NOT NULL,
  `attd_status` varchar(5) DEFAULT NULL,
  `course_code` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`s_roll`,`c_date`,`c_period`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_attendance`
--

LOCK TABLES `student_attendance` WRITE;
/*!40000 ALTER TABLE `student_attendance` DISABLE KEYS */;
INSERT INTO `student_attendance` VALUES ('s422','egayu3@gmail.com','cse','b','6','2017','1/15/2020','2','2','15cse363'),('s453','srishilesh@gmail.com','cse','e','6','2017','1/12/2020','2','1','15cse381'),('s453','srishilesh@gmail.com','cse','e','6','2017','1/13/2020','3','0','15cse381'),('s453','sanjay311999@gmail.com','cse','e','6','2017','1/18/2020','2','1','15cse381'),('s454','srishilesh@gmail.com','cse','e','6','2017','1/12/2020','2','1','15cse381'),('s454','srishilesh@gmail.com','cse','e','6','2017','1/13/2020','3','1','15cse381'),('s456','srishilesh@gmail.com','cse','e','6','2017','1/12/2020','2','1','15cse381'),('s457','srishilesh@gmail.com','cse','e','6','2017','1/12/2020','2','0','15cse381'),('s458','srishilesh@gmail.com','cse','e','6','2017','1/12/2020','2','2','15cse381'),('s553','name@gmail.com','eee','a','6','2018','1/12/2020','4','1','15eee301');
/*!40000 ALTER TABLE `student_attendance` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-02-06 22:28:49
