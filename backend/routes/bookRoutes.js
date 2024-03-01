import express from "express";
import mongoose from "mongoose";
import { Books } from "../models/bookModel.js";
const app = express();

const router = express.Router();

// add a book
router.post("/",async (req,res)=>{
    try{
        const book = await Books.create({
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        });
        return res.status(201).send(book);
    }
    catch(error){console.log(error)}
});

// gets all the books
router.get("/",async (req,res)=>{
    const books = await Books.find({});
    return res.status(200).json({
        count: books.length,
        data:books,
    });
});

// retrieve a book from it's id
router.get("/:id",async (req,res)=>{
    const { id } = req.params;
    // console.log(req.params);
    const book = await Books.findById(id);
    return res.status(200).json(book);
});

// update a book using it's id
router.put("/:id", async (req,res)=>{
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return response.status(400).send({message:"Send all required fields"});
        }
        const { id } = req.params;
        const result = await Books.findByIdAndUpdate(id, req.body);
        if(!result){
            return res.status(404).send({message:"Not found"});
        }
        return res.status(200).send({message:"Updated succesfully"});
    }catch(error){
        console.log(error);
    }
});

// delete a book
router.delete("/:id",async (req,res)=>{
    try{
        const { id } = req.params;
        const result = await Books.findByIdAndDelete(id);
        if(!result){
            return res.status(404).send({message:"Book not found"});
        }
        return res.status(200).send({message:"Book deleted"});
    }catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
});

export default router;