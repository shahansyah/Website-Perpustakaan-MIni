const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname))); 

const mongoURI = "mongodb+srv://shahansyah:Integrated24@pustakaid.qlebj9i.mongodb.net/PustakaMini?retryWrites=true&w=majority";

mongoose.connect(mongoURI).then(() => console.log('Atlas Connected'));

const User = mongoose.model("User", new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}));

app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (user) res.json({ status: "success" });
    else res.status(401).json({ message: "Email/Password salah!" });
});

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'login.html')));

module.exports = app;
