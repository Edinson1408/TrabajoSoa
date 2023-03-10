-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-03-2023 a las 21:19:45
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `hotel_oasis`
--
CREATE DATABASE IF NOT EXISTS `hotel_oasis` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `hotel_oasis`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `ID_CATEGORIA` int(11) NOT NULL,
  `NOMBRE_CATEGORIA` varchar(200) DEFAULT NULL,
  `ESTADO` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`ID_CATEGORIA`, `NOMBRE_CATEGORIA`, `ESTADO`) VALUES
(1, 'NORMAL', 1),
(2, 'SUITE', 1),
(3, 'DOBLE', 1),
(4, 'MATRIMONIAL', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `ID_CLIENTE` int(11) NOT NULL,
  `ID_TIPO_DOCUMENTO` int(11) DEFAULT NULL,
  `NRO_DOCUMENTO` varchar(50) DEFAULT NULL,
  `NOMBRES` varchar(500) DEFAULT NULL,
  `APELLIDOS` varchar(500) DEFAULT NULL,
  `CORREO` varchar(200) DEFAULT NULL,
  `FECHA_NACIMIENTO` date DEFAULT NULL,
  `DIRECCION` varchar(300) DEFAULT NULL,
  `TELEFONO` varchar(50) DEFAULT NULL,
  `ESTADO` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`ID_CLIENTE`, `ID_TIPO_DOCUMENTO`, `NRO_DOCUMENTO`, `NOMBRES`, `APELLIDOS`, `CORREO`, `FECHA_NACIMIENTO`, `DIRECCION`, `TELEFONO`, `ESTADO`) VALUES
