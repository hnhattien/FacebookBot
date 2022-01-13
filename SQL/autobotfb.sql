-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jan 13, 2022 at 01:42 AM
-- Server version: 5.7.36
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `autobotfb`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
CREATE TABLE IF NOT EXISTS `account` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `createAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`id`, `username`, `password`, `createAt`, `updateAt`) VALUES
(1, 'dsfsa', 'asdas', '2022-01-08 21:28:51', '2022-01-08 21:28:51'),
(2, 'f', 'fggggggggggggggvbvb', '2022-01-08 22:15:30', '2022-01-08 22:15:30'),
(3, 'kei', 'aloocated', '2022-01-08 22:20:54', '2022-01-08 22:20:54'),
(4, 'nagaikei', 'alloatec', '2022-01-08 22:22:53', '2022-01-08 22:22:53'),
(5, 'gfgf', 'ffsfs', '2022-01-09 11:00:35', '2022-01-09 11:00:35'),
(6, 'sdasdasda', 'ffsfssadada', '2022-01-09 11:01:52', '2022-01-11 16:55:08'),
(18, 'phamhuytin1504@gmail.com', 'Javascript01', '2022-01-11 16:53:51', '2022-01-11 16:53:51');

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
CREATE TABLE IF NOT EXISTS `post` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT,
  `text` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` text COLLATE utf8mb4_unicode_ci,
  `createAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`id`, `text`, `image`, `createAt`, `updateAt`) VALUES
(7, 'Kei', '1641830711520.Screenshot_2.png', '2022-01-10 23:05:11', '2022-01-10 23:05:11'),
(8, 'adad', '1641831315093.Screenshot_2.png', '2022-01-10 23:15:15', '2022-01-10 23:15:15'),
(9, 'adad', '1641831492135.Screenshot_6.png', '2022-01-10 23:18:12', '2022-01-10 23:18:12'),
(10, 'asdas', '1641831658340.Screenshot_3.png', '2022-01-10 23:20:58', '2022-01-10 23:20:58'),
(11, 'asdas', '1641898561468.download.jpg', '2022-01-10 23:22:24', '2022-01-10 23:22:24'),
(19, 'Kei', NULL, '2022-01-11 17:57:53', '2022-01-11 17:57:53'),
(17, 'Keiiskdkada', '1641895073680.download.jpg', '2022-01-11 16:55:40', '2022-01-11 17:56:26');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
