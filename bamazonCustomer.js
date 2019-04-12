var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "pUr5HLeFkp5E3Yk",
    database: "bamazon_db"
});

// ESTABLISH CONNECTION TO MYSQL

connection.connect(function (err) {
    if (err) throw err;
    // console.log('connected as id ' + connection.threadId);
    start();
});

// ENGAGE THE USER

function start() {
    inquirer
        .prompt({
            name: "inventory",
            type: "list",
            message: "\n ------ \n\n Welcome to Bamazon! \n\n ------ \n\n Would you like to see our current inventory? \n\n",
            choices: ["YES", "NO"]
        })
        .then(function (answer) {

            // BASED ON THEIR ANSWER, EITHER CALL THE INVENTORY OR RESTART THE PROMPT

            if (answer.inventory === "NO") {
                console.log("\n-------------------\n")
                console.log("Okey doke. Have a good 'un.")
                console.log("\n-------------------\n")
                start();
            }
            else {

                showInventory();
                
                // DISPLAY ITEMS THAT ARE FOR SALE
    
            };
        }
    )
}

// FUNCTION TO SHOW ITEMS THAT ARE FOR SALE



function showInventory() {

    // QUERY TO GET INFO FROM THE DB ABOUT THE ITEMS AVAILABLE TO BUY

    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function(err, res) {
        if (err) throw err;
    
        // PROMPT THE USER TO PICK AN ITEM

        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "rawlist",
                    choices: function() {
                        var productList = [];
                        // console.log(productList);
                        for (var i = 0; i < res.length; i++) {
                            productList.push(res[i].item_id + " || " + res[i].product_name + " || " + res[i].price + " || " + res[i].stock_quantity);
                        }
                        return productList;
                    }, 
                    message: "\n Which item would you like to buy?\n",
                },
                
                // PROMPT THE USER TO PICK AN AMOUNT

                {
                    name: "quantity",
                    type: "input",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    },
                    message: "\n How many would you like to buy?\n",
                }
            ])

            // COLLECT AND STORE THE INFORMATION OF THE CHOSEN ITEM

            .then(function(answer) {

                var chosenItem = answer.choice.split("||");
                var chosenItemPrice = parseFloat(chosenItem[2]);
                // console.log(chosenItemPrice);
                var quantity = parseFloat(answer.quantity);
                // console.log(quantity);

                console.log("\n ------ \n\nYou have chosen " + answer.quantity + " " + chosenItem[1]+"(s).");
                console.log("\nYour total will be $" + chosenItemPrice * quantity+ " plus tax and shipping.");

                // ASK IF USER WISHES TO CONTINUE WITH PURCHASE

                inquirer
                    .prompt({
                        name: "continue",
                        type: "list",
                        message: "\n ------ \n\n Would you like to continue with your purchase? \n\n",
                        choices: ["YES", "NO"]
                    })
                    .then(function(check) {

                        // BASED ON THEIR ANSWER, EITHER CALL THE INVENTORY OR RESTART THE PROMPT

                        if (check.continue === "NO") {
                            console.log("\n-------------------\n")
                            console.log("Okey doke.")
                            console.log("\n-------------------\n")
                            showInventory();
                        }
                        else {

                            // DETERMINE IF THERE IS ENOUGH QUANTITY

                            if (parseInt(chosenItem[3]) >= parseInt(answer.quantity)) {

                                // IF STOCK WAS SUFFICIENT,  UPDATE DB, LET THE USER KNOW, AND START OVER

                                connection.query(
                                    "UPDATE products SET ? WHERE ?",
                                    [
                                        {
                                            stock_quantity: chosenItem[3] - answer.quantity
                                        },
                                        {
                                            item_id: chosenItem[0]
                                        },
                                    ],
                                    function (err) {
                                        if (err) throw err;
                                        console.log("\n-------------------\n")
                                        console.log("Purchase was successful! Your" + chosenItem[1] + "is on its way!");
                                        console.log("\n-------------------\n")
                                        start();
                                    }
                                );
                            }
                            else {
                                
                                // IF THERE IS NOT ENOUGH, GO BACK TO INVENTORY LIST
                                
                                console.log("\n-------------------\n")
                                console.log("There aren't enough of those items to meet your request.\n\nPlease try another amount or another item...");
                                console.log("\n-------------------\n")
                                showInventory();
                            };
                        };
                    }); 
                    
                    
        });
    })
 }
