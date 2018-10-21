const mysql = require("mysql")
const inquirer = require("inquirer")
const cTable = require("console.table")

// Creating the connection information for the database
const connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "",
    database: "bamazon"
})

// Connecting to the MySQL server and database
connection.connect(function(error) {
    if (error) throw error
    goShopping()
})

// The function that allows the user to go shopping and purchase particular quantities of items
function goShopping() {

    // Generating the table that displays all of the products, their prices, and quantities
    connection.query("SELECT * FROM products", function(error, results, fields) {
        if (error) throw error
        console.table(results)
    
    // The question prompt that walks the user through the buying process
    inquirer
        .prompt([
            {
                name: "item",
                type: "input",
                message: "What is the ID of the product you would like to buy?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    } else {
                        return "Please input a number!";
                    }
                }
            },
            {
                name: "quantity",
                type: "input",
                message: "How many would you like to purchase?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    } else {
                        return "Please input a number!"
                    }
                }
            }
        ])
        .then(function(answer) {
            let selectedItem = answer.item 
            let selectedId = results[selectedItem]
            let selectedQuantity = answer.quantity

            if (selectedQuantity < selectedId.stock_quantity) {

                console.log("Awesome! It is in stock! Let me go place the order...")

                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: selectedId.stock_quantity - selectedQuantity
                        },
                        {
                            id: selectedId.id
                        }
                    ],
                    function(error, results) {
                        if (error) throw error
                        console.log("Your order has been placed! Your total is $" + selectedId.price * selectedQuantity)
                    }
                )
            } else {
                console.log("There is not enough left in stock!")
            }
        
        })
    
    })
}
