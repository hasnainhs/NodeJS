const express = require('express');
const hbs = require('hbs');
const fs  = require('fs');
var app=express();
hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');
//app.use(express.static(__dirname+'/public'));
app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now} + ${req.method} + ${req.url}`;
  fs.appendFile('server.log',log+'\n',(err) => {
    if (err) {
      console.log('Unable to Append');
    }
  });
  console.log(log);
  next();
});
app.use((req,res,next) => {
  res.render('maintenance.hbs');
})
app.get('/',(req, res) => {
  //res.send('<h1>Hello Express!</h1>');
  // res.send({
  //   name: 'Hasnain',
  //   likes:[
  //     'Programming',
  //     'Node'
  //   ]
  // })
  res.render('home.hbs',{
    pageTitle:'Home Page',
    welcomeHome:'Welcome to my Site',
    currYear: new Date().getFullYear()
  })
});
app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle: 'About Me',
    currYear: new Date().getFullYear()
  });
});
app.get('/bad',(req,res)=>{
  res.send({
    errorMessage: 'Unable to handle request'
  });
});
app.listen(3000,() => {
  console.log('Server is up on port 3000');
});
