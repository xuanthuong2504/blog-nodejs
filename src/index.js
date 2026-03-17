const express = require('express');
const morgan = require('morgan');
const {engine} = require('express-handlebars');
const path = require('path');
const { sql, poolConnect, pool } = require('./config/db');
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



//GET
app.get('/categories', async (req, res) => {
    try {
        await poolConnect;
        const request = pool.request();
        const result = await request.query('SELECT * FROM Categories');
        res.send(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/categories/:id', async (req, res) => {
  const{id}=req.params;
    try {
        await poolConnect;
        const request = pool.request();
         request.input('id', sql.Int, id);
        const result = await request.query('SELECT * FROM Categories Where Id=@id');
        res.send(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

//CREATE
app.post('/add-category', async (req, res) => {
    const { name, description } = req.body;

    try {
        await poolConnect;
        const request = pool.request();
        request.input('name', sql.NVarChar, name);
        request.input('description', sql.NVarChar, description);

        const query = 'INSERT INTO Categories (name,description) VALUES (@name, @description)';
        await request.query(query);

        res.send('User added successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

//Update
app.put('/categories/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        await poolConnect;
        const request = pool.request();
        request.input('id', sql.Int, id);
        request.input('name', sql.NVarChar, name);

        const query = 'UPDATE Categories SET Name = @name WHERE Id = @id';
        await request.query(query);

        res.send('User updated');
    } catch (err) {
        res.status(500).send(err.message);
    }
});
//Delete
app.delete('/delete-categories/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await poolConnect;
        const request = pool.request();
        request.input('id', sql.Int, id);

        const query = 'DELETE FROM Categories WHERE Id = @id';
        await request.query(query);

        res.send('User deleted');
    } catch (err) {
        res.status(500).send(err.message);
    }
});




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
