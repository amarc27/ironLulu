<img src="http://ironlulu.herokuapp.com/images/logo.png" height="80">

# IronLulu

## Presentation

<p>IronLulu is a conciergerie services. The main goal is to find someone to help you accomplish your daily tasks:</p> 
<ul>
  <li>Academic support</li>
  <li>Computer tutoring</li>
  <li>Household and ironing</li>
  <li>House moving</li>
  <li>Baby sitting</li>
  <li>Gardening</li>
</ul>
So, basically to use the service, you just need to sign up then create a campaign.
People interested can apply and you can chose the best applicant to help you.

<h2>Technology</h2>
<p>In order to launch our project, we use:</p>
<ul>
  <li>Express</li>
  <li>Mongoose</li>
  <li>Node JS</li>
  <li>Google Maps API</li>
  <li>Bootstrap</li>
</ul>

So you can: 
<ul>
<li>Sign up</li>
<li>Login</li>
<li>Create a campaign</li>
<li>Apply to a campaign</li>
</ul>


## Launch the skyrocket

You will find bellow all the instructions to launch locally the project.

First, fork this repo and clone it.

Then, create a `.env` file, for example like this one:
```
MONGODB_URI=mongodb://localhost/ironlulu
```

Before continuing, make sure you have Mongo running locally. For example, on Windows, you can run the command:
```sh
$ mongod
```


Then, run the following commands
```sh
$ npm install  # Install all packages
$ npm start    # Start the project
$ npm run dev  # Or start the project with nodemon
```
