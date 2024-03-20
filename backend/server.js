import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
//import routes from "./routes/routes.js"; 
import register from "./routes/register.js"; 
import login from "./routes/login.js"; 
//import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

//const uri = "mongodb+srv://foodOrderingApp:foodOrderingApp@foodorderingapp.bnnxjwp.mongodb.net/?retryWrites=true&w=majority&appName=FoodOrderingApp"

const uri = process.env.DB_URI;

app.use(express.json());
//app.use(cors);
app.use(bodyParser.json());

//app.use("/api", routes)
app.use("/api/register", register)
app.use("/api/login", login)

app.get('/', (req, res) => {
    res.send('Welcome to my server!');
});

// async function connect() {
//     try {
//         await mongoose.connect(uri);
//         console.log("connected to mongoDB");
//     } catch (error) {
//         console.log("error");
//     }
// }

// connect();

mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connection established..."))
  .catch((error) => console.error("MongoDB connection failed:", error.message));

app.listen(8000, () => {
    console.log("server running on 8000")
})