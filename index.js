import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import usersroute from "./routes/usersRoutes.js";
import transporterroute from "./routes/transporterRoute.js";
import manufacturerroute from "./routes/manufacturerRoute.js";
import cors from "cors"
const app=express();
dotenv.config();


//middlewares
app.use(cors());

app.use(express.json());

app.use("/api/users", usersroute);
app.use("/api/manufacturer", manufacturerroute);
app.use("/api/transporter", transporterroute);


connectDB();
const port=8005;
app.listen(port,()=>{
    console.log(`app is listening to ${port}`)
})