/*
Name: Bishnu Khanal
Student ID: 300924228
Application: COMP308-W2019-MidTerm-Test-300924228
 */

let mongoose = require("mongoose");

// create a model class
let gamesSchema = mongoose.Schema(
  {
    Title: String,
    Description: String,
    Price: Number,
    Author: String,
    Genre: String
  },
  {
    collection: "books"
  }
);

module.exports = mongoose.model("books", gamesSchema);
