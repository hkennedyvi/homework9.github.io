const inquirer = require("inquirer");
const fs = require("fs");
//const util = require("util");

inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your github user name?"
        },
        {
            type: "list",
            name: "color",
            choices: [
                "green",
                "blue",
                "pink",
                "red"
            ]
        }
    ]).then(function(data) {
        var filename = data.name.toLowerCase().split(' ').join('') + ".json";

  fs.writeFile(filename, JSON.stringify(data, null, '\t'), function(err) {

    if (err) {
      return console.log(err);
    }

    console.log("Success!");

  });
});






/*
const questions = [
  
];

function writeToFile(fileName, data) {
 
}

function init() {

init();
*/