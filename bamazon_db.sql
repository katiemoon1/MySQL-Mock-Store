-- Deleting the database if it already exists
DROP DATABASE IF EXISTS bamazon;
-- Creating the database bamazon
CREATE DATABASE bamazon;
-- Telling MySQL to use bamazon database
USE bamazon;
-- Creating a new table with certain column names
CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,4) NOT NULL,
    stock_quantity DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (id)
);

-- Inserting values into the newly made database
-- Semicolon does not need to go after INSERT INTO, it will throw a syntax error
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
    ('ice cream', 'dessert', 3.50, 5), 
    ('scarf', 'clothes', 10.00, 3), 
    ('tent', 'camping', 50.00, 2), 
    ('dog treats', 'pets', 4.75, 9), 
    ('book', 'literature', 3.75, 10), 
    ('apples', 'food', 1.00, 10), 
    ('cup', 'home', 2.50, 7), 
    ('plant', 'garden', 6.50, 8),
    ('picture frame', 'home', 3.75, 6),
    ('notebook', 'office', 2.75, 4);

SELECT * FROM products;