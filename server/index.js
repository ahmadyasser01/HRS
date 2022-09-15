import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/connect.js"
import userRouter from "./routes/user.js"


dotenv.config();
const PORT = process.env.PORT;
const DBURI = process.env.MONGODB_URI ||'mongodb://127.0.0.1:27017';
const app = express();


const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
}

// MIDDLEWARES
app.use(cors(corsOptions));
app.use(express.json());
// app.use(cookieParser());


//ROUTES
app.use('/api/users',userRouter);



// SERVER
connectDB(DBURI);
app.listen(PORT,()=>{
    console.log("listening on port",PORT);
})
