-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema LostAndFound
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema LostAndFound
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `LostAndFound` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `LostAndFound` ;

-- -----------------------------------------------------
-- Table `LostAndFound`.`LostItems`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `LostAndFound`.`LostItems` (
  `LostItemsID` INT NOT NULL AUTO_INCREMENT,
  `lostitemname` VARCHAR(45) NULL DEFAULT NULL,
  `dateandtimefound` DATETIME NULL DEFAULT NULL,
  `location` VARCHAR(45) NULL DEFAULT NULL,
  `reportedby` VARCHAR(45) NULL DEFAULT NULL,
  `description` VARCHAR(100) NULL DEFAULT NULL,
  `lostitemimage` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`LostItemsID`))
ENGINE = InnoDB
AUTO_INCREMENT = 32
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
