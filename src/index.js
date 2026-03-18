const express = require('express');
const morgan = require('morgan');
const {engine} = require('express-handlebars');
const path = require('path');

const initRoutes= require('./routes/categories');
const app = express();
const port = 3000;

//Static file
app.use(express.static(path.join(__dirname,'public')));

//Middleware
app.use(express.urlencoded({   //form
    extended: true
}));
app.use(express.json()); //http req


//HTTP logger
app.use(morgan('combined'));

// Template engine
app.engine('hbs', engine({
    extname: '.hbs'
}));


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

app.get('/', (req, res) => {
  res.render('home');
})

app.get('/search', (req, res) => {
  res.render('search');
})
app.post('/search', (req, res) => {
  console.log(req.body);
  res.send('');
})

app.use(initRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
