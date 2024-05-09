-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 09, 2024 at 04:54 PM
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
-- Database: `vacations`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `email`, `password`, `role`) VALUES
(1, 'Ofek', 'Hekter', 'ofekh1989123@gmail.com', '1234asdasd', 2),
(2, 'fgf', 'gfgf', 'g@fgfghgfghdfdf', 'sdfgfgfg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `location` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` int(11) NOT NULL,
  `imageName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `location`, `description`, `startDate`, `endDate`, `price`, `imageName`) VALUES
(1, 'Israel', 'Our Jerusalem travel guide offers a comprehensive resource for anyone planning to visit one of the world’s most iconic cities. Jerusalem is a city steeped in history, culture, and religion, and with our travel guide, you’ll have access to all the informat', '2024-06-01', '2024-06-12', 1500, 'Israel'),
(2, 'Italy', 'Liberty Style, also known as ‘stile floreale’ (floral style) in Italy, is the very specific Italian artistic variant of Art Nouveau which truly became Sicilian thanks to Giovan Battista Filippo and Ernesto Basile. The new movement took different forms in ', '2024-06-05', '2024-06-17', 3250, 'Italy'),
(3, 'France', 'A legacy of the Age of Enlightenment, the motto \"Liberté, Egalité, Fraternité\" first appeared during the French Revolution. Although it was often called into question, it finally established itself under the Third Republic. It was written into the 1958 Co', '2024-06-12', '2024-06-25', 2990, 'France'),
(4, 'Germany', 'In several smaller essays written in the late 1760s and the 1770s, Herder discussed German political history. In How the German Bishops Became an Estate of the Realm Herder spelled out his views on the ancient German constitution and the history of the Ho', '2024-06-01', '2024-06-06', 3550, 'Germany'),
(5, 'Usa', 'Standing tall on Liberty Island in New York Harbor, just off Lower Manhattan in New York City, the Statue of Liberty is among the USA\'s most beloved sights and an enduring symbol of liberty and freedom.  Yet this statue wasn’t conceived by a U.S. citizen.', '2024-06-11', '2024-06-15', 5000, 'Usa'),
(6, 'Brazil', 'South America\'s giant, Brazil is a seductive country with dazzling beaches, tropical islands and picturesque colonial towns. Its verdant rainforests boast an astounding array of wildlife, while its wildly energetic cities are home to a multitude of ethnic', '2024-07-02', '2024-07-12', 4000, 'Brazil'),
(7, 'Argentina', 'As one of the largest countries on the continent, Argentina has an impressive variety of landscapes, from the rainforest surrounding Iguazu Falls to the arid Andean plateau of the Northwest and the vast Patagonian clear lakes and snow-capped mountains, to', '2024-07-10', '2024-07-21', 4500, 'Argentina'),
(8, 'Canada', 'As one of the largest countries in the world, Canada is a treasure trove of unique landscapes and unparalleled encounters with nature. In the west, the sparkling coastline of British Columbia is bordered by rainforests and mysterious islands where whales ', '2024-07-29', '2024-08-05', 3800, 'Canada'),
(9, 'Egypt', 'Egypt is not only a country of antiquity, but also of magnificent landscapes offering cities and oases, deserts and beaches, ancient obelisks, and modern hotels. Bordered by the Mediterranean, the Red Sea, and the fabled Nile River, you can experience era', '2024-08-12', '2024-08-23', 1200, 'Egypt'),
(10, 'Japan', 'Known as the ‘Land of the Rising Sun’, Japan is an eclectic mix of past, present, and future, combining ancient samurai traditions and an impressive history with a modern-day persona and new world technology. The country is unique in that, until the late ', '2024-08-13', '2024-08-27', 2650, 'Japan'),
(11, 'Spain', 'Nationals of third States who travel to Spain for stays of up to 90 days (during any period of 180 days) for tourism, business, family visits, medical treatment, study, non-work internships or volunteer activities with a duration not exceeding 3 months, o', '2024-08-02', '2024-08-09', 3150, 'Spain'),
(12, 'Turkey', 'It is full of archeological findings, diverse cultures, authentic villages, and mosques. While the capital, Ankara, features ancient Ottoman culture in its central squares and bright markets, Antalya\'s well-known beaches and Mediterranean seaside resorts ', '2024-09-04', '2024-09-14', 2000, 'Turkey'),
(17, 'rome', 'Liberty Style, also known as ‘stile floreale’ (floral style) in Italy, is the very specific Italian artistic variant of Art Nouveau which truly became Sicilian thanks to Giovan Battista Filippo and Ernesto Basile. The new movement took different forms in', '2024-08-14', '2024-08-28', 3000, 'rome');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
