DROP TABLE IF EXISTS token;
DROP TABLE IF EXISTS reserved_books;
DROP TABLE IF EXISTS user_account;
DROP TABLE IF EXISTS books;

CREATE TABLE books (
    book_id INT GENERATED ALWAYS AS IDENTITY,
    title VARCHAR NOT NULL,
    author VARCHAR NOT NULL,
    publisher VARCHAR NOT NULL,
    isbn VARCHAR NOT NULL,
    num_pages INT, 
    publish_date DATE, 
    available_books INT NOT NULL,
    reserved BOOLEAN NOT NULL DEFAULT false,
    PRIMARY KEY (book_id)
);

CREATE TABLE user_account (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR UNIQUE NOT NULL,
    password CHAR(60) NOT NULL,
    book_id INT NOT NULL,
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

INSERT INTO books (title, author, publisher, isbn, num_pages, publish_date, available_books)
VALUES ('A Brief History of Time', 'Stephen Hawking', 'Bantam', '978-0553176988', 272, '1989-03-01', 2);
