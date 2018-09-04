
const express = require('express');
const hbs = require('hbs');
const port = process.env.POST || 3000;
var app = express();
/*registerPartials help in registering the reusable templates for HTML Pages*/
hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');

/*app.use includes the middleware
express.static takes the input as the root of the page element that loads up*/
app.use(express.static(__dirname+ '/public'));

/*We can create middleware using app.use.
The tricky part here is this will need three parameters request, response and next.
the further execution will wait unless next is not executed*/
app.use((req,res,next)=>{
  var now = new Date().toString();
  var log =`${now} : ${req.method} ${req.url}`;

  console.log(log);
  var fs = appendFile('server.log',log + '/n');
  next();

});


/*Challenge -  Add a maintainence page*/
app.use((req,res,next)=>{
  res.render('maintainence.hbs');
})



/*hbs.registerHelper helps to create helper that act like reusable varibales that can be used in partials.
For eg, here we are going to replace the currentYear with a registerHelper*/
hbs.registerHelper('getFullYear',()=>{
  return new Date().getFullYear();
})


/*Handlebars lets HTML pages to be loaded dynamically
Helps create reusable markup
*/


/*App.get sets the http handler for the http request.
We can return any json data or html page in response
There are two arguments to this method
1. The url. In this case it is the root of the App
2. A function that tell express what is going to be returned back in the response*/
app.get('/',(req,res) =>{
  /*This will send back the response in HTML to the HTTP request*/
  res.send('<h1>Hello Express!</h1>');
  /*Sending response in JSON format*/
  //res.send({
    //name:'Anderw',
    //likes:[
      //'Biking',
      //'Cities'
    //]
  //})
  /*this helps to inject dynamic data in templates*/
  res.render('home.hbs',{
    welcomeMessge : 'Welcome to the home page',
    pageTitle : 'Home Page',
  })
});

/*Specifying the about route or adding a new route to the uRL*/
app.get('/about',(req,res) =>{
  //res.send('About Page');
  /*this helps to inject dynamic data in templates*/
  rbs.render('about.hbs',{
    pageTitle : 'About Page',
  });
})

/*This is going to bind the application to port on the machine.
Unless this is described, the application will not the response back*/
app.listen(port,()=>{
  console.log(`Server is up on port ${port}`);
});

/*Note : When running this app on CMD, the app.listen does not end by itself unless explictly shut down using Ctrl + C for windows*/
