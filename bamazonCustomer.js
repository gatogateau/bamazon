var inquirer = require("inquirer");
var mysql = require("mysql");




// set up connection to mysql
var connection = mysql.createConnection({
    host: "localhost",
    // connected to 8889 
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
})
connection.connect(function (err) {
    console.log(connection.threadId);
    // start();
});


// Display all products
function readProducts() {
    console.log("list of all products");
    connection.query("SELECT * FROM items", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(res);
        // connection.end();

        runInquire();
    });

}
readProducts();

function runInquire() {
    inquirer
        .prompt([
            // first prompt to get the order
            {
                type: "checkbox",
                message: "what is the id number you want to order?",
                choices: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
                name: "orderId"
            },
            {
                type: "confirm",
                message: "Are you sure:",
                name: "confirm",
                default: true
            },
            {
                type: "input",
                message: "How many units would you like to order?",
                name: "quantity",
                default: 1
            }

        ])
        .then(function (inquirerResponse) {
            // confirm answer
            if (inquirerResponse.confirm) {
                //                 // validate quantity as a number and stock_quantity is > order quantity

                if (parseInt(inquirerResponse.quantity) > 0) {
                    // verify stock_quantity is > order quantity
                    var query = "SELECT stock_quantity FROM items WHERE ?";
                    // determining what type orderID is.
                    // console.log("this is the orderId object " + inquirerResponse.orderId);
                    // console.log(typeof(inquirerResponse.orderId));

                    // made object into a string
                    var makeString = inquirerResponse.orderId.toString();


                    connection.query(query, {
                        item_id: makeString
                    }, function (err, res) {
                        console.log(res);
                        updateProduct();
                    });

                    function readProducts() {
                        console.log("list of all products");
                        connection.query("SELECT stock_quantity FROM items WHERE item_id = ?", [inquirerResponse.orderId],
                            function (err, res) {
                                if (err) throw err;
                                // Log all results of the SELECT statement
                                console.log("this is the quantity " + res[0].stock_quantity);
                                // connection.end();
                                var stock_quantity = res[0].stock_quantity;



                                function updateProduct() {
                                    console.log("Updating stock.\n");

                                    // set the new quantity after the order

                                    var newQuantity = (stock_quantity) - parseInt(inquirerResponse.quantity);
                                    console.log("the new quantity should be " + newQuantity);

                                    if (newQuantity > 0) {




                                        connection.query(

                                            "UPDATE items SET ? WHERE ?", [{
                                                    // stock quantity from SQL.
                                                    stock_quantity: newQuantity,
                                                },
                                                {
                                                    Item_Id: inquirerResponse.orderId
                                                }
                                            ],
                                            function (err, res) {
                                                console.log(res.affectedRows + " products updated!\n");
                                            }
                                        );
                                    } else {
                                        console.log("not enough in stock, please re-order");
                                    }

                                };


                                // call updateProduct()
                                updateProduct();

                            });
                    };
                    // call readProducts()
                    readProducts();



                    function updateProduct() {
                        console.log("Updating stock.\n");

                        // set stockquantity equal to the query stock_quantity. 






                        var stock_quantity = 400;
                        var newQuantity = (stock_quantity) - parseInt(inquirerResponse.quantity);
                        console.log("the new quantity should be " + newQuantity);

                        connection.query(

                            "UPDATE items SET ? WHERE ?", [{
                                    // stock quantity from SQL.
                                    stock_quantity: newQuantity,
                                },
                                {
                                    Item_Id: inquirerResponse.orderId
                                }
                            ],
                            function (err, res) {
                                console.log(res.affectedRows + " products updated!\n");
                            }
                        );
                    };





                    console.log("\nYou have ordered a quantity of " + inquirerResponse.quantity + ", of item ID #" + inquirerResponse.orderId);
                } else {
                    console.log("\nPlease enter an integer for your quantity.\n");
                }
            };
        });
};

// check if inventory is available