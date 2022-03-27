const mongoose = require("mongoose")

const signupSchema = new mongoose.Schema({
    email: {
        type: String,

    },
    password: {
        type: String,

    },
    name: {
        type: String
    }
})

const authModel = mongoose.model("signups", signupSchema)

module.exports = authModel