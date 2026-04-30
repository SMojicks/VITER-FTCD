-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 30, 2026 at 08:30 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `viter_ftcd_v1`
--

-- --------------------------------------------------------

--
-- Table structure for table `childrenlist`
--

CREATE TABLE `childrenlist` (
  `childrenList_aid` int(11) NOT NULL,
  `childrenList_is_active` tinyint(4) NOT NULL,
  `childrenList_name` varchar(255) NOT NULL,
  `childrenList_birthday` datetime NOT NULL,
  `childrenList_age` int(11) NOT NULL,
  `childrenList_residency` varchar(255) NOT NULL,
  `childrenList_limit` double NOT NULL,
  `childrenList_story` text NOT NULL,
  `childrenList_created` datetime NOT NULL,
  `childrenList_updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `childrenlist`
--

INSERT INTO `childrenlist` (`childrenList_aid`, `childrenList_is_active`, `childrenList_name`, `childrenList_birthday`, `childrenList_age`, `childrenList_residency`, `childrenList_limit`, `childrenList_story`, `childrenList_created`, `childrenList_updated`) VALUES
(5, 1, 'ttttt', '2019-01-29 00:00:00', 7, '', 123, '123', '2026-04-30 13:04:49', '2026-04-30 13:04:58'),
(6, 1, 'test', '2020-03-04 00:00:00', 6, '1', 123, 'awd', '2026-04-30 13:04:57', '2026-04-30 13:04:11');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `childrenlist`
--
ALTER TABLE `childrenlist`
  ADD PRIMARY KEY (`childrenList_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `childrenlist`
--
ALTER TABLE `childrenlist`
  MODIFY `childrenList_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
