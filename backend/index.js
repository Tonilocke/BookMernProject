// 4Ak0gJrDu2fFMKFd
// to allow CORS(Cross Origin Resource Sharing)  is needed to be installed a node package called cors
import express from "express";
import mongoose from "mongoose";
import bookRoutes from "./routes/bookRoutes.js";
import cors from "cors";
const PORT = process.env.PORT || 5555;

// const express = require("express");
const app = express();
// const mongoose = require("mongoose");
const uri = "mongodb+srv://root:4Ak0gJrDu2fFMKFd@bookdb.w4hpfys.mongodb.net/?retryWrites=true&w=majority";

// middleware for parsing request body
app.use(express.json());

// We have 2 options

// Option 1:Allow all origin with default cors*
app.use(cors());//this is the option 1

// Option 2: Allow custom origins
// app.use(cors({
//     origin:'http://localhost:5555',
//     methods:["GET","POST","PUT","DELETE"],
//     allowedHeaders:["Content-Type"]
// }));


mongoose.connect(uri)
.then(()=>{
    console.log("Connected to database");
    app.listen(PORT,()=>{
        console.log(`Server listening of ${PORT}`);
    })
})
    .catch((error)=>{console.log(error)});


app.get("/",(req,res)=>{
    res.send("Hello");
});

app.use("/books",bookRoutes);

