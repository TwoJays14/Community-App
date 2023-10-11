DROP TABLE IF EXISTS token;
DROP TABLE IF EXISTS reserved_books;
DROP TABLE IF EXISTS user_account;
DROP TABLE IF EXISTS books;
CREATE TABLE books (
    book_id INT GENERATED ALWAYS AS IDENTITY,
    title VARCHAR NOT NULL,
    author VARCHAR,
    category VARCHAR,
    publisher VARCHAR,
    isbn VARCHAR,
    num_pages INT, 
    publish_date DATE, 
    book_image VARCHAR, 
    available_books INT NOT NULL,
    reserved BOOLEAN NOT NULL DEFAULT false,
    PRIMARY KEY (book_id)
);
CREATE TABLE user_account (
  user_id INT GENERATED ALWAYS AS IDENTITY,
  username VARCHAR UNIQUE NOT NULL,
  password CHAR(60) NOT NULL,
  PRIMARY KEY (user_id)
);
CREATE TABLE reserved_books (
  reserve_id INT GENERATED ALWAYS AS IDENTITY,
  book_id INT NOT NULL,
  user_id INT NOT NULL,
  PRIMARY KEY (reserve_id),
  FOREIGN KEY (user_id) REFERENCES user_account("user_id"),
  FOREIGN KEY (book_id) REFERENCES books("book_id")
);
CREATE TABLE token (
  token_id INT GENERATED ALWAYS AS IDENTITY,
  user_id INT NOT NULL,
  token CHAR(36) UNIQUE NOT NULL,
  PRIMARY KEY (token_id),
  FOREIGN KEY (user_id) REFERENCES user_account("user_id")
);
INSERT INTO books (
    title,
    author,
    category,
    publisher,
    isbn,
    num_pages,
    publish_date,
    book_Image,
    available_books
  )
VALUES (
    'A Brief History of Time',
    'Stephen Hawking',
    'Science',
    'Bantam',
    '978-0553176988',
    272,
    '1989-03-01',
    'https://productimages.worldofbooks.com/0857501003.jpg',
    2
  ),
  (
    'A Brief History of Time',
    'Stephen Hawking',
    'Science',
    'Bantam',
    '978-0553176988',
    272,
    '1989-03-01',
    'https://productimages.worldofbooks.com/0857501003.jpg',
    2
  ),
  (
    'The Great Gatsby',
    'F. Scott Fitzgerald',
    'Fiction',
    'Scribner',
    '978-0743273565',
    180,
    '1925-04-10',
    'https://productimages.worldofbooks.com/0857501003.jpg',
    3
  ),
  (
    'To Kill a Mockingbird',
    'Harper Lee',
    'Fiction',
    'J. B. Lippincott & Co.',
    '978-0061120084',
    336,
    '1960-07-11',
    'https://productimages.worldofbooks.com/0857501003.jpg',
    4
  ),
  (
    'Cosmos',
    'Carl Sagan',
    'Science',
    'Random House',
    '978-0345539434',
    384,
    '1980-10-12',
    'https://productimages.worldofbooks.com/0857501003.jpg',
    2
  ),
  (
    'Harry Potter and the Sorcerer''s Stone',
    'J.K. Rowling',
    'Child',
    'Scholastic',
    '978-0439708180',
    309,
    '1997-06-26',
    'https://productimages.worldofbooks.com/0857501003.jpg',
    5
  ),
  (
    '1984',
    'George Orwell',
    'Fiction',
    'Secker & Warburg',
    '978-0451524935',
    328,
    '1949-06-08',
    'https://productimages.worldofbooks.com/0857501003.jpg',
    2
  ),
  (
    'The Catcher in the Rye',
    'J.D. Salinger',
    'Fiction',
    'Little, Brown and Company',
    '978-0316769488',
    224,
    '1951-07-16',
    'https://productimages.worldofbooks.com/0857501003.jpg',
    3
  ),
  (
    'The Hobbit',
    'J.R.R. Tolkien',
    'Fantasy',
    'George Allen & Unwin',
    '978-0618002214',
    310,
    '1937-09-21',
    'https://productimages.worldofbooks.com/0857501003.jpg',
    4
  ),
  (
    'The Alchemist',
    'Paulo Coelho',
    'Fiction',
    'HarperOne',
    '978-0061122415',
    197,
    '1988-01-01',
    'https://productimages.worldofbooks.com/0857501003.jpg',
    2
  ),
  (
    'The Da Vinci Code',
    'Dan Brown',
    'Mystery',
    'Doubleday',
    '978-0385504201',
    454,
    '2003-03-18',
    'https://productimages.worldofbooks.com/0857501003.jpg',
    5
  ),
  (
    'The Hunger Games',
    'Suzanne Collins',
    'Young Adult',
    'Scholastic Press',
    '978-0439023481',
    374,
    '2008-09-14',
    'https://productimages.worldofbooks.com/0857501003.jpg',
    3
  ),
  (
    'Pride and Prejudice',
    'Jane Austen',
    'Classic',
    'T. Egerton, Whitehall',
    '978-0141439518',
    279,
    '1813-01-28',
    'https://productimages.worldofbooks.com/0857501003.jpg',
    4
  ),
  (
    'The Road',
    'Cormac McCarthy',
    'Dystopian',
    'Alfred A. Knopf',
    '978-0307265432',
    241,
    '2006-09-26',
    'https://productimages.worldofbooks.com/0857501003.jpg',
    2
  ),
  (
    'The Shining',
    'Stephen King',
    'Horror',
    'Doubleday',
    '978-0385121675',
    447,
    '1977-01-28',
    'https://productimages.worldofbooks.com/0857501003.jpg',
    3
  ),
  (
    'The Lord of the Rings',
    'J.R.R. Tolkien',
    'Fantasy',
    'George Allen & Unwin',
    '978-0544003415',
    1178,
    '1954-07-29',
    'https://productimages.worldofbooks.com/0857501003.jpg',
    4
  ),
  (
    'Harry Potter and the Deathly Hallows',
    'J.K. Rowling',
    'Fantasy',
    'Bloomsbury',
    '978-0545139700',
    607,
    '2007-07-21',
    'https://productimages.worldofbooks.com/0857501003.jpg',
    5
  );
