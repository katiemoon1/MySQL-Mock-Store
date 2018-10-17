var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "",
    database: "bamazon"
});

connection.connect(function(error) {
    if (error) throw error;
    connection.query("SELECT * FROM products", function(error, results, fields) {
        if (error) throw error;
        console.log(results);
    });
    // goShopping();
  });

// function goShopping() {
//     inquirer
//         .prompt({

//         })
// }