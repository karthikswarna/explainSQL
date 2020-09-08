const sqliteParser = require('sqlite-parser');
const fs = require('fs');

// var query = 'select pants, shirts from laundry where (pants.cost > 50 and shirts.cost  > 30) or shirts.cost < pants.cost;';
// var query = "SELECT * FROM Customers LIMIT 3;";
// var query = "SELECT * FROM Customers WHERE CustomerName LIKE 'a%';";
// var query = "SELECT * FROM Customers WHERE Country NOT IN ('Germany', 'France', 'UK');";
// var query = "SELECT * FROM Products WHERE Price NOT BETWEEN 10 AND 20;";
// var query = "SELECT column_name FROM table1 FULL OUTER JOIN table2 ON table1.column_name = table2.column_name;";
// var query = "SELECT column_name FROM table1 T1, table1 T2 WHERE condition;";
// var query = "SELECT City FROM Customers UNION ALL SELECT City FROM Suppliers ORDER BY City;";
// var query = "SELECT OrderID, Quantity,CASE WHEN Quantity > 30 THEN 'The quantity is greater than 30' WHEN Quantity = 30 THEN 'The quantity is 30' ELSE 'The quantity is under 30' END AS QuantityText FROM OrderDetails;;";
var query = "SELECT * FROM Customers WHERE Country NOT IN ('Germany', 'France', 'UK');";
// var query = "SELECT * FROM Products WHERE Price BETWEEN 50 AND 60;";
// var query = "SELECT MIN(Price) AS SmallestPrice FROM Products;";
// var query = "SELECT COUNT(ProductID) FROM Products;";
// var query = "UPDATE Customers SET ContactName = 'Alfred Schmidt', City = 'Frankfurt' WHERE CustomerID = 1;";
// var query = "INSERT INTO Customers (CustomerName, City, Country) VALUES ('Cardinal', 'Stavanger', 'Norway');";



sqliteParser(query, (err, ast) => 
{
	if(err)
		throw err;
	
	console.log(ast);
	fs.writeFile('./ast.json', JSON.stringify(ast, null, '\t'), (err) => 
	{
		if(err) 
			throw err;
	});
});