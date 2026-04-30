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
-- Table structure for table `donor`
--

CREATE TABLE `donor` (
  `donor_aid` int(11) NOT NULL,
  `donor_is_active` tinyint(4) NOT NULL,
  `donor_name` varchar(255) NOT NULL,
  `donor_email` varchar(255) NOT NULL,
  `donor_contact` varchar(255) NOT NULL,
  `donor_address` varchar(255) NOT NULL,
  `donor_city` varchar(255) NOT NULL,
  `donor_province` varchar(255) NOT NULL,
  `donor_country` varchar(255) NOT NULL,
  `donor_zip` int(10) NOT NULL,
  `donor_created` datetime NOT NULL,
  `donor_updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `donor`
--

INSERT INTO `donor` (`donor_aid`, `donor_is_active`, `donor_name`, `donor_email`, `donor_contact`, `donor_address`, `donor_city`, `donor_province`, `donor_country`, `donor_zip`, `donor_created`, `donor_updated`) VALUES
(1, 0, 'test', 'test@gmail.com', '09369515764', 'Sitio 8', 'San Pablo City', 'Laguna', 'Philippines', 4000, '2026-04-30 14:20:07', '2026-04-30 14:30:07'),
(2, 1, 'Seb Mojica', 'sebmojica@gmail.com', '09123123123', 'Sitio 8', 'San Pablo City', 'Laguna', 'Philippines', 4000, '2026-04-30 14:29:48', '2026-04-30 14:30:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `donor`
--
ALTER TABLE `donor`
  ADD PRIMARY KEY (`donor_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `donor`
--
ALTER TABLE `donor`
  MODIFY `donor_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
