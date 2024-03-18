-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-02-2024 a las 21:14:58
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `hambgers`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bebidas`
--

CREATE TABLE `bebidas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(80) NOT NULL,
  `precio` decimal(6,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `bebidas`
--

INSERT INTO `bebidas` (`id`, `nombre`, `precio`) VALUES
(1, 'Coca-Cola', 2.00),
(2, 'Sprite', 2.00),
(3, 'Limonada Casera', 2.50),
(4, 'Té Helado', 2.50),
(5, 'Agua Mineral (500ml)', 1.50),
(6, 'Smoothie de Frutas', 3.50),
(7, 'Fanta Naranja/Limón', 2.00),
(8, 'Schweppes Tónica', 2.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `guarniciones`
--

CREATE TABLE `guarniciones` (
  `id` int(11) NOT NULL,
  `nombre` varchar(80) NOT NULL,
  `precio` decimal(6,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `guarniciones`
--

INSERT INTO `guarniciones` (`id`, `nombre`, `precio`) VALUES
(1, 'Patatas Fritas Tradicionales', 3.50),
(2, 'Patatas Fritas Deluxe', 4.00),
(3, 'Aros de Cebolla Crujiente', 4.25),
(4, 'Maíz a la Parrilla con Mantequilla', 4.50),
(5, 'Choclo a la Parrilla', 4.75),
(6, 'Ensalada César', 4.75),
(7, 'Ensalada Mixta', 4.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hamburguesas`
--

CREATE TABLE `hamburguesas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `precio` decimal(6,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `hamburguesas`
--

INSERT INTO `hamburguesas` (`id`, `nombre`, `precio`) VALUES
(1, 'Hamburguesa Deluxe (con lechuga, tomate, cebolla, queso cheddar, bacon, pepinillo)', 10.50),
(2, 'Hamburguesa Ranchera (con salsa BBQ, cebolla caramelizada, jalapeños, queso Montés)', 12.75),
(3, 'Hamburguesa Mediterránea (pesto de albahaca, tomate seco, rúcula, mozzarella)', 11.25),
(4, 'Hamburguesa Hawaiana (con piña asada, jamón, queso suizo)', 11.00),
(5, 'Hamburguesa Mexicana (con guacamole, jalapeños, pico de gallo, queso pepper jack)', 12.25),
(6, 'Hamburguesa de Champiñones (con champiñones salteados, cebolla caramelizada, queso de cabra)', 10.75),
(7, 'Hamburguesa de Pollo a la Parrilla (con lechuga, tomate, cebolla, aguacate, mayonesa)', 11.50),
(8, 'Hamburguesa de Falafel (con lechuga, tomate, cebolla morada, aguacate, garbanzos)', 10.25),
(9, 'Hamburguesa Picante (con jalapeños en rodajas, cebolla roja encurtida)', 11.75),
(10, 'Hamburguesa de Salmón (con rúcula, cebolla morada encurtida, queso crema, alcaparras)', 12.00),
(12, 'Hamburguesa BBQ (con cebolla crujiente, queso cheddar, salsa barbacoa, pepinillo)', 11.25),
(44, 'Hamburguesa con Chili', 12.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id` int(11) NOT NULL,
  `nombre_cliente` varchar(45) NOT NULL,
  `comentario` text DEFAULT NULL,
  `hora_pedido` datetime NOT NULL DEFAULT current_timestamp(),
  `idhamburguesa` int(11) NOT NULL,
  `idguarnicion` int(11) DEFAULT NULL,
  `idbebida` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`id`, `nombre_cliente`, `comentario`, `hora_pedido`, `idhamburguesa`, `idguarnicion`, `idbebida`) VALUES
(28, 'Sergio', 'Quiero Ketchup con mis patatas!', '2024-02-29 20:59:43', 6, 1, 6),
(29, 'Termineitor', 'Be right back!', '2024-02-29 21:05:58', 4, 3, 8),
(30, 'Laura', NULL, '2024-02-29 21:06:25', 3, NULL, 3),
(31, 'Juanito22', NULL, '2024-02-29 21:06:51', 1, 2, 5);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `bebidas`
--
ALTER TABLE `bebidas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `guarniciones`
--
ALTER TABLE `guarniciones`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `hamburguesas`
--
ALTER TABLE `hamburguesas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cliente` (`nombre_cliente`),
  ADD KEY `idguarnicion` (`idguarnicion`),
  ADD KEY `idbebida` (`idbebida`),
  ADD KEY `idhamburguesa` (`idhamburguesa`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `bebidas`
--
ALTER TABLE `bebidas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `guarniciones`
--
ALTER TABLE `guarniciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `hamburguesas`
--
ALTER TABLE `hamburguesas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`idhamburguesa`) REFERENCES `hamburguesas` (`id`),
  ADD CONSTRAINT `pedidos_ibfk_2` FOREIGN KEY (`idguarnicion`) REFERENCES `guarniciones` (`id`),
  ADD CONSTRAINT `pedidos_ibfk_3` FOREIGN KEY (`idbebida`) REFERENCES `bebidas` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
