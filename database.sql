CREATE DATABASE IF NOT EXISTS auth_demo;
USE auth_demo;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);

-- Quick read script to check your table entries later
SELECT * FROM users;