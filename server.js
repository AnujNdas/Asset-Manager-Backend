const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const assetsRoutes = require("./routes/assetRoutes");
const authRoutes = require('./routes/authRoutes')

// Initialize environment variables
dotenv.config();

// Connect to mongodb
connectDB();

const app = express();

// Middleware
const corsOptions = {
    origin: 'https://asset-manager-sigma.vercel.app', // Replace with your actual frontend URL
    methods: 'GET,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  };
app.use(cors(corsOptions));

app.use(bodyParser.json());
// app.use(express.json());  // Instead of bodyParser.json()


// Routes
app.use("/api/assets",assetsRoutes);
app.use("/api/auth",authRoutes);
// Default route
app.get("/",(req,res)=>{
    res.send("Asset management api is running...");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`Server is running on PORT : ${PORT}`));