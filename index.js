const { generateHTML } = require("./generateHTML");
const inquirer = require("inquirer");
const util = require("util");
const fs = require("fs");
convertFactory = require("electron-html-to");
const conversion = convertFactory({
  converterPath: convertFactory.converters.PDF
});
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
    const appProfile = results.data.html_url;
    const appRepos = results.data.public_repos;
    const appFollowers = results.data.followers;
    const appFollowing = results.data.following;
    const appPicture = results.data.avatar_url;

    const data = {
      appName: appName,
      appLocation: appLocation,
      color: color,
      appBio: appBio,
      appBlog: appBlog,
      appProfile: appProfile,
      appRepos: appRepos,
      appFollowers: appFollowers,
      appFollowing: appFollowing,
      appPicture: appPicture
    }

    const html = generateHTML(data);

    return writeFileAsync("index.html", html);


  }).then(function () {
    fs.readFile('index.html', 'utf8', (err, profileHtml) => {
      if (err) throw err;

      conversion({ html: profileHtml }, function (err, result) {
        if (err) {
          return console.error(err);
        }
        console.log(result.numberOfPages);
        console.log(result.logs);
        result.stream.pipe(fs.createWriteStream('profile.pdf'));
        conversion.kill(); // necessary if you use the electron-server strategy, see bellow for details
      }
      );
    })
  })
});
