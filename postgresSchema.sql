DROP DATABASE QnA;

CREATE DATABASE QnA;

USE QnA;

CREATE TABLE products (
  id serial,
  product_name VARCHAR(50),
  PRIMARY KEY (id)
);

CREATE TABLE questions (
  id serial,
  question_id int NOT NULL,
  question_body VARCHAR(255),
  question_date DATE,
  question_helpfulness int NOT NULL,
  asker_name VARCHAR(50),
  reported BOOLEAN DEFAULT FALSE,
  product_id int NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (product_id) REFERENCES products(id)
)

CREATE TABLE answers (
  id serial,
  body VARCHAR(255),
  date DATE,
  answerer_name VARCHAR(50),
  helpfulness int NOT NULL,
  photos text [],
  question_id int NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (question_id) REFERENCES quetions(id)
)

CREATE TABLE photos (
  id serial,
  photo_url VARCHAR(255),
  answer_id int NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (answers_id) REFERENCES answers(id)
)

/*

*/