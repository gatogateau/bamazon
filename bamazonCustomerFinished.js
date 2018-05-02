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

    // start()
    makeTable();
});



// Display all products
var makeTable = function () {
    console.log("list of all products");
    connection.query("SELECT * FROM items", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        // console.log(res);
        // connection.end();
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].product_name + "||" + res[i].department_name + "||" + res[i].price + "||" + res[i].stock_quantity + "\n");

        }

        promptCustomer(res);
    });

}
var promptCustomer = function (res) {
    inquirer.prompt([{
            type: "input",
            name: "choice",
            message: "what would you like to purchase? [Q to quit]"
        }])
        .then(function (answer) {
            console.log ("you chose " + answer.choice);
            var correct = false;
            
            // to quit
            if (answer.choice.toUpperCase()==="Q"){
                console.log("EXIT");
                process.exit()
            }
            
            for (var i = 0; i < res.length; i++) {
                if (res[i].product_name == answer.choice) {
                    correct = true;
                    var product = answer.choice;
                    var id = i;

                    inquirer.prompt([{
                            type: "input",
                            name: "quantity",
                            message: "how many would you like to order?",
                            validate: function (value) {
                                if (isNaN(value) == false) {
                                    return true;
                                } else {
                                    return false;
                                }
                            }
                        }])
                        .then(function (answer) {
                            var newQuantity = res[id].stock_quantity - answer.quantity;
                            // console.log (newQuantity);
                            // console.log (typeof (newQuantity));
                            // console.log (typeof (res[id].stock_quantity));
                            // console.log (res[id].stock_quantity);

                            if ((newQuantity) > 0) {
                                connection.query("UPDATE items SET ? WHERE ?", 
                                [
                                    {
                                        stock_quantity:newQuantity
                                    },
                                    {
                                        product_name:product
                                    }
                                ], 
                                function (err, res) {
                                    console.log(res.affectedRows + " products updated!\n");

                                    console.log("product bought \n");
                                    makeTable();
                                });
                            } else {
                                console.log("not a valid selection");
                                promptCustomer(res);
                            }
                        })
                } 
            }

        })
}