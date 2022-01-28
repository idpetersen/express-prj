const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');

const PORT = process.env.PORT || 3001;

const app = express();


app.use((req,res,next)=>{
    console.log(`${req.method} request to ${req.url}`)
    next()
})

//midleware to apply sometimes

const middleware = (req, res, next)=>{
    console.log("hello")
    const coinflip = Math.floor(Math.random()*2);
    if(coinflip){
        res.status(500).send('uh oh')
    } else {
        next()
    }
}
app.use(express.static("public"))

app.get('/', (req, res) =>
  res.send('homepage')
);

app.get('/about', middleware, (req,res)=>{
    res.send('about page')
})

app.post('/', (req, res)=>{
    res.send('posted!')
})

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:PORT`)
);