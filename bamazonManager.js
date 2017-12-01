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
  bossMode();
});

function bossMode() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "View Products for Sale":
          displayItems();
          break;
        case "View Low Inventory":
          displayLowInventory();
          break;
        case "Add to Inventory":
          addInventory();
          break;
        case "Add New Product":
          newProduct();
          break;
      }
    });
}

function displayItems() {
  //setup table headers and column widths
  var table = new Table({
    head: ["ID", "Name", "Department", "Price", "Qty"],
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
    //call function to do more boss stuff
    bossMode();
  });
}

function displayLowInventory() {
  //setup table headers and column widths
  var table = new Table({
    head: ["ID", "Name", "Department", "Price", "Qty"],
    colWidths: [5, 40, 20, 10, 10]
  });

  //get all the items with a stock_qty less than 5 from the product table
  connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(
    err,
    results
  ) {
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
    //call function to do more boss stuff
    bossMode();
  });
}

function addInventory() {
  //get all the items from the product table
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    //ask user which item they would like to add more to inventory
    inquirer
      .prompt([
        {
          name: "choice",
          type: "list",
          //build array to display choices
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].product_name);
            }
            return choiceArray;
          },
          message: "Add more of which item?"
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
        //add quantity entered to stock
        var newQuantity = chosenItem.stock_quantity + parseInt(answer.quantity);
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
            console.log("Success! Added " + answer.quantity + " to the stock!");
            //rinse, repeat
            bossMode();
          }
        );
      });
  });
}

function newProduct() {
  inquirer
    .prompt([
      { name: "product_name", type: "input", message: "Enter Item Name:" },
      { name: "department_name", type: "input", message: "Enter Department:" },
      {
        name: "price",
        type: "input",
        message: "Enter Price:",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "stock_quantity",
        type: "input",
        message: "Enter Quantity in Stock:",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      //add item to table
      connection.query(
        "INSERT INTO products SET ?",
        {
          product_name: answer.product_name,
          department_name: answer.department_name,
          price: answer.price,
          stock_quantity: answer.stock_quantity
        },
        function(error) {
          if (error) throw err;
          console.log("Success! Added " + answer.product_name + " to bamazon!");
          //rinse, repeat
          bossMode();
        }
      );
    });
}
