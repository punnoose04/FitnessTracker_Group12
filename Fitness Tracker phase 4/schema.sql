CREATE DATABASE signin_information;

USE signin_information;

CREATE TABLE users (
	id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL,
    pass VARCHAR(100) NOT NULL
);

INSERT INTO users (email, pass)
VALUES
("test@gmail.com", "testpassword123");

INSERT INTO users (email, pass)
VALUES
("test", "test");