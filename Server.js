const express = require('express')
const hbs = require('hbs')
const fs = require('fs')
var app = express();



// C:\Users\Amir\Desktop\Programs\Node.js_projects\NODE-WEB-SERVER
app.use(express.static(__dirname + '/Public'))
app.set('view engin', 'hbs')


//Polices
app.use((req , res , next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log)
    fs.writeFileSync('server.log' , log + '\n');
    next();
})
app.use((req , res , next)=>{
    res.render('offline.hbs')
})





hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('getcurrentYear',()=>{
    return new Date().getFullYear()
})
hbs.registerHelper('Uppercase', (text)=>{
    return text.toUpperCase();
})
// GET POST PUT PATCH DELETE -------->HTTP Request
// http://www.google.com
// localhost:3000

app.get('/',(req , res)=>{
    // res.send('<h1>Hello Express</h1>')
    res.render('Home.hbs',{
        pagetitle : 'صفحه اصلی سایت',
        welcomeMessage: 'Welcome to my node site',
        
    })
})


app.get('/ali', (req , res)=>{
    res.render('about.hbs',{
        pagetitle : 'صفحه درباره ما',
        
    })
})

app.get('/bad', (req , res)=>{
    res.send({
        error : 'Unable to fetch data'
    })
})


app.listen(3000 , ()=>{
    console.log('Server runs on port 3000')
})