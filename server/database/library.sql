DROP TABLE IF EXISTS token;
DROP TABLE IF EXISTS book_author;
DROP TABLE IF EXISTS reserved_books;
DROP TABLE IF EXISTS user_account;
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS publisher;




CREATE TABLE publisher (
    publisher_id INT GENERATED ALWAYS AS IDENTITY,
    publisher_name VARCHAR NOT NULL,
    PRIMARY KEY (publisher_id)
);

CREATE TABLE books (
    books_id INT GENERATED ALWAYS AS IDENTITY,
    title VARCHAR NOT NULL,
    ISBN VARCHAR NOT NULL,
    num_pages INT, 
    publish_date DATE,
    publisher_id INT NOT NULL, 
    available_books INT NOT NULL,
    reserved BOOLEAN NOT NULL,
    PRIMARY KEY (books_id),
    FOREIGN KEY (publisher_id) REFERENCES publisher("publisher_id")
);


CREATE TABLE book_author (
    author_id INT GENERATED ALWAYS AS IDENTITY,
    book_id INT NOT NULL,
    author_name VARCHAR NOT NULL,
    PRIMARY KEY (author_id),
    FOREIGN KEY (book_id) REFERENCES books("books_id")
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
    FOREIGN KEY (book_id) REFERENCES books("books_id")
);



CREATE TABLE token (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL, 
    token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (user_id) REFERENCES user_account("user_id") 
);