const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
    {
        title : {
            type : String,
            required : true
        },
        price : {
            type : Number,
            required : true
        },
        description : {
            type : String,
            required : true
        },
        author : {
            type : String,
            required : true
        },
        image : {
            type : String,
            required : true
        }

    },
    {
        versionKey : false,
        timestamps : true
    }
)

const Books = new mongoose.model("books", bookSchema);

exports.Books = Books;