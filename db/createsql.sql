-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
SET sql_mode = '';
-- -----------------------------------------------------
-- Schema sothoth_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema sothoth_db
-- -----------------------------------------------------


-- -----------------------------------------------------
-- Table `sothoth_db`.`accounts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sothoth_db`.`accounts` (
  `account_id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `email` VARCHAR(50) NOT NULL UNIQUE,
  `password` VARCHAR(256) NOT NULL,
  `role` ENUM('user', 'admin', 'owner') NOT NULL DEFAULT 'user',
  `salt` VARCHAR(16) NOT NULL,
  PRIMARY KEY (`account_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sothoth_db`.`stories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sothoth_db`.`stories` (
  `story_id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(50) NOT NULL,
  `content` TEXT NOT NULL,
  `date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_edited` TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  `summary` TEXT NULL,
  `public` TINYINT NOT NULL DEFAULT 0,
  `account_id` INT NOT NULL,
  PRIMARY KEY (`story_id`, `account_id`),
  CONSTRAINT `fk_stories_accounts`
    FOREIGN KEY (`account_id`)
    REFERENCES `sothoth_db`.`accounts` (`account_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sothoth_db`.`collections`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sothoth_db`.`collections` (
  `collection_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL UNIQUE,
  `description` TEXT NULL,
  PRIMARY KEY (`collection_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sothoth_db`.`post`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sothoth_db`.`posts` (
  `post_id` INT NOT NULL AUTO_INCREMENT,
  `content` TEXT NOT NULL,
  `date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `account_id` INT NOT NULL,
  `story_id` INT NULL,
  `collection_id` INT NULL,
  PRIMARY KEY (`post_id`, `account_id`),
  CONSTRAINT `fk_post_accounts1`
    FOREIGN KEY (`account_id`)
    REFERENCES `sothoth_db`.`accounts` (`account_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_post_stories1`
    FOREIGN KEY (`story_id`)
    REFERENCES `sothoth_db`.`stories` (`story_id`)
    ON DELETE SET NULL
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_post_collection1`
    FOREIGN KEY (`collection_id`)
    REFERENCES `sothoth_db`.`collections` (`collection_id`)
    ON DELETE SET NULL
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sothoth_db`.`comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sothoth_db`.`comments` (
  `comment_id` INT NOT NULL AUTO_INCREMENT,
  `content` TEXT NOT NULL,
  `account_id` INT NOT NULL,
  `story_id` INT NOT NULL,
  `date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`comment_id`, `story_id`),
  CONSTRAINT `fk_comments_accounts1`
    FOREIGN KEY (`account_id`)
    REFERENCES `sothoth_db`.`accounts` (`account_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_comments_stories1`
    FOREIGN KEY (`story_id`)
    REFERENCES `sothoth_db`.`stories` (`story_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sothoth_db`.`account_collection`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sothoth_db`.`account_collection` (
  `account_id` INT NOT NULL,
  `collection_id` INT NOT NULL,
  `role` ENUM('owner', 'member') NOT NULL DEFAULT 'member',
  PRIMARY KEY (`account_id`, `collection_id`),
  CONSTRAINT `fk_accounts_has_collection_accounts1`
    FOREIGN KEY (`account_id`)
    REFERENCES `sothoth_db`.`accounts` (`account_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_accounts_has_collection_collection1`
    FOREIGN KEY (`collection_id`)
    REFERENCES `sothoth_db`.`collections` (`collection_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sothoth_db`.`story_collection`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sothoth_db`.`story_collection` (
  `story_id` INT NOT NULL,
  `collection_id` INT NOT NULL,
  PRIMARY KEY (`story_id`, `collection_id`),
  CONSTRAINT `fk_stories_has_collection_stories1`
    FOREIGN KEY (`story_id`)
    REFERENCES `sothoth_db`.`stories` (`story_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_stories_has_collection_collection1`
    FOREIGN KEY (`collection_id`)
    REFERENCES `sothoth_db`.`collections` (`collection_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sothoth_db`.`userinfo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sothoth_db`.`userinfo` (
  `account_id` INT NOT NULL,
  `display_email` VARCHAR(45) NULL,
  `display_name` VARCHAR(50) NOT NULL,
  `description` TEXT NULL,
  PRIMARY KEY (`account_id`),
  CONSTRAINT `fk_userinfo_accounts1`
    FOREIGN KEY (`account_id`)
    REFERENCES `sothoth_db`.`accounts` (`account_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
