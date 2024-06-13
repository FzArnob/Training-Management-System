-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 26, 2022 at 04:11 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tms`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_email` varchar(255) NOT NULL,
  `designation` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_email`, `designation`) VALUES
('fz.arnob@gmail.com', NULL),
('vincent@cacademy.com', 'General Manager');

-- --------------------------------------------------------

--
-- Table structure for table `application_status`
--

CREATE TABLE `application_status` (
  `status_name` varchar(255) NOT NULL,
  `status_description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `application_status`
--

INSERT INTO `application_status` (`status_name`, `status_description`) VALUES
('APPLIED', 'Application is under review. Admin will notify via email.'),
('EXAM', 'First step of recruitment. Written exam will be conducted in the scheduled time mentioned in email.'),
('HR INTERVIEW', '3rd step hr Interview'),
('INTERVIEW', 'Technical interview is the 2nd step towards confirmation. Domain specific practice should '),
('ON BOARD', 'Offered by HR to join as Trainee'),
('TRAINEE', 'Currently accepted as a trainee of the academy');

-- --------------------------------------------------------

--
-- Table structure for table `assignment`
--

CREATE TABLE `assignment` (
  `assignment_id` bigint(20) NOT NULL,
  `assignment_file` varchar(255) DEFAULT NULL,
  `question` varchar(255) DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `assignment`
--

INSERT INTO `assignment` (`assignment_id`, `assignment_file`, `question`, `time`) VALUES
(1, 'http://localhost:8080/api/downloadFile/JDBYutOE', 'How many Field is in SRS?', '2022-07-26T17:40'),
(2, 'http://localhost:8080/api/downloadFile/1jxQIoqd', 'What is Functional Requirements? Give examples.', '2022-07-25T12:43');

-- --------------------------------------------------------

--
-- Table structure for table `assignment_answer`
--

CREATE TABLE `assignment_answer` (
  `answer_id` bigint(20) NOT NULL,
  `answer` varchar(255) DEFAULT NULL,
  `answer_file` varchar(255) DEFAULT NULL,
  `evaluation` varchar(255) DEFAULT NULL,
  `trainee_email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `assignment_answer`
--

INSERT INTO `assignment_answer` (`answer_id`, `answer`, `answer_file`, `evaluation`, `trainee_email`) VALUES
(1, '17', 'http://localhost:8080/api/downloadFile/hL0Nc3dy', '92', 'kabir.roy@gmail.com'),
(2, '17', 'http://localhost:8080/api/downloadFile/TcLhjsuf', NULL, 'abdul.hayat@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `assignment_answer_map`
--

CREATE TABLE `assignment_answer_map` (
  `assignment_id` bigint(20) NOT NULL,
  `answer_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `assignment_answer_map`
--

INSERT INTO `assignment_answer_map` (`assignment_id`, `answer_id`) VALUES
(1, 1),
(1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `batch`
--

CREATE TABLE `batch` (
  `batch_code` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `end_date` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `start_date` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `batch`
--

INSERT INTO `batch` (`batch_code`, `description`, `end_date`, `name`, `start_date`) VALUES
('JB001', 'The batch is assigned to the class type 001, depending on the batch performance it will end', '2022-09-30', 'JAVA BATCH 001', '2022-07-01'),
('JB002', 'The batch is assigned to the class type 002, depending on the batch performance it will end', '2022-09-30', 'JAVA BATCH 002', '2022-07-01'),
('JW001', 'The batch is assigned to the class type 001, depending on the batch performance it will end', '2022-02-28', 'JAVA WEB 001', '2022-01-01'),
('JW002', 'The batch is assigned to the class type 002, depending on the batch performance it will end', '2022-02-28', 'JAVA WEB 002', '2022-01-01'),
('JW003', 'The batch is assigned to the class type 003, depending on the batch performance it will end', '2022-05-31', 'JAVA WEB 003', '2022-03-01'),
('MN001', 'The batch is assigned to the class type 001, depending on the batch performance it will end', '2022-08-31', 'MERN BATCH 001', '2022-06-01'),
('MN002', 'The batch is assigned to the class type 002, depending on the batch performance it will end', '2022-09-30', 'MERN BATCH 002', '2022-07-01');

-- --------------------------------------------------------

--
-- Table structure for table `batch_schedule`
--

CREATE TABLE `batch_schedule` (
  `batch_code` varchar(255) NOT NULL,
  `id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `batch_schedule`
--

INSERT INTO `batch_schedule` (`batch_code`, `id`) VALUES
('JB001', 1),
('JB001', 2),
('JB001', 3),
('JB001', 4);

-- --------------------------------------------------------

--
-- Table structure for table `batch_trainees`
--

CREATE TABLE `batch_trainees` (
  `batch_batch_code` varchar(255) NOT NULL,
  `trainees` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `batch_trainees`
--

INSERT INTO `batch_trainees` (`batch_batch_code`, `trainees`) VALUES
('JB001', 'abdul.hayat@gmail.com'),
('JB001', 'kabir.roy@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `course_code` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`course_code`, `description`, `name`, `status`) VALUES
('JAVA091', 'Java Basics · 1. Introduction to Java · 2. Java Syntax and Style · 3. Variables and Operators · 4. Strings · 5. Control Flow Statements · 6. Iterations · 7. Arrays', 'Java Basics', 'running'),
('JAVA092', 'Read and make elementary modifications to Java programs that solve real-world problems. Validate input in a Java program.', 'Java Fundamentals II', 'upcoming'),
('JAVA101', 'Read and make elementary modifications to Java programs that solve real-world problems. Validate input in a Java program.', 'Java Fundamentals', 'running'),
('REACT091', 'React (also known as React.js or ReactJS) is a free and open-source front-end JavaScript library for building user interfaces based on UI components.', 'React JS I', 'running'),
('REACT092', 'React (also known as React.js or ReactJS) is a free and open-source front-end JavaScript library for building user interfaces based on UI components.', 'React JS', 'upcoming'),
('REACT101', 'React (also known as React.js or ReactJS) is a free and open-source front-end JavaScript library for building user interfaces based on UI components.', 'React JS', 'previous'),
('SRS091', 'A software requirements specification (SRS) is a document that describes what the software will do and how it will be expected to perform.', 'Software Requirements Specification', 'previous'),
('SRS092', 'A software requirements specification (SRS) is a document that describes what the software will do and how it will be expected to perform.', 'Software Requirements Specification', 'upcoming'),
('SRS101', 'A software requirements specification (SRS) is a document that describes what the software will do and how it will be expected to perform.', 'Software Requirements Specification', 'running'),
('SRS103', 'asdsad', 'Software Requirements Specification', 'upcoming');

-- --------------------------------------------------------

--
-- Table structure for table `course_schedule`
--

CREATE TABLE `course_schedule` (
  `schedule_id` bigint(20) NOT NULL,
  `batch_code` varchar(255) DEFAULT NULL,
  `course_code` varchar(255) DEFAULT NULL,
  `end_date` varchar(255) DEFAULT NULL,
  `schedule_end_time` varchar(255) DEFAULT NULL,
  `schedule_start_time` varchar(255) DEFAULT NULL,
  `start_date` varchar(255) DEFAULT NULL,
  `trainer_email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `course_schedule`
--

INSERT INTO `course_schedule` (`schedule_id`, `batch_code`, `course_code`, `end_date`, `schedule_end_time`, `schedule_start_time`, `start_date`, `trainer_email`) VALUES
(1, 'JB001', 'SRS101', '2022-07-29', '15:10', '14:10', '2022-07-19', 'faruk.khan@gmail.com'),
(2, 'JB001', 'SRS101', '2022-07-27', '18:12', '17:12', '2022-07-19', 'faruk.khan@gmail.com'),
(3, 'JB001', 'SRS101', '2022-08-11', '18:39', '17:38', '2022-08-09', 'vincent@cacademy.com'),
(4, 'JB001', 'SRS101', '2022-07-27', '20:14', '19:14', '2022-07-20', 'faruk.khan@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `course_schedule_assignment`
--

CREATE TABLE `course_schedule_assignment` (
  `schedule_id` bigint(20) NOT NULL,
  `assignment_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `course_schedule_assignment`
--

INSERT INTO `course_schedule_assignment` (`schedule_id`, `assignment_id`) VALUES
(3, 1),
(3, 2);

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `role_name` varchar(255) NOT NULL,
  `role_description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`role_name`, `role_description`) VALUES
('ADMIN', 'All permissions'),
('TRAINEE', 'Less operation'),
('TRAINER', 'Batch specific permissions');

-- --------------------------------------------------------

--
-- Table structure for table `trainee`
--

CREATE TABLE `trainee` (
  `trainee_email` varchar(255) NOT NULL,
  `blood_group` varchar(255) DEFAULT NULL,
  `cgpa` varchar(255) DEFAULT NULL,
  `experience` varchar(255) DEFAULT NULL,
  `institute` varchar(255) DEFAULT NULL,
  `nid_no` varchar(255) DEFAULT NULL,
  `resume` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `trainee`
--

INSERT INTO `trainee` (`trainee_email`, `blood_group`, `cgpa`, `experience`, `institute`, `nid_no`, `resume`) VALUES
('abdul.hayat@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL),
('arkabhuiyan66@gmail.com', 'O-', '3.9', '1', 'DU', '645811555464', 'http://localhost:8080/api/downloadFile/UbnEgLeY'),
('faizul.hamid@gmail.com', 'A+', '3.29', '1', 'BRAC University', '645811555464', 'http://localhost:8080/api/downloadFile/dQbuP3Hf'),
('fz.arnob@gmail.com', 'AB+', '3.76', '1', 'BRAC University', '645811555464', 'http://localhost:8080/api/downloadFile/gJvNuAeY'),
('kabir.roy@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL),
('raja.gani@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `trainee_application_status`
--

CREATE TABLE `trainee_application_status` (
  `status_name` varchar(255) DEFAULT NULL,
  `trainee_email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `trainee_application_status`
--

INSERT INTO `trainee_application_status` (`status_name`, `trainee_email`) VALUES
('APPLIED', 'arkabhuiyan66@gmail.com'),
('APPLIED', 'faizul.hamid@gmail.com'),
('TRAINEE', 'abdul.hayat@gmail.com'),
('TRAINEE', 'fz.arnob@gmail.com'),
('TRAINEE', 'kabir.roy@gmail.com'),
('TRAINEE', 'raja.gani@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `trainer`
--

CREATE TABLE `trainer` (
  `trainer_email` varchar(255) NOT NULL,
  `blood_group` varchar(255) DEFAULT NULL,
  `experience` varchar(255) DEFAULT NULL,
  `expertise` varchar(255) DEFAULT NULL,
  `nid_no` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `trainer`
--

INSERT INTO `trainer` (`trainer_email`, `blood_group`, `experience`, `expertise`, `nid_no`) VALUES
('faruk.khan@gmail.com', NULL, NULL, NULL, NULL),
('vincent@cacademy.com', 'A+', '15', 'Java Core', '645811555464');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `email` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `date_of_birth` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `profile_picture` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`email`, `address`, `date_of_birth`, `first_name`, `gender`, `last_name`, `password`, `phone`, `profile_picture`) VALUES
('abdul.hayat@gmail.com', '35, Lakecircus, Kalabagan', '1998-05-10', 'Abdul', 'Male', 'Hayat', '$2a$10$cbdeXlVw8SLNsFjmXezCpu09li/cS8vu5FLkdE5zPu2HfI2/uYA06', '1521581368', 'http://localhost:8080/api/downloadFile/E4BEfS43'),
('arkabhuiyan66@gmail.com', '35, Lakecircus, Kalabagan', '1999-05-29', 'Arka ', 'Male', 'Bhuiyan', '$2a$10$m.oEWkBNfiZGzr/XQYBVXOS7V6MXXX.J6j2mCnHierbslnvePA2X2', '1521581368', 'http://localhost:8080/api/downloadFile/0swlwRpW'),
('faizul.hamid@gmail.com', 'House #20 (3rd Floor) Road # 17, Nikanjia-2 Dhaka, Bangladesh', '1996-05-19', 'Faizul ', 'Male', 'Hamid', '$2a$10$S3/uBLwztRKoPG58bFG3reYq0wOwCFFhnIwvqpIQRVDQGZgYp5bnu', '1525454651', 'http://localhost:8080/api/downloadFile/fAyrRvq7'),
('faruk.khan@gmail.com', '35, Lakecircus, Kalabagan', '1986-05-15', 'Faruk', 'Male', 'Khan', '$2a$10$2Or48h.QWolw267HtzG/2OqFz7Vads0hFRYmiOtRpVxfxicx/5zFm', '1521581368', 'http://localhost:8080/api/downloadFile/7n5rjiJr'),
('fz.arnob@gmail.com', '35, Lakecircus, Kalabagan', '1999-09-30', 'Md. Farhan', 'Male', 'Zaman', '$2a$10$D0Gffl29OERh7PEJiy6njesLVz397raUWQi0hmKAEh0Tnwo.LNk3u', '1521581368', 'http://localhost:8080/api/downloadFile/ucX9mbJ0'),
('kabir.roy@gmail.com', '35, Lakecircus, Kalabagan', '1995-05-12', 'Kabir', 'Male', 'Roy', '$2a$10$SGQ9iqpTRG8Mxyqq0vQ7oeQG6woYvjH6Kr62xDcr6uV0br4hv/AkO', '1521581368', 'http://localhost:8080/api/downloadFile/FnYTY2cw'),
('raja.gani@gmail.com', '35, Lakecircus, Kalabagan', '1998-02-16', 'Raja', 'Male', 'Gani', '$2a$10$s1VBJA7F44tNLD7ulsYdauvP5iFtwR76m/3WQHQe9ZZppW/lsfFmm', '1521581368', 'http://localhost:8080/api/downloadFile/1n4WVnUF'),
('vincent@cacademy.com', '5-5, Sumiyoshi Minami-machi 4-chome, Higashi Nada-ku', '1985-08-29', 'Vincent', 'Male', 'Chang', '$2a$10$zBfrOFpyXjYwDgY3T23qYOcfZPC3gIUonqkru8MWyOPD//wuJ4i8a', '1545465121', 'http://localhost:8080/api/downloadFile/uIwj1h8L');

-- --------------------------------------------------------

--
-- Table structure for table `user_admin`
--

CREATE TABLE `user_admin` (
  `admin_email` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_admin`
--

INSERT INTO `user_admin` (`admin_email`, `email`) VALUES
('fz.arnob@gmail.com', 'fz.arnob@gmail.com'),
('vincent@cacademy.com', 'vincent@cacademy.com');

-- --------------------------------------------------------

--
-- Table structure for table `user_role`
--

CREATE TABLE `user_role` (
  `email` varchar(255) NOT NULL,
  `role_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_role`
--

INSERT INTO `user_role` (`email`, `role_name`) VALUES
('abdul.hayat@gmail.com', 'TRAINEE'),
('faruk.khan@gmail.com', 'TRAINER'),
('fz.arnob@gmail.com', 'ADMIN'),
('kabir.roy@gmail.com', 'TRAINEE'),
('raja.gani@gmail.com', 'TRAINEE'),
('vincent@cacademy.com', 'ADMIN'),
('vincent@cacademy.com', 'TRAINER');

-- --------------------------------------------------------

--
-- Table structure for table `user_trainee`
--

CREATE TABLE `user_trainee` (
  `trainee_email` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_trainee`
--

INSERT INTO `user_trainee` (`trainee_email`, `email`) VALUES
('abdul.hayat@gmail.com', 'abdul.hayat@gmail.com'),
('arkabhuiyan66@gmail.com', 'arkabhuiyan66@gmail.com'),
('faizul.hamid@gmail.com', 'faizul.hamid@gmail.com'),
('kabir.roy@gmail.com', 'kabir.roy@gmail.com'),
('raja.gani@gmail.com', 'raja.gani@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `user_trainer`
--

CREATE TABLE `user_trainer` (
  `trainer_email` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_trainer`
--

INSERT INTO `user_trainer` (`trainer_email`, `email`) VALUES
('faruk.khan@gmail.com', 'faruk.khan@gmail.com'),
('vincent@cacademy.com', 'vincent@cacademy.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_email`);

--
-- Indexes for table `application_status`
--
ALTER TABLE `application_status`
  ADD PRIMARY KEY (`status_name`);

--
-- Indexes for table `assignment`
--
ALTER TABLE `assignment`
  ADD PRIMARY KEY (`assignment_id`);

--
-- Indexes for table `assignment_answer`
--
ALTER TABLE `assignment_answer`
  ADD PRIMARY KEY (`answer_id`);

--
-- Indexes for table `assignment_answer_map`
--
ALTER TABLE `assignment_answer_map`
  ADD PRIMARY KEY (`assignment_id`,`answer_id`),
  ADD UNIQUE KEY `UK_jbtht159l6o3vepofo73ifw0q` (`answer_id`);

--
-- Indexes for table `batch`
--
ALTER TABLE `batch`
  ADD PRIMARY KEY (`batch_code`);

--
-- Indexes for table `batch_schedule`
--
ALTER TABLE `batch_schedule`
  ADD PRIMARY KEY (`batch_code`,`id`),
  ADD KEY `FK3u8sex7f6je416ev19x60jvph` (`id`);

--
-- Indexes for table `batch_trainees`
--
ALTER TABLE `batch_trainees`
  ADD KEY `FKl9l16f6cbwbghfhqvv80b4pon` (`batch_batch_code`);

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`course_code`);

--
-- Indexes for table `course_schedule`
--
ALTER TABLE `course_schedule`
  ADD PRIMARY KEY (`schedule_id`);

--
-- Indexes for table `course_schedule_assignment`
--
ALTER TABLE `course_schedule_assignment`
  ADD PRIMARY KEY (`schedule_id`,`assignment_id`),
  ADD UNIQUE KEY `UK_qx3xb72wqv0qifs1k841je61p` (`assignment_id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`role_name`);

--
-- Indexes for table `trainee`
--
ALTER TABLE `trainee`
  ADD PRIMARY KEY (`trainee_email`);

--
-- Indexes for table `trainee_application_status`
--
ALTER TABLE `trainee_application_status`
  ADD PRIMARY KEY (`trainee_email`),
  ADD KEY `FKecwjyq5l6s645ggvpvjqd5egv` (`status_name`);

--
-- Indexes for table `trainer`
--
ALTER TABLE `trainer`
  ADD PRIMARY KEY (`trainer_email`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `user_admin`
--
ALTER TABLE `user_admin`
  ADD PRIMARY KEY (`email`),
  ADD KEY `FK7fitwtxxhml6xdlr7025ogyb9` (`admin_email`);

--
-- Indexes for table `user_role`
--
ALTER TABLE `user_role`
  ADD PRIMARY KEY (`email`,`role_name`),
  ADD KEY `FKn6r4465stkbdy93a9p8cw7u24` (`role_name`);

--
-- Indexes for table `user_trainee`
--
ALTER TABLE `user_trainee`
  ADD PRIMARY KEY (`email`),
  ADD KEY `FKpum2n5uqu3x3p166luray3axv` (`trainee_email`);

--
-- Indexes for table `user_trainer`
--
ALTER TABLE `user_trainer`
  ADD PRIMARY KEY (`email`),
  ADD KEY `FK7rc9njm8e0am7tjwi17mmti97` (`trainer_email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assignment`
--
ALTER TABLE `assignment`
  MODIFY `assignment_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `assignment_answer`
--
ALTER TABLE `assignment_answer`
  MODIFY `answer_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `course_schedule`
--
ALTER TABLE `course_schedule`
  MODIFY `schedule_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `assignment_answer_map`
--
ALTER TABLE `assignment_answer_map`
  ADD CONSTRAINT `FKao2iehfx97l0tiwbbfn2w1tyy` FOREIGN KEY (`answer_id`) REFERENCES `assignment_answer` (`answer_id`),
  ADD CONSTRAINT `FKgxfjv2a3lfy0ahndx08yepr9f` FOREIGN KEY (`assignment_id`) REFERENCES `assignment` (`assignment_id`);

--
-- Constraints for table `batch_schedule`
--
ALTER TABLE `batch_schedule`
  ADD CONSTRAINT `FK3u8sex7f6je416ev19x60jvph` FOREIGN KEY (`id`) REFERENCES `course_schedule` (`schedule_id`),
  ADD CONSTRAINT `FKg79q7fmco4wutjr40hr5rra8` FOREIGN KEY (`batch_code`) REFERENCES `batch` (`batch_code`);

--
-- Constraints for table `batch_trainees`
--
ALTER TABLE `batch_trainees`
  ADD CONSTRAINT `FKl9l16f6cbwbghfhqvv80b4pon` FOREIGN KEY (`batch_batch_code`) REFERENCES `batch` (`batch_code`);

--
-- Constraints for table `course_schedule_assignment`
--
ALTER TABLE `course_schedule_assignment`
  ADD CONSTRAINT `FK4uu7n6cws5ioftcurw58sjym8` FOREIGN KEY (`assignment_id`) REFERENCES `assignment` (`assignment_id`),
  ADD CONSTRAINT `FKkdnu2fpj72wyyupq521jaj491` FOREIGN KEY (`schedule_id`) REFERENCES `course_schedule` (`schedule_id`);

--
-- Constraints for table `trainee_application_status`
--
ALTER TABLE `trainee_application_status`
  ADD CONSTRAINT `FKecwjyq5l6s645ggvpvjqd5egv` FOREIGN KEY (`status_name`) REFERENCES `application_status` (`status_name`),
  ADD CONSTRAINT `FKjnwasu4d227hvr0sxethj48k9` FOREIGN KEY (`trainee_email`) REFERENCES `trainee` (`trainee_email`);

--
-- Constraints for table `user_admin`
--
ALTER TABLE `user_admin`
  ADD CONSTRAINT `FK7fitwtxxhml6xdlr7025ogyb9` FOREIGN KEY (`admin_email`) REFERENCES `admin` (`admin_email`),
  ADD CONSTRAINT `FK7vteae4t5s42ux5sr1apg50eh` FOREIGN KEY (`email`) REFERENCES `user` (`email`);

--
-- Constraints for table `user_role`
--
ALTER TABLE `user_role`
  ADD CONSTRAINT `FKn6r4465stkbdy93a9p8cw7u24` FOREIGN KEY (`role_name`) REFERENCES `role` (`role_name`),
  ADD CONSTRAINT `FKoeajw7klgdq5xlmfsulsjc0ak` FOREIGN KEY (`email`) REFERENCES `user` (`email`);

--
-- Constraints for table `user_trainee`
--
ALTER TABLE `user_trainee`
  ADD CONSTRAINT `FKpum2n5uqu3x3p166luray3axv` FOREIGN KEY (`trainee_email`) REFERENCES `trainee` (`trainee_email`),
  ADD CONSTRAINT `FKsx2tfrp3t365ja7hsyqnwxm8b` FOREIGN KEY (`email`) REFERENCES `user` (`email`);

--
-- Constraints for table `user_trainer`
--
ALTER TABLE `user_trainer`
  ADD CONSTRAINT `FK1y9x44ehcky0jl6fwstto25qj` FOREIGN KEY (`email`) REFERENCES `user` (`email`),
  ADD CONSTRAINT `FK7rc9njm8e0am7tjwi17mmti97` FOREIGN KEY (`trainer_email`) REFERENCES `trainer` (`trainer_email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
