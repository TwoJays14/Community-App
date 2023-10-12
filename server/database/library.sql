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
    book_description VARCHAR,
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
  user_id INT,
  PRIMARY KEY (reserve_id),
  FOREIGN KEY (user_id) REFERENCES user_account(user_id)
);
CREATE TABLE token (
  token_id INT GENERATED ALWAYS AS IDENTITY,
  user_id INT NOT NULL,
  token CHAR(36) UNIQUE NOT NULL,
  PRIMARY KEY (token_id),
  FOREIGN KEY (user_id) REFERENCES user_account(user_id)
);
