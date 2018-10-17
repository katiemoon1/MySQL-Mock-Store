var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");

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
        console.table(results);
        goShopping();
    });
  });

function goShopping() {
    inquirer
        .prompt([
            {
                name: "item",
                type: "input",
                message: "What is the ID of the product you would like to buy?",
                validate: function(value) {

                }
            },
            {
                name: "quantity",
                type: "input",
                message: "How many would you like to purchase?"
            }
        ])
};


// Function for updating the inventory
function updateInventory() {
    console.log("Updating the inventory!");

    if (answer.quantity < stock_quantity) {
        connection.query(
            "UPDATE products SET ? WHERE ?",
            [
                {
                    stock_quantity: answer.quantity
                },
                {
                    id: answer.item
                }
            ],
            function(error, results) {
                console.log(results.affectedRows + " products updated!");
            }
        )
    } else {
        console.log("There is not enough left in stock!")
    }

};