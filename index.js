const { generateHTML } = require("./generateHTML");
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
/* convertFactory = require('electron-html-to');
const conversion = convertFactory({
converterPath: convertFactory.converters.PDF
});*/
const axios = require("axios");
const writeFileAsync = util.promisify(fs.writeFile);

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
]).then(function ({ name, color }) {
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

    const data = {
      appName: appName,
      appLocation: appLocation,
      color: color,
    }

    const html = generateHTML(data);
    // example of use data.appName

    const fullApp = [appName, + "\n" + appLocation, + "\n" + appBio,
      appBlog, + "\n" + appProfile, + "\n" + appRepos,
      appFollowers, + "\n" + appFollowing];
    console.log(fullApp);
    console.log(color);
    console.log(html);

    return writeFileAsync("index.html", html);
    /*
    fs.writeFile("application.txt", fullApp, function (err) {
      if (err) {
        throw err;
      }
    });
    */
  });
})/*.then(function ({color}) {
  console.log("Logging data ", data);
  const html = generate.generateHTML(data);

  return writeFileAsync("index.html", html);
})
  .catch(function (err) {
    console.log(err);
  });
*/





/*


const questions = [

];

function writeToFile(fileName, data) {

}

function init() {

    init();
};*/
