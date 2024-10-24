const express = require("express");
const cors = require("cors");
const  pool = require("./Database");
const bodyParser = require('body-parser');
const PORT = 5000;

//Mildware
const app = express();
app.use(bodyParser.json());//req.body
app.use(cors());

//ROUTES//

//Create a todo

app.post("/todos", async (req, res) => {
    try {     
         const { task } = req.body;
         const newTodo = await pool.query(
             "INSERT INTO todos (task) VALUES($1) RETURNING *",
             [task]
         );
         res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//Get all todos

app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query(
            "SELECT * FROM todos",
        );
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//Get a todo

app.get("/todos/:id", async (req, res) => {
    try {
         const { id } = req.params;
         const todo = await pool.query(
             "SELECT * FROM todos WHERE id = $1", 
             [id]
         );
         res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//Update a todo

app.put("/todos/:id", async (req, res) => {
    try {
         const { id } = req.params;
         const { task, completed } = req.body;
         const updateTodo = await pool.query(
             "UPDATE todos SET task =$1, completed = $2 WHERE id = $3 RETURNING *", 
             [task, completed, id]
         );
         res.json("Todo was Updated!...");
    } catch (err) {
        console.error(err.message);
    }
});

//Delete a todo

app.delete("/todos/:id", async (req, res) => {
    try {
         const { id } = req.params;
         const deleteTodo = await pool.query(
             "DELETE FROM todos WHERE id = $1", 
             [id]
         );
         res.json("Todo was Deleted!...");
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(PORT, () => {
    console.log(`Listening to port:${PORT}`);
});