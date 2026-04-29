-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 29, 2026 at 06:22 AM
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
-- Table structure for table `settings_designation`
--

CREATE TABLE `settings_designation` (
  `designation_aid` int(11) NOT NULL,
  `designation_is_active` tinyint(4) NOT NULL,
  `designation_name` varchar(255) NOT NULL,
  `designation_category_id` varchar(20) NOT NULL,
  `designation_created` datetime NOT NULL,
  `designation_updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `settings_designation`
--

INSERT INTO `settings_designation` (`designation_aid`, `designation_is_active`, `designation_name`, `designation_category_id`, `designation_created`, `designation_updated`) VALUES
(1, 1, 'seb123', '5', '2026-04-29 09:04:42', '2026-04-29 09:04:56');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `settings_designation`
--
ALTER TABLE `settings_designation`
  ADD PRIMARY KEY (`designation_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `settings_designation`
--
ALTER TABLE `settings_designation`
  MODIFY `designation_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
