/* db name: QnA */

CREATE TABLE IF NOT EXISTS products (
  id serial PRIMARY KEY,
  name VARCHAR(50),
  slogan VARCHAR(255),
  description VARCHAR(255),
  category VARCHAR(255),
  default_price int NOT NULL
);

CREATE TABLE IF NOT EXISTS Questions (
  id serial PRIMARY KEY,
  product_id int NOT NULL,
  question_body VARCHAR(500),
  date_written BIGINT NOT NULL,
  asker_name VARCHAR(50),
  asker_email VARCHAR(50),
  reported BOOLEAN NOT NULL,
  helpful int NOT NULL,
  CONSTRAINT question_id FOREIGN KEY (product_id)
    REFERENCES Products(id)
);


CREATE TABLE IF NOT EXISTS Answers (
  id serial PRIMARY KEY,
  question_id int NOT NULL,
  answer_body VARCHAR(500),
  date_written BIGINT NOT NULL,
  answerer_name VARCHAR(50),
  answerer_email VARCHAR(50),
  reported BOOLEAN NOT NULL,
  helpful int NOT NULL,
  CONSTRAINT answer_id FOREIGN KEY (question_id)
    REFERENCES Questions(id)
);

CREATE TABLE photos (
  id serial PRIMARY KEY,
  answer_id int NOT NULL,
  url VARCHAR(1000),
  CONSTRAINT photo_id FOREIGN KEY (answer_id)
    REFERENCES Answers(id)
);

/*
port: 5432


*/