const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req,res) => {
    res.json({ status: "Server is running"});
});

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

connectDB();


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});