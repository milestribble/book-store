CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255),
  email VARCHAR(255),
  encrypted_password VARCHAR(255),
  role VARCHAR(255)
);

CREATE TABLE sessions (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id)
);

CREATE TABLE authors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255)
);

CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  genre VARCHAR(255),
  subgenre VARCHAR(255),
  publisher VARCHAR(255)
);

CREATE TABLE authors_books (
  author_id INT REFERENCES authors(id),
  book_id INT REFERENCES books(id)
);
