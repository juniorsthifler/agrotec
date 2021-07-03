-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-07-2021 a las 20:50:25
-- Versión del servidor: 10.4.10-MariaDB
-- Versión de PHP: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `agrotec`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `catalogo_financiero`
--

CREATE TABLE `catalogo_financiero` (
  `id` int(11) NOT NULL,
  `nombre` varchar(500) NOT NULL,
  `descripcion` text NOT NULL,
  `tipo_dato_primitive` varchar(500) NOT NULL,
  `date_register` timestamp NOT NULL DEFAULT current_timestamp(),
  `date_update` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `estado` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_herramienta_financiera`
--

CREATE TABLE `detalle_herramienta_financiera` (
  `id` varchar(100) NOT NULL,
  `detalle` text NOT NULL,
  `id_herramienta_financiera` varchar(100) NOT NULL,
  `id_catalogo_financiero` int(11) NOT NULL,
  `date_register` timestamp NOT NULL DEFAULT current_timestamp(),
  `date_update` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `estado` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_transaccion`
--

CREATE TABLE `detalle_transaccion` (
  `id` varchar(100) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `unidad_medida` varchar(500) NOT NULL,
  `precio_unitario` double NOT NULL,
  `precio_total` double NOT NULL,
  `id_transaccion` varchar(100) NOT NULL,
  `id_oferta` varchar(100) NOT NULL,
  `date_register` timestamp NOT NULL DEFAULT current_timestamp(),
  `date_update` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `estado` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `herramienta_financiera`
--

CREATE TABLE `herramienta_financiera` (
  `id` varchar(100) NOT NULL,
  `entidad_financiera` varchar(500) NOT NULL,
  `tipo_herramienta` varchar(500) NOT NULL,
  `id_person` varchar(100) NOT NULL,
  `date_register` timestamp NOT NULL DEFAULT current_timestamp(),
  `date_update` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `estado` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `oferta`
--

CREATE TABLE `oferta` (
  `id` varchar(100) NOT NULL,
  `img` varchar(500) NOT NULL,
  `descripcion` text NOT NULL,
  `cantidad` int(11) NOT NULL,
  `unidad_medida` varchar(500) NOT NULL,
  `precio_normal` double NOT NULL,
  `precio_oferta` double NOT NULL,
  `campo_precio_habilitado` varchar(500) NOT NULL,
  `caducidad` varchar(500) NOT NULL,
  `id_producto` varchar(100) NOT NULL,
  `date_register` timestamp NOT NULL DEFAULT current_timestamp(),
  `date_update` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `estado` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `person`
--

CREATE TABLE `person` (
  `dni` varchar(100) NOT NULL,
  `full_name` varchar(500) NOT NULL,
  `date_birth` date NOT NULL,
  `img` varchar(500) NOT NULL,
  `celular` varchar(500) NOT NULL,
  `email` varchar(500) NOT NULL,
  `user` varchar(500) NOT NULL,
  `password` varchar(500) NOT NULL,
  `direction` text NOT NULL,
  `date_register` timestamp NOT NULL DEFAULT current_timestamp(),
  `date_update` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `estado` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id` varchar(100) NOT NULL,
  `nombre` varchar(500) NOT NULL,
  `stock` int(11) NOT NULL,
  `unidad_medida_stock` varchar(500) NOT NULL,
  `id_user_ofertante` varchar(100) NOT NULL,
  `date_register` timestamp NOT NULL DEFAULT current_timestamp(),
  `date_update` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `estado` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `id` int(11) NOT NULL,
  `rol` varchar(500) NOT NULL,
  `descripcion` text NOT NULL,
  `img` varchar(500) NOT NULL,
  `date_register` timestamp NOT NULL DEFAULT current_timestamp(),
  `date_update` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `estado` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `transaccion`
--

CREATE TABLE `transaccion` (
  `id` varchar(100) NOT NULL,
  `cargo_transaccion` double NOT NULL,
  `sub_total_transaccion` double NOT NULL,
  `iva` double NOT NULL,
  `total_transaccion` double NOT NULL,
  `status_transaccion` varchar(500) NOT NULL,
  `id_herramienta_financiera` varchar(100) NOT NULL,
  `date_register` timestamp NOT NULL DEFAULT current_timestamp(),
  `date_update` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `estado` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` varchar(100) NOT NULL,
  `id_rol` int(11) NOT NULL,
  `id_person` varchar(100) NOT NULL,
  `date_register` timestamp NOT NULL DEFAULT current_timestamp(),
  `date_update` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `estado` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `catalogo_financiero`
--
ALTER TABLE `catalogo_financiero`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `detalle_herramienta_financiera`
--
ALTER TABLE `detalle_herramienta_financiera`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_catalogo_financiero` (`id_catalogo_financiero`),
  ADD KEY `id_herramienta_financiera` (`id_herramienta_financiera`);

--
-- Indices de la tabla `detalle_transaccion`
--
ALTER TABLE `detalle_transaccion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_transaccion` (`id_transaccion`),
  ADD KEY `id_oferta` (`id_oferta`);

--
-- Indices de la tabla `herramienta_financiera`
--
ALTER TABLE `herramienta_financiera`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_person` (`id_person`);

--
-- Indices de la tabla `oferta`
--
ALTER TABLE `oferta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `person`
--
ALTER TABLE `person`
  ADD PRIMARY KEY (`dni`),
  ADD UNIQUE KEY `celular` (`celular`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `user` (`user`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user_ofertante` (`id_user_ofertante`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `rol` (`rol`);

--
-- Indices de la tabla `transaccion`
--
ALTER TABLE `transaccion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_herramienta_financiera` (`id_herramienta_financiera`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_rol` (`id_rol`),
  ADD KEY `id_person` (`id_person`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `catalogo_financiero`
--
ALTER TABLE `catalogo_financiero`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalle_herramienta_financiera`
--
ALTER TABLE `detalle_herramienta_financiera`
  ADD CONSTRAINT `detalle_herramienta_financiera_ibfk_1` FOREIGN KEY (`id_herramienta_financiera`) REFERENCES `herramienta_financiera` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `detalle_herramienta_financiera_ibfk_2` FOREIGN KEY (`id_catalogo_financiero`) REFERENCES `catalogo_financiero` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `detalle_transaccion`
--
ALTER TABLE `detalle_transaccion`
  ADD CONSTRAINT `detalle_transaccion_ibfk_1` FOREIGN KEY (`id_transaccion`) REFERENCES `transaccion` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `detalle_transaccion_ibfk_2` FOREIGN KEY (`id_oferta`) REFERENCES `oferta` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `herramienta_financiera`
--
ALTER TABLE `herramienta_financiera`
  ADD CONSTRAINT `herramienta_financiera_ibfk_1` FOREIGN KEY (`id_person`) REFERENCES `person` (`dni`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `oferta`
--
ALTER TABLE `oferta`
  ADD CONSTRAINT `oferta_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`id_user_ofertante`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `transaccion`
--
ALTER TABLE `transaccion`
  ADD CONSTRAINT `transaccion_ibfk_1` FOREIGN KEY (`id_herramienta_financiera`) REFERENCES `herramienta_financiera` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `user_ibfk_2` FOREIGN KEY (`id_person`) REFERENCES `person` (`dni`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
