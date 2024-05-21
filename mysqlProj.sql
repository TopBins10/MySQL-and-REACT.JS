CREATE DATABASE demo_app;
USE demo_app;
CREATE TABLE Customers (
    CustomerID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100),
    Email VARCHAR(100)
);
CREATE TABLE Orders (
    OrderID INT AUTO_INCREMENT PRIMARY KEY,
    OrderDate DATE,
    Amount DECIMAL(10, 2),
    CustomerID INT,
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);

INSERT INTO Customers (Name, Email) VALUES ('John Doe', 'john.doe@example.com');
INSERT INTO Customers (Name, Email) VALUES ('Visva Murali', 'visva.mur@example.com');

-- Populate Customers Table
INSERT INTO Customers (Name, Email)
SELECT 
    CONCAT('Name', FLOOR(1000 + RAND() * 9000)), 
    CONCAT('user', FLOOR(1000 + RAND() * 9000), '@example.com')
FROM 
    dual
LIMIT 10;  -- Change the limit to insert more rows

INSERT INTO Orders (OrderDate, Amount, CustomerID)
SELECT 
    DATE_ADD('2023-03-01', INTERVAL FLOOR(RAND() * 365) DAY),  -- Random date within the year 2023
    ROUND(RAND() * 100, 2),  -- Random amount between 0.00 and 100.00
    FLOOR(1 + RAND() * 100)  -- Random CustomerID between 1 and 100 (adjust based on your actual CustomerID range)
FROM 
    dual
LIMIT 5;  -- Insert 5 rows


INSERT INTO Orders (OrderDate, Amount, CustomerID) VALUES ('2024-05-15', 199.99, 1);
INSERT INTO Orders (OrderDate, Amount, CustomerID) VALUES ('2024-05-15', 100.99, 2);
INSERT INTO Orders (OrderDate, Amount, CustomerID) VALUES ('2024-05-15', 50.99, 3);

SELECT * FROM Customers;
SELECT * FROM Orders;


SHOW TABLES;


DESCRIBE Customers;
DESCRIBE Orders;