INSERT INTO books
  ( title,
    genre,
    subgenre,
    publisher)
VALUES
  ('Let Us A', 'Programming', 'A', 'Oakland Prints'),
  ('Let Us B', 'Programming', 'B', 'Oakland Prints'),
  ('Let Us C', 'Programming', 'C', 'Oakland Prints'),
  ('Let Us D', 'Programming', 'D', 'Oakland Prints'),
  ('Let Us E', 'Programming', 'E', 'Oakland Prints');



INSERT INTO authors
  (name)
VALUES
  ('Charles Darwin'),
  ('Albert Einstien');

INSERT INTO authors_books
  (book_id, author_id)
VALUES
  (1, 1),
  (1, 2),
  (2, 1),
  (2, 2),
  (3, 1),
  (4, 2),
  (5, 2);

  
