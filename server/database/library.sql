DROP TABLE IF EXISTS token;
DROP TABLE IF EXISTS reserved_books;
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS user_account;

CREATE TABLE user_account (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR UNIQUE NOT NULL,
    password CHAR(60) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE books (
    book_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT,
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
    PRIMARY KEY (book_id),
    FOREIGN KEY (user_id) REFERENCES user_account(user_id)
);

CREATE TABLE reserved_books (
  reserve_id INT GENERATED ALWAYS AS IDENTITY,
  book_id INT NOT NULL,
  user_id INT NOT NULL,
  PRIMARY KEY (reserve_id),
  FOREIGN KEY (user_id) REFERENCES user_account(user_id),
  FOREIGN KEY (book_id) REFERENCES books(book_id)
);
CREATE TABLE token (
  token_id INT GENERATED ALWAYS AS IDENTITY,
  user_id INT NOT NULL,
  token CHAR(36) UNIQUE NOT NULL,
  PRIMARY KEY (token_id),
  FOREIGN KEY (user_id) REFERENCES user_account(user_id)
);
INSERT INTO books (
    title,
    author,
    category,
    publisher,
    isbn,
    num_pages,
    publish_date,
    available_books, 
    reserved,
    book_Image
  )
VALUES (
    'A Brief History of Time',
    'Stephen Hawking',
    'Science',
    'Bantam',
    '978-0553176988',
    272,
    '1989-03-01',
    2,
    true,
    'https://productimages.worldofbooks.com/0857501003.jpg'
  ),
  (
    'A Brief History of Time',
    'Stephen Hawking',
    'Science',
    'Bantam',
    '978-0553176988',
    272,
    '1989-03-01',
    2,
    false,
    'https://productimages.worldofbooks.com/0857501003.jpg'
  ),
  (
    'The Great Gatsby',
    'F. Scott Fitzgerald',
    'Fiction',
    'Scribner',
    '978-0743273565',
    180,
    '1925-04-10',
    3,
    true,
    'https://productimages.worldofbooks.com/0857501003.jpg'
  ),
  (
    'To Kill a Mockingbird',
    'Harper Lee',
    'Fiction',
    'J. B. Lippincott & Co.',
    '978-0061120084',
    336,
    '1960-07-11',
    4,
    false,
    'https://productimages.worldofbooks.com/0857501003.jpg'
  ),
  (
    'Cosmos',
    'Carl Sagan',
    'Science',
    'Random House',
    '978-0345539434',
    384,
    '1980-10-12',
    2,
    true,
    'https://productimages.worldofbooks.com/0857501003.jpg'
  ),
  (
    'Harry Potter and the Sorcerer''s Stone',
    'J.K. Rowling',
    'Child',
    'Scholastic',
    '978-0439708180',
    309,
    '1997-06-26',
    5,
    false,
    'https://productimages.worldofbooks.com/0857501003.jpg'
  ),
  (
    '1984',
    'George Orwell',
    'Fiction',
    'Secker & Warburg',
    '978-0451524935',
    328,
    '1949-06-08',
    2,
    false,
    'https://productimages.worldofbooks.com/0857501003.jpg'
  ),
  (
    'The Catcher in the Rye',
    'J.D. Salinger',
    'Fiction',
    'Little, Brown and Company',
    '978-0316769488',
    224,
    '1951-07-16',
    3,
    false,
    'https://productimages.worldofbooks.com/0857501003.jpg'
  ),
  (
    'The Hobbit',
    'J.R.R. Tolkien',
    'Fantasy',
    'George Allen & Unwin',
    '978-0618002214',
    310,
    '1937-09-21',
    4,
    false,
    'https://productimages.worldofbooks.com/0857501003.jpg'
  ),
  (
    'The Alchemist',
    'Paulo Coelho',
    'Fiction',
    'HarperOne',
    '978-0061122415',
    197,
    '1988-01-01',
    2,
    false,
    'https://productimages.worldofbooks.com/0857501003.jpg'
  ),
  (
    'The Da Vinci Code',
    'Dan Brown',
    'Mystery',
    'Doubleday',
    '978-0385504201',
    454,
    '2003-03-18',
    5,
    false,
    'https://productimages.worldofbooks.com/0857501003.jpg'
  ),
  (
    'The Hunger Games',
    'Suzanne Collins',
    'Young Adult',
    'Scholastic Press',
    '978-0439023481',
    374,
    '2008-09-14',
    3,
    false,
    'https://productimages.worldofbooks.com/0857501003.jpg'
  ),
  (
    'Pride and Prejudice',
    'Jane Austen',
    'Classic',
    'T. Egerton, Whitehall',
    '978-0141439518',
    279,
    '1813-01-28',
    4,
    false,
    'https://productimages.worldofbooks.com/0857501003.jpg'
  ),
  (
    'The Road',
    'Cormac McCarthy',
    'Dystopian',
    'Alfred A. Knopf',
    '978-0307265432',
    241,
    '2006-09-26',
    2,
    false,
    'https://productimages.worldofbooks.com/0857501003.jpg'
  ),
  (
    'The Shining',
    'Stephen King',
    'Horror',
    'Doubleday',
    '978-0385121675',
    447,
    '1977-01-28',
    3,
    false,
    'https://productimages.worldofbooks.com/0857501003.jpg'
  ),
  (
    'The Lord of the Rings',
    'J.R.R. Tolkien',
    'Fantasy',
    'George Allen & Unwin',
    '978-0544003415',
    1178,
    '1954-07-29',
    4,
    false,
    'https://productimages.worldofbooks.com/0857501003.jpg'
  ),
  (
    'Harry Potter and the Deathly Hallows',
    'J.K. Rowling',
    'Fantasy',
    'Bloomsbury',
    '978-0545139700',
    607,
    '2007-07-21',
    5,
    false,
    'https://productimages.worldofbooks.com/0857501003.jpg'
  );
