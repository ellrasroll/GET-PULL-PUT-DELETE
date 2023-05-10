require("dotenv").config();
// this line allows use to use the .env file
require("./db/connection");
// this imports and runs the database connection function we wrote

const Book = require("./models/bookmodel");

const express = require("express")
// this imports the express NPM library for use to use
const app = express()
// this gives us the option to use app. instead of express. and is the expected convention when using express js

app.use(express.json())
// this runs the middleware function express.json which allows use to us to use JSON on body part of the HTTP request

// now to the server code:
app.post("/books/addbook", async (req,res) => {
    console.log("Req Body:",req.body)

    // Code for adding book to database goes here
    const result = await Book.create({
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre
    })
    console.log(result);


    const successResponse = {
        message: "Book succesfully added"
    }

    res.status(201).send(successResponse);
});

const port = process.env.PORT

app.get("/books/listbooks", async(req,res) => {
    const listOfBooks = await Book.find({});

    const successResponse = {
        message: "List of Books Found is as follows:",
        books: listOfBooks
    };

    res.status(200).send(successResponse);
});

app.put("/books/updatebook", async (req,res) => {
    const updateFields = {};
    if (req.body.author) updateFields.author = req.body.author;
    if (req.body.genre) updateFields.genre = req.body.genre;

    const updateBook = await Book.findOneAndUpdate({
        title: req.body.title},
        {$set: updateFields});
    const updatedBook = await Book.findOne({
        title: req.body.title})

    const successResponse = {
        message: "Book updated",
        books: updatedBook
    };

    res.status(200).send(successResponse);

});

app.delete("/books/deletebook", async (req,res) => {
    const deleteBook = await Book.deleteOne({
        title:  req.body.title
    })

    const successResponse = {
        message: "Book deleted",
        books: deleteBook
    };

    res.status(200).send(successResponse);

});

app.listen(port, () => console.log(`Server is listening on port ${port}`))