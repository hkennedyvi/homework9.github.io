const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");

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
    ]).then(function({ name }) {
        const queryUrl = `https://api.github.com/users/${name}/repos?per_page=100`;

        axios.get(queryUrl).then(function(results) {
            const repoNames = results.data.map(function(repo) {
                return repo.name;
            });

            const repoNamesStr = repoNames.join("\n");

            fs.writeFile("repos.txt", repoNamesStr, function(err) {
                if (err) {
                    throw err;
                }

                console.log(`${repoNames}`);
            });
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