const express = require('express');
const morgan = require('morgan');
const {engine} = require('express-handlebars');
const path = require('path');
const categoryRoutes = require("./routes/Categoryroute");
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

app.use("/api/categories", categoryRoutes);
app.get("/", (req, res) => {
  res.json({ message: "Server Category đang chạy!" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
