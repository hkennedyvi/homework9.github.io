# Github Profile PDF Generator

This is a command line (CLI) application that allows a user to dynamically generate a PDF from a Github username. 

Using the command node index.js, the user is prompted to provide their username and favorite color from a list. 

From here, the application makes a request to the Github API with the axios module to retrieve the following key pieces of profile information to be included in the document:

* Profile image
* User name
* Links to the following:
  * User location via Google Maps
  * User GitHub profile
  * User blog
* User bio
* Number of public repositories
* Number of followers
* Number of GitHub stars
* Number of users following

A PDF document titled 'profile.pdf' is generated from an HTML file that contains the user's professional information and a personalized color scheme. 

The project consists of two JS files and a JSON file, and generates an HTML and PDF from these. 

![](Animated_GIF-downsized_large.gif)