(1, 1, '87536786', 'CARLOS JUAN ', 'BENITEZ PEREZ', 'CBENIEZ@GMAIL.COM', '0000-00-00', 'LIMA PERU ', '983682762', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `habitacion`
--

CREATE TABLE `habitacion` (
  `ID_HABITACION` int(11) NOT NULL,
  `ID_PISO` int(11) DEFAULT NULL,
  `ID_CATEGORIA` int(11) DEFAULT NULL,
  `ID_SEDE` int(11) DEFAULT NULL,
  `ESTADO` int(11) DEFAULT NULL,
  `PRECIO` double DEFAULT NULL,
  `DESCRIPCION` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `habitacion`
--

INSERT INTO `habitacion` (`ID_HABITACION`, `ID_PISO`, `ID_CATEGORIA`, `ID_SEDE`, `ESTADO`, `PRECIO`, `DESCRIPCION`) VALUES
(1, 1, 1, 1, 1, 50, '50 SOLES LA HORA'),
(2, 2, 3, 1, 1, 60, '60 SOLES LA HORA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pago`
--

CREATE TABLE `pago` (
  `ID_PAGO` int(11) NOT NULL,
  `ID_RESERVA` int(11) DEFAULT NULL,
  `ID_TIPO_PAGO` int(11) DEFAULT NULL,
  `MONTO_PAGADO` double DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfil`
--

CREATE TABLE `perfil` (
  `ID_PERFIL` int(11) NOT NULL,
  `NOMBRE` varchar(400) DEFAULT NULL,
  `ESTADO` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `perfil`
--

INSERT INTO `perfil` (`ID_PERFIL`, `NOMBRE`, `ESTADO`) VALUES
(1, 'ADMIN', 1),
(2, 'COLABORADOR', 1),
(3, 'PRUEBA', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `piso`
--

CREATE TABLE `piso` (
  `ID_PISO` int(11) NOT NULL,
  `NOMBRE_PISO` varchar(200) DEFAULT NULL,
  `ESTADO` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `piso`
--

INSERT INTO `piso` (`ID_PISO`, `NOMBRE_PISO`, `ESTADO`) VALUES
(1, 'PISO1', 1),
(2, 'PISO2', 1),
(3, 'PISO3', 1),
(4, 'PISO4', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reserva`
--

CREATE TABLE `reserva` (
  `ID_RESERVA` int(11) NOT NULL,
  `ID_CLIENTE` int(11) DEFAULT NULL,
  `ID_USUARIO` int(11) DEFAULT NULL,
  `ID_HABITACION` int(11) DEFAULT NULL,
  `FECHA_RESERVACION` datetime DEFAULT NULL,
  `FECHA_INICIO` datetime DEFAULT NULL,
  `FECHA_SALIDA` datetime DEFAULT NULL,
  `CANT_ADULTOS` int(11) DEFAULT NULL,
  `CANT_MENORES` int(11) DEFAULT NULL,
  `ESTADO` int(11) DEFAULT NULL,
  `HORA_INICIO` varchar(10) NOT NULL,
  `HORA_SALIDA` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `reserva`
--

INSERT INTO `reserva` (`ID_RESERVA`, `ID_CLIENTE`, `ID_USUARIO`, `ID_HABITACION`, `FECHA_RESERVACION`, `FECHA_INICIO`, `FECHA_SALIDA`, `CANT_ADULTOS`, `CANT_MENORES`, `ESTADO`, `HORA_INICIO`, `HORA_SALIDA`) VALUES
(2, 1, 1, 1, '2023-03-08 19:00:00', '2023-03-09 19:00:00', '0000-00-00 00:00:00', 2, 0, 1, '2:00 pm', ' ');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sede`
--

CREATE TABLE `sede` (
  `ID_SEDE` int(11) NOT NULL,
  `NOMBRE_SEDE` varchar(500) DEFAULT NULL,
  `DIRECCION` varchar(300) DEFAULT NULL,
  `DISTRITO` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `sede`
--

INSERT INTO `sede` (`ID_SEDE`, `NOMBRE_SEDE`, `DIRECCION`, `DISTRITO`) VALUES
(1, 'SEDE 1', 'JR LIMA 234', 'LIMA'),
(2, 'SEDE 2', 'JR CALLAO', 'CALLAO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_documento`
--

CREATE TABLE `tipo_documento` (
  `ID_TIPO_DOCUMENTO` int(11) NOT NULL,
  `NOMBRE_DOCUMENTO` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tipo_documento`
--

INSERT INTO `tipo_documento` (`ID_TIPO_DOCUMENTO`, `NOMBRE_DOCUMENTO`) VALUES
(1, 'DNI'),
(2, 'PASAPORTE');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_pago`
--

CREATE TABLE `tipo_pago` (
  `ID_PAGO` int(11) NOT NULL,
  `ID_TIPO_PAGO` int(11) DEFAULT NULL,
  `DESCR` varchar(500) DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `ID_USUARIO` int(11) NOT NULL,
  `ID_PERFIL` int(11) DEFAULT NULL,
  `FECHA_INGRESO` date DEFAULT current_timestamp(),
  `ID_TIPO_DOCUMENTO` int(11) DEFAULT NULL,
  `NRO_DOCUMENTO` varchar(50) DEFAULT NULL,
  `NOMBRES` varchar(500) DEFAULT NULL,
  `APELLIDOS` varchar(500) DEFAULT NULL,
  `FECHA_NACIMIENTO` date DEFAULT NULL,
  `DIRECCION` varchar(300) DEFAULT NULL,
  `TELEFONO` varchar(50) DEFAULT NULL,
  `CORREO` varchar(200) DEFAULT NULL,
  `USUARIO` varchar(200) DEFAULT NULL,
  `CONTRASENA` text DEFAULT NULL,
  `ESTADO` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`ID_USUARIO`, `ID_PERFIL`, `FECHA_INGRESO`, `ID_TIPO_DOCUMENTO`, `NRO_DOCUMENTO`, `NOMBRES`, `APELLIDOS`, `FECHA_NACIMIENTO`, `DIRECCION`, `TELEFONO`, `CORREO`, `USUARIO`, `CONTRASENA`, `ESTADO`) VALUES
(1, 1, '2023-03-09', 1, '39483837', 'JUAN ALBERTO', 'PEREZ DIAZ', '0000-00-00', 'UB LAS DALIAS MZ C LT6 ', '978623378', 'JB@GMAIL.COM', 'JUANPREZ', '12345', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`ID_CATEGORIA`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`ID_CLIENTE`),
  ADD KEY `ID_TIPO_DOCUMENTO` (`ID_TIPO_DOCUMENTO`);

--
-- Indices de la tabla `habitacion`
--
ALTER TABLE `habitacion`
  ADD PRIMARY KEY (`ID_HABITACION`),
  ADD KEY `ID_CATEGORIA` (`ID_CATEGORIA`),
  ADD KEY `ID_PISO` (`ID_PISO`),
  ADD KEY `ID_SEDE` (`ID_SEDE`);

--
-- Indices de la tabla `pago`
--
ALTER TABLE `pago`
  ADD PRIMARY KEY (`ID_PAGO`),
  ADD KEY `ID_RESERVA` (`ID_RESERVA`);

--
-- Indices de la tabla `perfil`
--
ALTER TABLE `perfil`
  ADD PRIMARY KEY (`ID_PERFIL`);

--
-- Indices de la tabla `piso`
--
ALTER TABLE `piso`
  ADD PRIMARY KEY (`ID_PISO`);

--
-- Indices de la tabla `reserva`
--
ALTER TABLE `reserva`
  ADD PRIMARY KEY (`ID_RESERVA`),
  ADD KEY `ID_CLIENTE` (`ID_CLIENTE`),
  ADD KEY `ID_USUARIO` (`ID_USUARIO`),
  ADD KEY `ID_HABITACION` (`ID_HABITACION`);

--
-- Indices de la tabla `sede`
--
ALTER TABLE `sede`
  ADD PRIMARY KEY (`ID_SEDE`);

--
-- Indices de la tabla `tipo_documento`
--
ALTER TABLE `tipo_documento`
  ADD PRIMARY KEY (`ID_TIPO_DOCUMENTO`);

--
-- Indices de la tabla `tipo_pago`
--
ALTER TABLE `tipo_pago`
  ADD PRIMARY KEY (`ID_PAGO`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`ID_USUARIO`),
  ADD KEY `ID_PERFIL` (`ID_PERFIL`),
  ADD KEY `ID_TIPO_DOCUMENTO` (`ID_TIPO_DOCUMENTO`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `ID_CATEGORIA` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `ID_CLIENTE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `habitacion`
--
ALTER TABLE `habitacion`
  MODIFY `ID_HABITACION` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `pago`
--
ALTER TABLE `pago`
  MODIFY `ID_PAGO` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `perfil`
--
ALTER TABLE `perfil`
  MODIFY `ID_PERFIL` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `piso`
--
ALTER TABLE `piso`
  MODIFY `ID_PISO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `reserva`
--
ALTER TABLE `reserva`
  MODIFY `ID_RESERVA` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `sede`
--
ALTER TABLE `sede`
  MODIFY `ID_SEDE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tipo_documento`
--
ALTER TABLE `tipo_documento`
  MODIFY `ID_TIPO_DOCUMENTO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tipo_pago`
--
ALTER TABLE `tipo_pago`
  MODIFY `ID_PAGO` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `ID_USUARIO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD CONSTRAINT `cliente_ibfk_1` FOREIGN KEY (`ID_TIPO_DOCUMENTO`) REFERENCES `tipo_documento` (`ID_TIPO_DOCUMENTO`);

--
-- Filtros para la tabla `habitacion`
--
ALTER TABLE `habitacion`
  ADD CONSTRAINT `habitacion_ibfk_1` FOREIGN KEY (`ID_CATEGORIA`) REFERENCES `categoria` (`ID_CATEGORIA`),
  ADD CONSTRAINT `habitacion_ibfk_2` FOREIGN KEY (`ID_PISO`) REFERENCES `piso` (`ID_PISO`),
  ADD CONSTRAINT `habitacion_ibfk_3` FOREIGN KEY (`ID_SEDE`) REFERENCES `sede` (`ID_SEDE`);

--
-- Filtros para la tabla `pago`
--
ALTER TABLE `pago`
  ADD CONSTRAINT `pago_ibfk_1` FOREIGN KEY (`ID_RESERVA`) REFERENCES `reserva` (`ID_RESERVA`);

--
-- Filtros para la tabla `reserva`
--
ALTER TABLE `reserva`
  ADD CONSTRAINT `reserva_ibfk_1` FOREIGN KEY (`ID_CLIENTE`) REFERENCES `cliente` (`ID_CLIENTE`),
  ADD CONSTRAINT `reserva_ibfk_2` FOREIGN KEY (`ID_USUARIO`) REFERENCES `usuario` (`ID_USUARIO`),
  ADD CONSTRAINT `reserva_ibfk_3` FOREIGN KEY (`ID_HABITACION`) REFERENCES `habitacion` (`ID_HABITACION`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`ID_PERFIL`) REFERENCES `perfil` (`ID_PERFIL`),
  ADD CONSTRAINT `usuario_ibfk_2` FOREIGN KEY (`ID_TIPO_DOCUMENTO`) REFERENCES `tipo_documento` (`ID_TIPO_DOCUMENTO`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
