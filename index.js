import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Post from "./Post.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 80;
const DB_URL =
  "mongodb+srv://zenbit:zenbit@cluster0.luqnens.mongodb.net/?retryWrites=true&w=majority";

const app = express();
// app.use(cors({origin:true,credentials: true}));
app.use(express.json());
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use(cors({
    origin: '*'
}));

app.get("/", async (req, res) => {
  try {
    res.status(200).json("сервер работает GET");
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const post = await Post.create({ email, password });
    res.status(200).json("сервер работает POST");
    // res.json(post);
    // console.log(req.body);
  } catch (error) {
    res.status(500).json(error);
  }
});

async function startApp() {
  try {
    await mongoose.connect(DB_URL);
    app.listen(PORT, () => {
      console.log("SERVER WORKS ON PORT " + PORT);
    });
  } catch (error) {
    console.log(error);
  }
}
startApp();
