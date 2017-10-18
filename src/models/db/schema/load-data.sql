create temporary table holder
  (id SERIAL,
  Title VARCHAR(255),
  Author VARCHAR(255),
  Genre VARCHAR(255),
  SubGenre VARCHAR(255),
  Height VARCHAR(255),
  Publisher VARCHAR(255));
\copy holder (Title,Author,Genre,SubGenre,Height,Publisher) FROM './src/models/db/schema/books.csv' DELIMITER ',' CSV HEADER

INSERT INTO authors
  ( name )
SELECT Author
FROM holder
GROUP BY Author;

INSERT INTO books
  (id,
  title,
  genre,
  subgenre,
  publisher)
SELECT
  id,
  title,
  genre,
  subgenre,
  publisher
FROM holder;

INSERT INTO authors_books
  (book_id , author_id )
SELECT holder.id, authors.id
FROM holder
JOIN authors ON holder.author = authors.name;

DROP TABLE holder;





-- INSERT INTO books
--   ( title,
--     genre,
--     subgenre,
--     publisher)
-- VALUES
--   ('Let Us A', 'Programming', 'A', 'Oakland Prints'),
--   ('Let Us B', 'Programming', 'B', 'Oakland Prints'),
--   ('Let Us C', 'Programming', 'C', 'Oakland Prints'),
--   ('Let Us D', 'Programming', 'D', 'Oakland Prints'),
--   ('Let Us E', 'Programming', 'E', 'Oakland Prints');
--
--
--
-- INSERT INTO authors
--   (name)
-- VALUES
--   ('Charles Darwin'),
--   ('Albert Einstien');
--
-- INSERT INTO authors_books
--   (book_id, author_id)
-- VALUES
--   (1, 1),
--   (1, 2),
--   (2, 1),
--   (2, 2),
--   (3, 1),
--   (4, 2),
--   (5, 2);
