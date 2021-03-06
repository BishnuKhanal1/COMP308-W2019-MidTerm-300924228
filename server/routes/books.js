/*
Name: Bishnu Khanal
Student ID: 300924228
Application: COMP308-W2019-MidTerm-Test-300924228
 */

// modules required for routing
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

// define the book model
let book = require("../models/books");

// defining requireAuth function
function requireAuth(req, res, next) {
  // check if the user is logged in
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  next();
}

/* GET books List page. READ */
router.get("/", requireAuth, (req, res, next) => {
  // find all books in the books collection
  book.find((err, books) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("books/index", {
        title: "Books",
        books: books,
        displayName: req.user ? req.user.displayName : ""
      });
    }
  });
});

//  GET the Book Details page in order to add a new Book
router.get("/add", requireAuth, (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  res.render("books/details", {
    title: "Add New Books",
    displayName: req.user ? req.user.displayName : "",
    books: ""
  });
});

// POST process the Book Details page and create a new Book - CREATE
router.post("/add", requireAuth, (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  let newBook = book({
    Title: req.body.title,
    //"Description":req.body.description,
    Price: req.body.price,
    Author: req.body.author,
    Genre: req.body.genre
  });
  book.create(newBook, (err, book) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh the book list
      res.redirect("/books");
    }
  });
});

// GET the Book Details page in order to edit an existing Book
router.get("/:id", requireAuth, (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  let id = req.params.id;
  book.findById(id, (err, bookObject) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //show the detail view for edit or delete
      res.render("books/details", {
        title: "Edit Book's Information",
        displayName: req.user ? req.user.displayName : "",
        books: bookObject
      });
    }
  });
});

// POST - process the information passed from the details form and update the document
router.post("/:id", requireAuth, (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  let id = req.params.id;

  let updatedBooks = book({
    _id: id,

    Title: req.body.title,
    //"Description":req.body.description,
    Price: req.body.price,
    Author: req.body.author,
    Genre: req.body.genre
  });
  book.update({ _id: id }, updatedBooks, err => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // refresh the contact list
      res.redirect("/books");
    }
  });
});

// GET - process the delete by user id
router.get("/delete/:id", requireAuth, (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  let id = req.params.id;
  book.remove({ _id: id }, err => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh the books
      res.redirect("/books");
    }
  });
});

module.exports = router;
