const mongoose = require("mongoose")
const todoSchema = mongoose.Schema({
    todoName: {
        type: String
    },
    todoDescription: {
        type: String
    },
    todoRating: {
        type: Number
    },
    todoStatus: {
        type: String
    },
})

const todoModel = mongoose.model("todos", todoSchema)
module.exports = todoModel