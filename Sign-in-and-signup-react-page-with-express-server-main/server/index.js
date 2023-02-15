const express = require('express');
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors")
const PORT = 5000;
app.use(express.json())
app.use(cors())
const users = [];

const userModel = (userName, email, phoneNumber, password) => {
    return { userName, email, phoneNumber, password }
}

app.post("/signup", (req, res) => {
    let fetchedData = users[
        users.findIndex(
            retrivedData => retrivedData['email'] === req.body.email
        )
    ]
    if (fetchedData) {
        res.status(400).send({ message: "Email already exist!" })
    }
    else {
        users.push(userModel(
            req.body.userName,
            req.body.email,
            req.body.phoneNumber,
            req.body.password
        ));

        const token = jwt.sign(
            {
                userName: req.body.userName,
                email: req.body.email,
            },
            "secreact_key",
            { expiresIn: "7d" }
        );
        res.status(200).send({
            message: "User has been created sucessfully",
            token: token
        })

    }
})


app.post("/login", (req, res) => {
    let fetchedData = users[
        users.findIndex(
            retrivedData => retrivedData['email'] === req.body.email && retrivedData['password'] === req.body.password
        )
    ]

    if (fetchedData) {
        const token = jwt.sign(
            {
                userName: fetchedData.userName,
                email: fetchedData.email,
            },
            "secreact_key",
            { expiresIn: "7d" }
        );
        res.status(200).send({
            message: "Login sucessfully",
            token: token
        })
    }
    else {
        res.status(400).send({ message: "User not found" })
    }
})




app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running, and App is listening on port " + PORT)
    else
        console.log("Error occurred, server can't start", error);
}
);