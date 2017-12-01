DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products
(
  item_id INT NOT NULL
  AUTO_INCREMENT,
  product_name VARCHAR
  (60) NOT NULL,
  department_name VARCHAR
  (60),
  price DECIMAL
  (9, 2) NOT NULL,
  stock_quantity INT
  (6),
  PRIMARY KEY
  (item_id)
);

  INSERT INTO products
    (product_name, department_name, price, stock_quantity)
  VALUES
    ("Playstation 4 Pro", "Video Games", 399.99, 10);


  INSERT INTO products
    (product_name, department_name, price, stock_quantity)
  VALUES
    ("Sony XBR55X900E 4K TV", "Electronics", 999.99, 10);


  INSERT INTO products
    (product_name, department_name, price, stock_quantity)
  VALUES
    ("Super Mario Odyssey", "Video Games", 59.99, 10);


  INSERT INTO products
    (product_name, department_name, price, stock_quantity)
  VALUES
    ("1L Digital Gooseneck Kettle", "Kitchen", 67.99, 10);


  INSERT INTO products
    (product_name, department_name, price, stock_quantity)
  VALUES
    ("Kalita Wave 185 Coffee Dripper", "Kitchen", 25.62, 10);


  INSERT INTO products
    (product_name, department_name, price, stock_quantity)
  VALUES
    ("9x13 Baking Pan with Cover", "Kitchen", 11.81, 10);


  INSERT INTO products
    (product_name, department_name, price, stock_quantity)
  VALUES
    ("Baby Bandana Drool Bib", "Baby", 22.95, 10);


  INSERT INTO products
    (product_name, department_name, price, stock_quantity)
  VALUES
    ("Wiremold Cable Concealer", "Home Improvement", 19.98, 10);


  INSERT INTO products
    (product_name, department_name, price, stock_quantity)
  VALUES
    ("Stainless Steel License Plate Frame", "Automotive", 9.99, 10);


  INSERT INTO products
    (product_name, department_name, price, stock_quantity)
  VALUES
    ("LIFX Wi-Fi Smart LED Light Bulb", "Home Improvement", 54.99, 10);
