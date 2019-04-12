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

// ADDRESS THE MANAGER

function start() {
    inquirer
        .prompt({
            name: "inventory",
            type: "list",
            message: "\n ------ \n\n Hello Mr. Manager \n\n ------ \n\n What would you like to do? \n\n",
            choices: ["VIEW ALL PRODUCTS FOR SALE", "VIEW ITEMS WITH LOW INVENTORY"]
        })
        .then(function (answer) {
            if (answer.inventory === "VIEW ALL PRODUCTS FOR SALE") {
                showInventory();
            } else if (answer.inventory === "VIEW ITEMS WITH LOW INVENTORY") {
                lowInventory();
                // }else if (answer.inventory === "ADD NEW PRODUCT") {
                //     addProduct();
            } else {
                console.log("\n-------------------\n")
                console.log("Okey doke. Have a good 'un.")
                console.log("\n-------------------\n")
                start();
            };
        })
}

function showInventory() {

    connection.query("SELECT item_id, product_name, department_name, price, stock_quantity FROM products", function (err, res) {
        if (err) throw err;

        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "rawlist",
                    choices: function () {
                        var productList = [];
                        for (var i = 0; i < res.length; i++) {
                            productList.push(res[i].item_id + " || " + res[i].product_name + " || " + res[i].department_name + " || " + res[i].price + " || " + res[i].stock_quantity);
                        }
                        return productList;
                    },
                    message: "\n Select an item you would like to adjust.\n"
                },
                {
                    name: "add",
                    type: "input",
                    message: "\n How many more of these items you like to add? \n",
                }
            ])

            .then(function (answer) {

                var chosenItem = answer.choice.split("||");
                var quantity = parseInt(answer.add);

                console.log("\n ------ \n\nYou have chosen to add " + quantity + " " + chosenItem[1] + "(s) to the inventory.");

                inquirer
                    .prompt({
                        name: "continue",
                        type: "list",
                        message: "\n ------ \n\n Would you like to continue with your adjustment? \n\n",
                        choices: ["YES", "NO"]
                    })

                    .then(function (check) {

                        // BASED ON THEIR ANSWER, EITHER CALL THE INVENTORY OR RESTART THE PROMPT

                        if (check.continue === "NO") {
                            console.log("\n-------------------\n")
                            console.log("Okey doke.")
                            console.log("\n-------------------\n")
                            showInventory();
                        }
                        else {
                            connection.query(
                                "UPDATE products SET ? WHERE ?",
                                [
                                    {
                                        stock_quantity: parseInt(chosenItem[4]) + parseInt(quantity)
                                    },
                                    {
                                        item_id: chosenItem[0]
                                    },
                                ],
                                function (err) {
                                    if (err) throw err;
                                    console.log("\n-------------------\n")
                                    console.log("Update was successful! " + quantity + " " + chosenItem[1] + "(s) " + "have been added to the inventory.");
                                    console.log("\n-------------------\n")
                                    start();
                                }
                            );
                        }
                    });
            });
    });
}

function lowInventory() {

    connection.query("SELECT item_id, product_name, department_name, price, stock_quantity FROM products GROUP BY item_id, product_name, department_name, price, stock_quantity HAVING stock_quantity < 5", function (err, res) {
        if (err) throw err;

        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "rawlist",
                    message: "\n Select an item you would like to restock.\n",
                    choices: function () {
                        var productList = [];
                        for (var i = 0; i < res.length; i++) {
                            productList.push(res[i].item_id + " || " + res[i].product_name + " || " + res[i].department_name + " || " + res[i].price + " || " + res[i].stock_quantity);
                        }
                        return productList;
                    }
                },
                {
                    name: "add",
                    type: "input",
                    message: "\n How many more of these items you like to add? \n",
                }
            ])

            .then(function (answer) {

                var chosenItem = answer.choice.split("||");
                var quantity = parseInt(answer.add);

                console.log("\n ------ \n\nYou have chosen to add " + quantity + " " + chosenItem[1] + "(s) to the inventory.");

                inquirer
                    .prompt({
                        name: "continue",
                        type: "list",
                        message: "\n ------ \n\n Would you like to continue with your adjustment? \n\n",
                        choices: ["YES", "NO"]
                    })

                    .then(function (check) {

                        if (check.continue === "NO") {
                            console.log("\n-------------------\n")
                            console.log("Okey doke.")
                            console.log("\n-------------------\n")
                            lowInventory();
                        }
                        else {
                            connection.query(
                                "UPDATE products SET ? WHERE ?",
                                [
                                    {
                                        stock_quantity: parseInt(chosenItem[4]) + parseInt(quantity)
                                    },
                                    {
                                        item_id: chosenItem[0]
                                    },
                                ],
                                function (err) {
                                    if (err) throw err;
                                    console.log("\n-------------------\n")
                                    console.log("Update was successful! " + quantity + " " + chosenItem[1] + "(s) " + "have been added to the inventory.");
                                    console.log("\n-------------------\n")
                                    start();
                                }
                            );
                        }
                    });
            });

    })
}

//////////////////////
// May not need this
//////////////////////

// function adjustInventory() {

//     connection.query("SELECT item_id, product_name, department_name, price, stock_quantity FROM products", function (err, res) {
//         if (err) throw err;

//         inquirer
//             .prompt([
//                 {
//                     name: "choice",
//                     type: "rawlist",
//                     message: "\n Confirm which item would you like to restock?\n",
//                     choices: function () {
//                         var productList = [];
//                         for (var i = 0; i < res.length; i++) {
//                             productList.push(res[i].item_id + " || " + res[i].product_name + " || " + res[i].department_name + " || " + res[i].price + " || " + res[i].stock_quantity);
//                         }
//                         return productList;
//                     }
//                 },
//                 {
//                     name: "add",
//                     type: "input",
//                     message: "\n How many more of these items you like to add? \n",
//                 }
//             ])

//             .then(function (answer) {

//                 var chosenItem = answer.choice.split("||");
//                 var quantity = parseInt(answer.add);

//                 console.log("\n ------ \n\nYou have chosen to add " + quantity + " " + chosenItem[1] + "(s) to the inventory.");

//                 inquirer
//                     .prompt({
//                         name: "continue",
//                         type: "list",
//                         message: "\n ------ \n\n Would you like to continue with your adjustment? \n\n",
//                         choices: ["YES", "NO"]
//                     })

//                     .then(function (check) {

//                         // BASED ON THEIR ANSWER, EITHER CALL THE INVENTORY OR RESTART THE PROMPT

//                         if (check.continue === "NO") {
//                             console.log("\n-------------------\n")
//                             console.log("Okey doke.")
//                             console.log("\n-------------------\n")
//                             addToIventory();
//                         }
//                         else {
//                             connection.query(
//                                 "UPDATE products SET ? WHERE ?",
//                                 [
//                                     {
//                                         stock_quantity: parseInt(chosenItem[4]) + parseInt(quantity)
//                                     },
//                                     {
//                                         item_id: chosenItem[0]
//                                     },
//                                 ],
//                                 function (err) {
//                                     if (err) throw err;
//                                     console.log("\n-------------------\n")
//                                     console.log("Update was successful! " + quantity + " " + chosenItem[1] + "(s) " + "have been added to the inventory.");
//                                     console.log("\n-------------------\n")
//                                     showInventory();
//                                 }
//                             );
//                         }
//                     });
//             });
//     });
// }