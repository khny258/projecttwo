module.exports = function(sequelize, DataTypes) {
  var Book = sequelize.define("book", {
    title: DataTypes.TEXT,
    author: DataTypes.TEXT,
    book_isbn: DataTypes.TEXT,
    book_rating: DataTypes.TEXT,
    book_genre: DataTypes.TEXT,
    image_URL: DataTypes.TEXT
  });
  return Book;
};
