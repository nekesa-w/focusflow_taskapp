-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 25, 2025 at 07:59 AM
-- Server version: 11.4.4-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `taskapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `auth_group`
--

CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_group_permissions`
--

CREATE TABLE `auth_group_permissions` (
  `id` bigint(20) NOT NULL,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_permission`
--

CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(1, 'Can add log entry', 1, 'add_logentry'),
(2, 'Can change log entry', 1, 'change_logentry'),
(3, 'Can delete log entry', 1, 'delete_logentry'),
(4, 'Can view log entry', 1, 'view_logentry'),
(5, 'Can add permission', 2, 'add_permission'),
(6, 'Can change permission', 2, 'change_permission'),
(7, 'Can delete permission', 2, 'delete_permission'),
(8, 'Can view permission', 2, 'view_permission'),
(9, 'Can add group', 3, 'add_group'),
(10, 'Can change group', 3, 'change_group'),
(11, 'Can delete group', 3, 'delete_group'),
(12, 'Can view group', 3, 'view_group'),
(13, 'Can add content type', 4, 'add_contenttype'),
(14, 'Can change content type', 4, 'change_contenttype'),
(15, 'Can delete content type', 4, 'delete_contenttype'),
(16, 'Can view content type', 4, 'view_contenttype'),
(17, 'Can add session', 5, 'add_session'),
(18, 'Can change session', 5, 'change_session'),
(19, 'Can delete session', 5, 'delete_session'),
(20, 'Can view session', 5, 'view_session'),
(21, 'Can add user', 6, 'add_customuser'),
(22, 'Can change user', 6, 'change_customuser'),
(23, 'Can delete user', 6, 'delete_customuser'),
(24, 'Can view user', 6, 'view_customuser'),
(25, 'Can add task', 7, 'add_task'),
(26, 'Can change task', 7, 'change_task'),
(27, 'Can delete task', 7, 'delete_task'),
(28, 'Can view task', 7, 'view_task'),
(29, 'Can add subtask', 8, 'add_subtask'),
(30, 'Can change subtask', 8, 'change_subtask'),
(31, 'Can delete subtask', 8, 'delete_subtask'),
(32, 'Can view subtask', 8, 'view_subtask'),
(33, 'Can add auth token', 9, 'add_authtoken'),
(34, 'Can change auth token', 9, 'change_authtoken'),
(35, 'Can delete auth token', 9, 'delete_authtoken'),
(36, 'Can view auth token', 9, 'view_authtoken');

-- --------------------------------------------------------

--
-- Table structure for table `django_admin_log`
--

CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext DEFAULT NULL,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) UNSIGNED NOT NULL CHECK (`action_flag` >= 0),
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `django_content_type`
--

CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(1, 'admin', 'logentry'),
(3, 'auth', 'group'),
(2, 'auth', 'permission'),
(4, 'contenttypes', 'contenttype'),
(9, 'knox', 'authtoken'),
(5, 'sessions', 'session'),
(6, 'taskapp', 'customuser'),
(8, 'taskapp', 'subtask'),
(7, 'taskapp', 'task');

-- --------------------------------------------------------

--
-- Table structure for table `django_migrations`
--

CREATE TABLE `django_migrations` (
  `id` bigint(20) NOT NULL,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'contenttypes', '0001_initial', '2024-12-31 14:35:02.479556'),
(2, 'contenttypes', '0002_remove_content_type_name', '2024-12-31 14:35:02.613868'),
(3, 'auth', '0001_initial', '2024-12-31 14:35:03.156470'),
(4, 'auth', '0002_alter_permission_name_max_length', '2024-12-31 14:35:03.304887'),
(5, 'auth', '0003_alter_user_email_max_length', '2024-12-31 14:35:03.319601'),
(6, 'auth', '0004_alter_user_username_opts', '2024-12-31 14:35:03.334676'),
(7, 'auth', '0005_alter_user_last_login_null', '2024-12-31 14:35:03.357358'),
(8, 'auth', '0006_require_contenttypes_0002', '2024-12-31 14:35:03.376889'),
(9, 'auth', '0007_alter_validators_add_error_messages', '2024-12-31 14:35:03.681200'),
(10, 'auth', '0008_alter_user_username_max_length', '2024-12-31 14:35:03.696926'),
(11, 'auth', '0009_alter_user_last_name_max_length', '2024-12-31 14:35:03.707233'),
(12, 'auth', '0010_alter_group_name_max_length', '2024-12-31 14:35:03.754645'),
(13, 'auth', '0011_update_proxy_permissions', '2024-12-31 14:35:03.771218'),
(14, 'auth', '0012_alter_user_first_name_max_length', '2024-12-31 14:35:03.777476'),
(15, 'taskapp', '0001_initial', '2024-12-31 14:35:04.643059'),
(16, 'admin', '0001_initial', '2024-12-31 14:35:04.865028'),
(17, 'admin', '0002_logentry_remove_auto_add', '2024-12-31 14:35:04.874719'),
(18, 'admin', '0003_logentry_add_action_flag_choices', '2024-12-31 14:35:04.886405'),
(19, 'sessions', '0001_initial', '2024-12-31 14:35:04.981098'),
(20, 'taskapp', '0002_alter_customuser_managers_alter_customuser_username', '2024-12-31 14:44:39.421653'),
(21, 'taskapp', '0003_alter_customuser_is_active_alter_customuser_is_staff_and_more', '2024-12-31 15:11:56.583950'),
(22, 'knox', '0001_initial', '2025-01-03 13:58:16.280264'),
(23, 'knox', '0002_auto_20150916_1425', '2025-01-03 13:58:16.462395'),
(24, 'knox', '0003_auto_20150916_1526', '2025-01-03 13:58:16.611863'),
(25, 'knox', '0004_authtoken_expires', '2025-01-03 13:58:16.671337'),
(26, 'knox', '0005_authtoken_token_key', '2025-01-03 13:58:16.790581'),
(27, 'knox', '0006_auto_20160818_0932', '2025-01-03 13:58:16.984045'),
(28, 'knox', '0007_auto_20190111_0542', '2025-01-03 13:58:17.037839'),
(29, 'knox', '0008_remove_authtoken_salt', '2025-01-03 13:58:17.104034'),
(30, 'knox', '0009_extend_authtoken_field', '2025-01-03 13:58:17.163899'),
(31, 'taskapp', '0004_alter_task_due_date', '2025-01-06 07:19:06.506426'),
(32, 'taskapp', '0002_remove_task_description', '2025-01-07 12:08:56.922413'),
(33, 'taskapp', '0003_alter_task_status', '2025-01-08 07:19:09.350920');

-- --------------------------------------------------------

--
-- Table structure for table `django_session`
--

CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_session`
--

INSERT INTO `django_session` (`session_key`, `session_data`, `expire_date`) VALUES
('e0ffuf2qpp9avjj9s3ci6vd4c27pqfge', '.eJxVjMsOwiAQRf-FtSEMD6Eu3fcbyAxMpWogKe3K-O_apAvd3nPOfYmI21ri1nmJcxYX4cTpdyNMD647yHestyZTq-syk9wVedAux5b5eT3cv4OCvXxrSKTRKE3BnpUPzrig2CXD2SLYARSxHRjZkYdkFGqYTAg0ASF4q7V4fwDMxzdR:1tVgWT:ypttB_irOoYQZ9XbAkAYYcq2anv-znHU-9C700RcG_g', '2025-01-23 00:35:41.909732');

-- --------------------------------------------------------

--
-- Table structure for table `knox_authtoken`
--

CREATE TABLE `knox_authtoken` (
  `digest` varchar(128) NOT NULL,
  `created` datetime(6) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `expiry` datetime(6) DEFAULT NULL,
  `token_key` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `knox_authtoken`
--

INSERT INTO `knox_authtoken` (`digest`, `created`, `user_id`, `expiry`, `token_key`) VALUES
('4f93e1e5f8eadfc8db669a219db85002672017b9272db6edb6594cd2eeac4239bb814195a7a1117ad78fd13b9c82686a7192b7c357aa72caab1125d792cdf671', '2025-01-15 06:15:51.413432', 14, '2025-01-15 16:15:51.411525', 'b0dd0b556621140');

-- --------------------------------------------------------

--
-- Table structure for table `taskapp_customuser`
--

CREATE TABLE `taskapp_customuser` (
  `id` bigint(20) NOT NULL,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `username` varchar(200) DEFAULT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `email` varchar(200) NOT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `taskapp_customuser`
--

INSERT INTO `taskapp_customuser` (`id`, `password`, `last_login`, `username`, `first_name`, `last_name`, `date_joined`, `email`, `is_superuser`, `is_staff`, `is_active`) VALUES
(5, 'pbkdf2_sha256$870000$cQavA0Qkeqf2cpSDjY2j7Z$xB51bhCCO/uDG1m9J4a1pPFtYchcQ5ctjxqx4Qz0pMM=', '2025-01-09 00:35:41.903360', NULL, '', '', '2025-01-03 08:43:10.517643', 'admin@focusflow.com', 1, 1, 1),
(6, 'pbkdf2_sha256$870000$iTicIC3HQ253o5cslKhnCo$k2NgqJn/FUdhetkdJ+qmQtolPz3oMwnRFgUAY5n/vuY=', NULL, NULL, 'Jane', 'Testing', '2025-01-03 12:11:41.824292', 'testing@gmail.com', 0, 0, 1),
(7, 'pbkdf2_sha256$870000$PCiSLUIgxXEwwK5uj2PNim$beNNTz5qufz0mrQDytPYZ8bOPPAvQ1TXjKevNAtSiYg=', '2025-01-15 05:20:49.482453', NULL, 'Johnny', 'Test', '2025-01-03 16:21:58.443151', 'test@n.com', 0, 0, 1),
(12, 'pbkdf2_sha256$870000$RwmMuyXKFg6wjtX4WrMIeK$XQkPs2B0cPX4uz3aY561h1fVGE9MqjFCD7FKrNHLEPo=', '2025-01-14 14:20:19.175493', NULL, 'Jane', 'Doe', '2025-01-14 14:19:16.437332', 'jane@doe.gmail.com', 0, 0, 1),
(14, 'pbkdf2_sha256$870000$7d7sEyOgvafW9oZwHRR84Q$9Td92BkciRCjpwu41yhoWk+q8wH5eRBMnuuB9kHWOTU=', '2025-01-15 06:15:51.403934', NULL, 'Nicole', 'Wasike', '2025-01-15 06:15:42.866428', 'nicole@gmail.com', 0, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `taskapp_customuser_groups`
--

CREATE TABLE `taskapp_customuser_groups` (
  `id` bigint(20) NOT NULL,
  `customuser_id` bigint(20) NOT NULL,
  `group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `taskapp_customuser_user_permissions`
--

CREATE TABLE `taskapp_customuser_user_permissions` (
  `id` bigint(20) NOT NULL,
  `customuser_id` bigint(20) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `taskapp_subtask`
--

CREATE TABLE `taskapp_subtask` (
  `subtask_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `status` varchar(50) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `task_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `taskapp_subtask`
--

INSERT INTO `taskapp_subtask` (`subtask_id`, `title`, `status`, `created_at`, `task_id`) VALUES
(11, 'Research wedding venues to fuel your success', 'Pending', '2025-01-14 14:23:59.025017', 37),
(12, 'Create a guest list to make it count', 'Pending', '2025-01-14 14:23:59.031623', 37),
(13, 'Choose a date and time for the wedding to stay determined', 'Pending', '2025-01-14 14:23:59.038216', 37),
(14, 'Book a caterer to maintain your focus', 'Pending', '2025-01-14 14:23:59.045216', 37),
(15, 'Plan the ceremony and reception to complete the journey', 'Pending', '2025-01-14 14:23:59.052998', 37),
(16, 'Remove dust and dirt to start strong', 'Completed', '2025-01-15 06:37:20.286932', 43),
(17, 'Dust the mattress and pillows to stay on track', 'Completed', '2025-01-15 06:37:20.294531', 43),
(18, 'Clean the closet and dresser to keep the momentum going', 'Completed', '2025-01-15 06:37:20.301512', 43),
(19, 'Wash the dryer and dryer sheets to keep the momentum going', 'Completed', '2025-01-15 06:37:20.308046', 43),
(20, 'Use a vacuum cleaner to clean the carpet to end with impact', 'Completed', '2025-01-15 06:37:20.319577', 43);

-- --------------------------------------------------------

--
-- Table structure for table `taskapp_task`
--

CREATE TABLE `taskapp_task` (
  `task_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `status` varchar(50) NOT NULL,
  `due_date` date DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `taskapp_task`
--

INSERT INTO `taskapp_task` (`task_id`, `title`, `status`, `due_date`, `created_at`, `updated_at`, `user_id`) VALUES
(3, 'Clean Room', 'Pending', '2025-01-07', '2025-01-07 11:13:21.882753', '2025-01-07 11:13:21.882753', 6),
(4, 'Fix Project', 'Pending', '2025-01-09', '2025-01-07 11:13:34.256563', '2025-01-07 11:13:34.256563', 6),
(12, 'Finish project', 'Completed', '2025-01-10', '2025-01-09 11:00:08.299231', '2025-01-14 09:15:37.182088', 7),
(20, 'Clean room', 'Pending', '2025-01-14', '2025-01-10 06:14:34.709895', '2025-01-15 05:21:03.425170', 7),
(35, 'Clean bedroom', 'Pending', '2025-01-16', '2025-01-14 10:12:42.416383', '2025-01-14 10:44:56.283118', 7),
(36, 'Clean bathroom', 'Completed', '2025-01-16', '2025-01-14 14:20:32.490684', '2025-01-14 14:24:22.443448', 12),
(37, 'Plan wedding', 'Pending', '2025-01-18', '2025-01-14 14:21:16.747936', '2025-01-14 15:35:58.262973', 12),
(38, 'Plan halloween party', 'Pending', '2025-01-16', '2025-01-14 15:33:04.893093', '2025-01-14 17:17:19.313825', 12),
(40, 'Cook dinner', 'Pending', '2025-01-16', '2025-01-15 06:16:05.206921', '2025-01-15 06:16:05.206921', 14),
(41, 'Plan birthday party', 'Pending', '2025-01-13', '2025-01-15 06:16:21.952350', '2025-01-15 06:16:21.952350', 14),
(42, 'Finish Project', 'Completed', '2025-01-10', '2025-01-15 06:16:40.457670', '2025-01-15 06:16:41.847536', 14),
(43, 'Clean bedroom', 'Completed', '2025-01-16', '2025-01-15 06:35:52.323029', '2025-01-15 06:37:33.079257', 14);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `auth_group`
--
ALTER TABLE `auth_group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  ADD KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`);

--
-- Indexes for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  ADD KEY `django_admin_log_user_id_c564eba6_fk_taskapp_customuser_id` (`user_id`);

--
-- Indexes for table `django_content_type`
--
ALTER TABLE `django_content_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`);

--
-- Indexes for table `django_migrations`
--
ALTER TABLE `django_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `django_session`
--
ALTER TABLE `django_session`
  ADD PRIMARY KEY (`session_key`),
  ADD KEY `django_session_expire_date_a5c62663` (`expire_date`);

--
-- Indexes for table `knox_authtoken`
--
ALTER TABLE `knox_authtoken`
  ADD PRIMARY KEY (`digest`),
  ADD KEY `knox_authtoken_user_id_e5a5d899_fk_taskapp_customuser_id` (`user_id`),
  ADD KEY `knox_authtoken_token_key_8f4f7d47` (`token_key`);

--
-- Indexes for table `taskapp_customuser`
--
ALTER TABLE `taskapp_customuser`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `taskapp_customuser_groups`
--
ALTER TABLE `taskapp_customuser_groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `taskapp_customuser_groups_customuser_id_group_id_62c270b6_uniq` (`customuser_id`,`group_id`),
  ADD KEY `taskapp_customuser_groups_group_id_aea83d76_fk_auth_group_id` (`group_id`);

--
-- Indexes for table `taskapp_customuser_user_permissions`
--
ALTER TABLE `taskapp_customuser_user_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `taskapp_customuser_user__customuser_id_permission_5a3bf65b_uniq` (`customuser_id`,`permission_id`),
  ADD KEY `taskapp_customuser_u_permission_id_2adc73c3_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `taskapp_subtask`
--
ALTER TABLE `taskapp_subtask`
  ADD PRIMARY KEY (`subtask_id`),
  ADD KEY `taskapp_subtask_task_id_aad66671_fk_taskapp_task_task_id` (`task_id`);

--
-- Indexes for table `taskapp_task`
--
ALTER TABLE `taskapp_task`
  ADD PRIMARY KEY (`task_id`),
  ADD KEY `taskapp_task_user_id_fa0eed47_fk_taskapp_customuser_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `auth_group`
--
ALTER TABLE `auth_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_permission`
--
ALTER TABLE `auth_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `django_content_type`
--
ALTER TABLE `django_content_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `django_migrations`
--
ALTER TABLE `django_migrations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `taskapp_customuser`
--
ALTER TABLE `taskapp_customuser`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `taskapp_customuser_groups`
--
ALTER TABLE `taskapp_customuser_groups`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `taskapp_customuser_user_permissions`
--
ALTER TABLE `taskapp_customuser_user_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `taskapp_subtask`
--
ALTER TABLE `taskapp_subtask`
  MODIFY `subtask_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `taskapp_task`
--
ALTER TABLE `taskapp_task`
  MODIFY `task_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Constraints for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);

--
-- Constraints for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  ADD CONSTRAINT `django_admin_log_user_id_c564eba6_fk_taskapp_customuser_id` FOREIGN KEY (`user_id`) REFERENCES `taskapp_customuser` (`id`);

--
-- Constraints for table `knox_authtoken`
--
ALTER TABLE `knox_authtoken`
  ADD CONSTRAINT `knox_authtoken_user_id_e5a5d899_fk_taskapp_customuser_id` FOREIGN KEY (`user_id`) REFERENCES `taskapp_customuser` (`id`);

--
-- Constraints for table `taskapp_customuser_groups`
--
ALTER TABLE `taskapp_customuser_groups`
  ADD CONSTRAINT `taskapp_customuser_g_customuser_id_752750be_fk_taskapp_c` FOREIGN KEY (`customuser_id`) REFERENCES `taskapp_customuser` (`id`),
  ADD CONSTRAINT `taskapp_customuser_groups_group_id_aea83d76_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Constraints for table `taskapp_customuser_user_permissions`
--
ALTER TABLE `taskapp_customuser_user_permissions`
  ADD CONSTRAINT `taskapp_customuser_u_customuser_id_14c805d2_fk_taskapp_c` FOREIGN KEY (`customuser_id`) REFERENCES `taskapp_customuser` (`id`),
  ADD CONSTRAINT `taskapp_customuser_u_permission_id_2adc73c3_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`);

--
-- Constraints for table `taskapp_subtask`
--
ALTER TABLE `taskapp_subtask`
  ADD CONSTRAINT `taskapp_subtask_task_id_aad66671_fk_taskapp_task_task_id` FOREIGN KEY (`task_id`) REFERENCES `taskapp_task` (`task_id`);

--
-- Constraints for table `taskapp_task`
--
ALTER TABLE `taskapp_task`
  ADD CONSTRAINT `taskapp_task_user_id_fa0eed47_fk_taskapp_customuser_id` FOREIGN KEY (`user_id`) REFERENCES `taskapp_customuser` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
