const express = require('express');
const cors = require('cors');
const connectDB = require("./src/config/db");

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req,res) => {
    res.json({ status: "Server is running"});
});

const PORT = process.env.PORT || 5000;

connectDB();


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});