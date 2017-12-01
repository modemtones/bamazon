var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  //call function to display items
  displayItems();
});

function displayItems() {
  //setup table headers and column widths
  var table = new Table({
    head: ["ID", "Name", "Department", "Price", "Qty in Stock"],
    colWidths: [5, 40, 20, 10, 10]
  });

  //get all the items from the product table
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    //add the results to the table array
    for (var i = 0; i < results.length; i++) {
      table.push([
        results[i].item_id,
        results[i].product_name,
        results[i].department_name,
        results[i].price,
        results[i].stock_quantity
      ]);
    }
    //print the table to the console
    console.log(table.toString());
    //call function to buy item
    buyItem();
  });
}

function buyItem() {
  //get all the items from the product table
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    //ask user which item they would like to buy
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          //build array to display choices
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].product_name);
            }
            return choiceArray;
          },
          message: "Which item would you like to buy?"
        },
        {
          name: "quantity",
          type: "input",
          message: "How many?"
        }
      ])
      .then(function(answer) {
        //store the chosen item to a variable
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].product_name === answer.choice) {
            chosenItem = results[i];
          }
        }

        //verify enough items are in stock
        if (chosenItem.stock_quantity > parseInt(answer.quantity)) {
          //enough items are in stock, update products with new stock amount
          var newQuantity = chosenItem.stock_quantity - answer.quantity;
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: newQuantity
              },
              {
                item_id: chosenItem.item_id
              }
            ],
            function(error) {
              if (error) throw err;
              //display total cost of order
              var totalCost = chosenItem.price * answer.quantity;
              console.log("Order Sucessful! Total Cost: " + totalCost);
              //rinse, repeat
              displayItems();
            }
          );
        } else {
          //qty requested is greater than stock amount
          console.log("Insufficient Quantity!");
          //start again
          displayItems();
        }
      });
  });
}
