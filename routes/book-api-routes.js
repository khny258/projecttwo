var db = require("../models");

module.exports = function(app) {
  // Get all books
  app.get("/api/books", function(req, res) {
    db.book.findAll({}).then(function(dbBooks) {
      res.json(dbBooks);
    });
  });

  // get by title
  app.get("/api/books/title/:title", function(req, res) {
    if (req.params.title) {
      // Display the JSON for ONLY that book.
      db.book.findAll({
        where: {
          title: req.params.title
        }
      }).then(function(dbBooks) {
        return res.json(dbBooks);
      });
    }
  });

  // get by id
  app.get("/api/books/id/:id", function(req, res) {
    if (req.params.id) {
      // Display the JSON for ONLY that book.
      db.book.findAll({
        where: {
          id: req.params.id
        }
      }).then(function(dbBooks) {
        return res.json(dbBooks);
      });
    }
  });

  // get by author
  app.get("/api/books/author/:author", function(req, res) {
    if (req.params.author) {
      // Display the JSON for ONLY that book.
      db.book.findAll({
        where: {
          author: req.params.author
        }
      }).then(function(dbBooks) {
        return res.json(dbBooks);
      });
    }
  });

  // get by genre
  app.get("/api/books/genre/:genre", function(req, res) {
    if (req.params.genre) {
      // Display the JSON for ONLY that book.
      db.book.findAll({
        where: {
          book_genre: req.params.genre
        }
      }).then(function(dbBooks) {
        return res.json(dbBooks);
      });
    }
  });

  app.get("/api/books/isbn/:isbn", function(req, res) {
    if (req.params.isbn) {
      // Display the JSON for ONLY that book.
      db.book.findAll({
        where: {
          book_isbn: req.params.isbn
        }
      }).then(function(dbBooks) {
        return res.json(dbBooks);
      });
    }
  });

  // Create a new book
  app.post("/api/books", function(req, res) {
    console.log(req.body);
    db.book.create({
      title: req.body.title,
      author: req.body.author,
      book_isbn: req.body.book_isbn,
      book_rating: req.body.book_rating,
      book_genre: req.body.book_genre,
      image_URL: req.body.image_URL
    }).then(function(dbBooks) {
      res.json(dbBooks);
    });
  });

  // Delete a book by id
  app.delete("/api/books/:id", function(req, res) {
    db.book.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbBooks) {
      res.json(dbBooks);
    });
  });
};
