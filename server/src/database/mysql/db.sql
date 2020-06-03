-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema ecoleta
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ecoleta` DEFAULT CHARACTER SET utf8 ;
USE `ecoleta` ;

-- -----------------------------------------------------
-- Table `ecoleta`.`state`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecoleta`.`state` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `abbreviation` VARCHAR(2) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ecoleta`.`points`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecoleta`.`points` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `whatsapp` VARCHAR(15) NOT NULL,
  `image` VARCHAR(100) NOT NULL,
  `latitude` DECIMAL(9,7) NOT NULL,
  `longitude` DECIMAL(9,7) NOT NULL,
  `city` VARCHAR(100) NOT NULL,
  `state_id` INT UNSIGNED NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_points_state1_idx` (`state_id` ASC) VISIBLE,
  CONSTRAINT `fk_points_state1`
    FOREIGN KEY (`state_id`)
    REFERENCES `ecoleta`.`state` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ecoleta`.`items`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecoleta`.`items` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(50) NOT NULL,
  `image` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ecoleta`.`points_has_items`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecoleta`.`points_has_items` (
  `points_id` INT UNSIGNED NOT NULL,
  `items_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`points_id`, `items_id`),
  INDEX `fk_points_has_items_items1_idx` (`items_id` ASC) VISIBLE,
  INDEX `fk_points_has_items_points1_idx` (`points_id` ASC) VISIBLE,
  CONSTRAINT `fk_points_has_items_points1`
    FOREIGN KEY (`points_id`)
    REFERENCES `ecoleta`.`points` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_points_has_items_items1`
    FOREIGN KEY (`items_id`)
    REFERENCES `ecoleta`.`items` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
