const express = require("express");
const cors = require("cors")
const bd = require("body-parser")
const mongoose = require("mongoose")
const authModel = require("./models/app");
const bcrypt = require("bcryptjs");
const todoModel = require("./models/todoSchema");
const mainRoutes = require("./routes/mainRoutes")

const app = express();

app.use(cors())
app.use(bd.urlencoded({
    extended: false
}))
app.use(bd.json())

app.use(mainRoutes)
const port = 5000;

mongoose.connect('mongodb+srv://wajahat:wajahat@cluster0.8qfp6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', () => {
    console.log("db connected")
})

app.get('/', (req, res) => {
    res.send("Hello World To Wajahat Bhai")
})

app.post('/signup', async (req, res) => {

    var checkUser = await authModel.findOne({ email: req.body.email })
    console.log(checkUser)
    if (checkUser) {
        res.send({ result: checkUser, message: "User Already Exists" }).status(200)

    }
    else {
        // res.send("Yes you can register").status(200)
        let hashPassword = await bcrypt.hash(req.body.password, 12);
        // res.send({ EncryptedPassword: hashPassword })


        let userCreate = new authModel({
            email: req.body.email,
            password: hashPassword,
            name: req.body.name
        })

        userCreate.save((err, response) => {
            if (err) {
                // console.log(userCreate)
                // console.log(err, "Error agaya ha")
                res.send(err.message).status(404);
                return;
            } else {
                // console.log(userCreate)
                // console.log(response)
                res.json(response).status(200);
                return;
            }
        })
    }



})

app.post("/signin", async (req, res) => {
    let checkUser = await authModel.findOne({ email: req.body.email })

    if (checkUser) {
        let checkPass = await bcrypt.compare(req.body.password, checkUser.password)
        if (checkPass) {
            res.send({ message: "Login Successful" }).status(200)
        }
        else {
            res.send({ message: "Your password is incorrect" }).status(403)
        }
    }
    else {
        res.send({ message: "No user is registered with this email" }).status(403)
    }
})

app.post("/todoAdd", async (req, res) => {
    // console.log(req.body.todoDescription)
    // console.log(req.body.todoRating)
    // console.log(req.body.todoStatus)
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
})


app.get("/getAllTodos", async (req, res) => {
    let result = await todoModel.find({})
    res.send({ result: result, message: "All data fetched successfully" }).status(200)
})


app.listen(port, () => {
    console.log("server is listening!")
})