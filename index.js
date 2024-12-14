const express = require('express');
const fs = require('fs')
const app = express();
app.use(express.json());

const todos = [];
let counterID = 0;
app.get("/", function (req, res) {
    res.json({
        "name": "Amit",
        "age": "24"
    })
})

function writeTodosToFile() {
    fs.writeFile('todos.txt', JSON.stringify(todos, null, 2), 'utf8', (err) => {
        if (err) {
            console.error("Error writing to file:", err);
        } else {
            console.log("Todos saved to file.");
        }
    });
}


app.post("/save-data", function (req, res) {
    const saveData = {
        "title": req.body.title,
        "id": counterID++
    }
    todos.push(saveData);
    console.log(todos);
    writeTodosToFile()
    // res.send(todos)
    res.json({ message: "Data saved successfully!", todos });
})




app.delete("/delete", function (req, res) {
    const index = req.query.id
    todos.splice(index, 1)
    writeTodosToFile()
    if (todos.indexOf(index) === -1)
        res.json({ message: "Data Deleted successfully!", todos });
    else
        res.json({ message: "Sorry this is not found!" });
})

// console.log(todos);
// app.get("/todos", function (req, res) {
//     res.send(todos)
// })
app.listen(3000, () => (
    console.log("Running on 3000 port")
))