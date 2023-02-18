CREATE DATABASE IF NOT EXISTS `LostAndFound` 
USE `LostAndFound` ;
CREATE TABLE IF NOT EXISTS `LostItems` (
  `LostItemsID` INT NOT NULL AUTO_INCREMENT,
  `lostitemname` VARCHAR(45) NULL DEFAULT NULL,
  `dateandtimefound` DATETIME NULL DEFAULT NULL,
  `location` VARCHAR(45) NULL DEFAULT NULL,
  `reportedby` VARCHAR(45) NULL DEFAULT NULL,
  `description` VARCHAR(100) NULL DEFAULT NULL,
  `lostitemimage` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`LostItemsID`))ENGINE = InnoDB AUTO_INCREMENT = 32 DEFAULT CHARACTER SET = utf8 COLLATE = utf8_unicode_ci;

