const mysql = require("mysql")
const inquirer = require("inquirer")
const cTable = require("console.table")

// Creating the connection information for the database
const connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
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
                // Asking the user the id of the product
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
                // Asking the user how much of the product they would like to buy
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
            let selectedItem = parseInt(answer.item) - 1
            // console.log(selectedItem)
            let selectedId = results[selectedItem]
            // console.log(selectedId)
            let selectedQuantity = answer.quantity
            // console.log(selectedQuantity)

            // If the amount that the user wants to buy is less than the amount in stock, update the database and complete purchase
            if (selectedQuantity < selectedId.stock_quantity) {
                // Let the user know that it is in stock
                console.log("Awesome! It is in stock! Let me go place the order...")
                // Update the database
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
                        // Let the user know that their order has been placed
                        console.log("Your order has been placed! Your total is $" + selectedId.price * selectedQuantity + ".")
                    }
                )
            } else {
                // If there is not enough in stock, let the user know
                console.log("There is not enough left in stock!")
            }
        
        })
    
    })
}
