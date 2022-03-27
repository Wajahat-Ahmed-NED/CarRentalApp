const todoModel = require("../models/todoSchema");


const addTodo = async (req, res) => {
    let userCreate = new todoModel({
        todoName: req.body.todoName,
        todoDescription: req.body.todoDescription,
        todoRating: req.body.todoRating,
        todoStatus: req.body.todoStatus,

    })

    userCreate.save((err, response) => {
        if (err) {
            // console.log(userCreate)
            // console.log(err, "Error agaya ha")
            res.send({ result: err.message, message: "Todo Not Added" }).status(404);
            return;
        } else {
            // console.log(userCreate)
            // console.log(response)
            res.json({ result: response, message: "Todo Added Successfully" }).status(200);
            return;
        }
    })
}


const getAllTodos = async (req, res) => {
    let result = await todoModel.find({})
    res.send({ result: result, message: "All data fetched successfully" }).status(200)
}
module.exports = { getAllTodos, addTodo }