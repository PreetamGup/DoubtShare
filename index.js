import express  from "express";
import dotenv from 'dotenv'
import logger from 'morgan'
import userRouter from './router/UserRouter.js'
import doubtRouter from './router/DoubtRouter.js'
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from 'cors'

const app = express();
dotenv.config();
connectDB();
app.use(logger('dev'))
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(
   {
    origin:["http://localhost:3000"],
    credentials:true
   }

))



app.use("/user",userRouter)
app.use("/doubt", doubtRouter)

const port = process.env.PORT || 8080;

app.listen(port, ()=>{
    console.log("Server is listening")
})