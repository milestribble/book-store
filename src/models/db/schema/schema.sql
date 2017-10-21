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
  image_url VARCHAR(255),
  ISBN VARCHAR(255),
  price VARCHAR(255),
  description TEXT
);

CREATE TABLE authors_books (
  author_id INT REFERENCES authors(id) ON DELETE CASCADE,
  book_id INT REFERENCES books(id) ON DELETE CASCADE
);

CREATE TABLE cart (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  book_id INT REFERENCES books(id) ON DELETE CASCADE
);
