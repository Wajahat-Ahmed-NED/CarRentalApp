const authModel = require("../models/app");
const bcrypt = require("bcryptjs");


const signUp = async (req, res) => {

    var checkUser = await authModel.findOne({ email: req.body.email })
    console.log(checkUser)
    if (checkUser) {
        res.send({ result: checkUser, message: "User Already Exists" }).status(200)

    }
    else {
        let hashPassword = await bcrypt.hash(req.body.password, 12);

        let userCreate = new authModel({
            email: req.body.email,
            password: hashPassword,
            name: req.body.name
        })

        userCreate.save((err, response) => {
            if (err) {

                res.send(err.message).status(404);
                return;
            } else {

                res.json(response).status(200);
                return;
            }
        })
    }

}

const signIn = async (req, res) => {
    let checkUser = await authModel.findOne({ email: req.body.email })

    if (checkUser) {
        let checkPass = await bcrypt.compare(req.body.password, checkUser.password)
        if (checkPass) {
            res.send({ message: "Login Successful" }).status(200)
        }
        else {
            res.send({ message: "Your password is incorrect", value: checkPass, user: checkUser }).status(403)
        }
    }
    else {
        res.send({ message: "No user is registered with this email" }).status(403)
    }
}

module.exports = { signIn, signUp }