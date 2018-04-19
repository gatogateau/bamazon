DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE items(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR (45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(5,2) NOT NULL,
  stock_quantity INTEGER (6) NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO items (product_name, department_name, price, stock_quantity) VALUES ("Iron Man Decal","Electronics",5.99,12 );
INSERT INTO items (product_name, department_name, price, stock_quantity) VALUES ("Deadman's coffee","food",14.99,8 );
INSERT INTO items (product_name, department_name, price, stock_quantity) VALUES ("red stapler","office",8.49,22 );
INSERT INTO items (product_name, department_name, price, stock_quantity) VALUES ("star wars light saber spatula","kitchen",18.15,4 );
INSERT INTO items (product_name, department_name, price, stock_quantity) VALUES ("Stainless Steel wine glasses","kitchen",24.34,6 );
INSERT INTO items (product_name, department_name, price, stock_quantity) VALUES ("Bluetooth Headphones","Electronics",35.99,98 );
INSERT INTO items (product_name, department_name, price, stock_quantity) VALUES ("Vintage Turntable","Electronics",88.23,3 );
INSERT INTO items (product_name, department_name, price, stock_quantity) VALUES ("Scrabble","games",18.00,25 );
INSERT INTO items (product_name, department_name, price, stock_quantity) VALUES ("Double Sleeping pad","Camping",122.66,9 );
INSERT INTO items (product_name, department_name, price, stock_quantity) VALUES ("ducttape","home",4.99,104 );
