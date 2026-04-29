-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 29, 2026 at 06:23 AM
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
-- Table structure for table `settings_category`
--

CREATE TABLE `settings_category` (
  `category_aid` int(11) NOT NULL,
  `category_is_active` tinyint(4) NOT NULL,
  `category_name` varchar(255) NOT NULL,
  `category_description` varchar(255) NOT NULL,
  `category_created` datetime NOT NULL,
  `category_updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `settings_category`
--

INSERT INTO `settings_category` (`category_aid`, `category_is_active`, `category_name`, `category_description`, `category_created`, `category_updated`) VALUES
(5, 1, 'Feeding Program', 'Weekly Community Development Program... ', '2026-04-28 14:04:29', '2026-04-28 14:04:22'),
(10, 1, 'test', 'test', '2026-04-29 09:04:42', '2026-04-29 09:04:42');

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

-- --------------------------------------------------------

--
-- Table structure for table `settings_notification`
--

CREATE TABLE `settings_notification` (
  `notification_aid` int(11) NOT NULL,
  `notification_is_active` tinyint(4) NOT NULL,
  `notification_name` varchar(255) NOT NULL,
  `notification_email` varchar(255) NOT NULL,
  `notification_phone` varchar(15) NOT NULL,
  `notification_purpose` varchar(255) NOT NULL,
  `notification_created` datetime NOT NULL,
  `notification_updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `settings_notification`
--

INSERT INTO `settings_notification` (`notification_aid`, `notification_is_active`, `notification_name`, `notification_email`, `notification_phone`, `notification_purpose`, `notification_created`, `notification_updated`) VALUES
(4, 1, 'awd', 'awda', '0912333333', 'For Donation Receipt', '2026-04-29 10:04:13', '2026-04-29 12:04:08');

-- --------------------------------------------------------

--
-- Table structure for table `settings_roles`
--

CREATE TABLE `settings_roles` (
  `role_aid` int(11) NOT NULL,
  `role_is_active` tinyint(4) NOT NULL,
  `role_name` varchar(128) NOT NULL,
  `role_description` text NOT NULL,
  `role_created` datetime NOT NULL,
  `role_updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `settings_roles`
--

INSERT INTO `settings_roles` (`role_aid`, `role_is_active`, `role_name`, `role_description`, `role_created`, `role_updated`) VALUES
(5, 1, 'admin', 'admin description', '2026-04-28 07:04:49', '2026-04-28 07:04:49'),
(6, 1, 'developer', 'developer description\n', '2026-04-28 07:04:02', '2026-04-28 07:04:02');

-- --------------------------------------------------------

--
-- Table structure for table `settings_system`
--

CREATE TABLE `settings_system` (
  `system_aid` int(11) NOT NULL,
  `system_is_active` tinyint(4) NOT NULL,
  `system_first_name` varchar(255) NOT NULL,
  `system_last_name` varchar(255) NOT NULL,
  `system_email` varchar(255) NOT NULL,
  `system_role_id` varchar(20) NOT NULL,
  `system_created` datetime NOT NULL,
  `system_updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `settings_system`
--

INSERT INTO `settings_system` (`system_aid`, `system_is_active`, `system_first_name`, `system_last_name`, `system_email`, `system_role_id`, `system_created`, `system_updated`) VALUES
(11, 1, 'John 123', 'Doe 123', 'john@gmail.commm', '5', '2026-04-28 14:04:17', '2026-04-28 14:04:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `settings_category`
--
ALTER TABLE `settings_category`
  ADD PRIMARY KEY (`category_aid`);

--
-- Indexes for table `settings_designation`
--
ALTER TABLE `settings_designation`
  ADD PRIMARY KEY (`designation_aid`);

--
-- Indexes for table `settings_notification`
--
ALTER TABLE `settings_notification`
  ADD PRIMARY KEY (`notification_aid`);

--
-- Indexes for table `settings_roles`
--
ALTER TABLE `settings_roles`
  ADD PRIMARY KEY (`role_aid`);

--
-- Indexes for table `settings_system`
--
ALTER TABLE `settings_system`
  ADD PRIMARY KEY (`system_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `settings_category`
--
ALTER TABLE `settings_category`
  MODIFY `category_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `settings_designation`
--
ALTER TABLE `settings_designation`
  MODIFY `designation_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `settings_notification`
--
ALTER TABLE `settings_notification`
  MODIFY `notification_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `settings_roles`
--
ALTER TABLE `settings_roles`
  MODIFY `role_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `settings_system`
--
ALTER TABLE `settings_system`
  MODIFY `system_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
