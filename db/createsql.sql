-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema sothothpress
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema sothothpress
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `sothothpress` DEFAULT CHARACTER SET utf8 ;
USE `sothothpress` ;

-- -----------------------------------------------------
-- Table `sothothpress`.`accounts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sothothpress`.`accounts` (
  `account_id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(20) NOT NULL UNIQUE,
  `email` VARCHAR(45) NOT NULL UNIQUE,
  `password` VARCHAR(128) NOT NULL,
  `role` ENUM('user', 'admin', 'owner') NOT NULL DEFAULT 'user',
  `deactivated` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`account_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sothothpress`.`stories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sothothpress`.`stories` (
  `story_id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(50) NOT NULL,
  `content` TEXT NOT NULL,
  `date` DATE NOT NULL,
  `last_edited` DATE NULL,
  `summary` TEXT NULL,
  `public` TINYINT NOT NULL DEFAULT 0,
  `account_id` INT NOT NULL,
  PRIMARY KEY (`story_id`, `account_id`),
  CONSTRAINT `fk_stories_accounts`
    FOREIGN KEY (`account_id`)
    REFERENCES `sothothpress`.`accounts` (`account_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sothothpress`.`collections`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sothothpress`.`collections` (
  `collection_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL UNIQUE,
  `description` VARCHAR(130) NULL,
  PRIMARY KEY (`collection_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sothothpress`.`post`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sothothpress`.`posts` (
  `post_id` INT NOT NULL AUTO_INCREMENT,
  `content` TEXT NOT NULL,
  `date` DATE NOT NULL,
  `account_id` INT NOT NULL,
  `story_id` INT NULL,
  `collection_id` INT NULL,
  PRIMARY KEY (`post_id`, `account_id`),
  CONSTRAINT `fk_post_accounts1`
    FOREIGN KEY (`account_id`)
    REFERENCES `sothothpress`.`accounts` (`account_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_post_stories1`
    FOREIGN KEY (`story_id`)
    REFERENCES `sothothpress`.`stories` (`story_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_post_collection1`
    FOREIGN KEY (`collection_id`)
    REFERENCES `sothothpress`.`collections` (`collection_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sothothpress`.`comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sothothpress`.`comments` (
  `comment_id` INT NOT NULL AUTO_INCREMENT,
  `content` TEXT NOT NULL,
  `account_id` INT NULL,
  `story_id` INT NOT NULL,
  `date` DATE NOT NULL,
  PRIMARY KEY (`comment_id`, `story_id`),
  CONSTRAINT `fk_comments_accounts1`
    FOREIGN KEY (`account_id`)
    REFERENCES `sothothpress`.`accounts` (`account_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_comments_stories1`
    FOREIGN KEY (`story_id`)
    REFERENCES `sothothpress`.`stories` (`story_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sothothpress`.`account_collection`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sothothpress`.`account_collection` (
  `account_id` INT NOT NULL,
  `collection_id` INT NOT NULL,
  PRIMARY KEY (`account_id`, `collection_id`),
  CONSTRAINT `fk_accounts_has_collection_accounts1`
    FOREIGN KEY (`account_id`)
    REFERENCES `sothothpress`.`accounts` (`account_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_accounts_has_collection_collection1`
    FOREIGN KEY (`collection_id`)
    REFERENCES `sothothpress`.`collections` (`collection_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sothothpress`.`story_collection`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sothothpress`.`story_collection` (
  `story_id` INT NOT NULL,
  `collection_id` INT NOT NULL,
  PRIMARY KEY (`story_id`, `collection_id`),
  CONSTRAINT `fk_stories_has_collection_stories1`
    FOREIGN KEY (`story_id`)
    REFERENCES `sothothpress`.`stories` (`story_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_stories_has_collection_collection1`
    FOREIGN KEY (`collection_id`)
    REFERENCES `sothothpress`.`collections` (`collection_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sothothpress`.`userinfo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sothothpress`.`userinfo` (
  `account_id` INT NOT NULL,
  `number` VARCHAR(20) NULL,
  `display_email` VARCHAR(45) NULL,
  `display_name` VARCHAR(50) NOT NULL,
  `description` TEXT NULL,
  PRIMARY KEY (`account_id`),
  CONSTRAINT `fk_userinfo_accounts1`
    FOREIGN KEY (`account_id`)
    REFERENCES `sothothpress`.`accounts` (`account_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
