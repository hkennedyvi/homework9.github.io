const inquirer = require("inquirer");
const fs = require('fs');
   /* convertFactory = require('electron-html-to');
 const conversion = convertFactory({
  converterPath: convertFactory.converters.PDF
});*/
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
]).then(function ({ name }) {
    const queryUrl = `https://api.github.com/users/${name}`;

    axios.get(queryUrl).then(function (results) {
        const appName = results.data.name;
        const appLocation = results.data.location;
        const appBio = results.data.bio;
        const appBlog = results.data.blog;
        const appProfile = results.data.url;
        const appRepos = results.data.public_repos;
        const appFollowers = results.data.followers;
        const appFollowing = results.data.following;

        const fullApp = [appName, + "\n" + appLocation, + "\n" + appBio,
                        appBlog, + "\n" + appProfile, + "\n" + appRepos,
                        appFollowers, + "\n" + appFollowing];
        console.log(fullApp);

        

        fs.writeFile("application.txt", fullApp, function (err) {
            if (err) {
                throw err;
            }
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
};*/
