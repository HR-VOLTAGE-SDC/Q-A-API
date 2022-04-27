DROP DATABASE IF EXISTS qna;

/* db name: qna */
CREATE DATABASE qna;

\c qna;

/*
you can go to csv file, and change the line 1 of the file to match with
column name of each table
you need to create table first in CLI, and copy

RUNNING SCRIPT!! psql -U postgress -f name.sql

cd into the file

*/
DROP TABLE IF EXISTS Questions CASCADE;

CREATE TABLE IF NOT EXISTS Questions (
  id serial PRIMARY KEY UNIQUE,
  product_id int NOT NULL,
  question_body VARCHAR(500),
  question_date BIGINT NOT NULL ,
  asker_name VARCHAR(50),
  asker_email VARCHAR(50),
  reported BOOLEAN NOT NULL DEFAULT false,
  question_helpfulness int NOT NULL DEFAULT 0
);

DROP TABLE IF EXISTS Answers CASCADE;

CREATE TABLE IF NOT EXISTS Answers (
  id serial PRIMARY KEY UNIQUE,
  question_id int NOT NULL,
  body VARCHAR(500),
  date BIGINT NOT NULL,
  answerer_name VARCHAR(50),
  answerer_email VARCHAR(50),
  reported BOOLEAN NOT NULL DEFAULT false,
  helpfulness int NOT NULL DEFAULT 0,
  CONSTRAINT answer_id FOREIGN KEY (question_id)
    REFERENCES Questions(id)
);

DROP TABLE IF EXISTS Photos CASCADE;

CREATE TABLE Photos (
  id serial PRIMARY KEY UNIQUE,
  answer_id int NOT NULL,
  url VARCHAR(1000),
  CONSTRAINT photo_id FOREIGN KEY (answer_id)
    REFERENCES Answers(id)
);


/*
port: 5432
*/