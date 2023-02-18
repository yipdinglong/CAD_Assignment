CREATE SCHEMA IF NOT EXISTS `LostAndFound` 
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
