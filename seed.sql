\copy Products(id, name, slogan, description, category, default_price)
FROM '/Users/donghyoungkim/Desktop/sdc_csv/product.csv'                 DELIMITER ','
CSV HEADER;

\copy Questions(id, product_id, question_body, date_written, asker_name, asker_email, reported, helpful)
FROM '/Users/donghyoungkim/Desktop/sdc_csv/questions.csv' DELIMITER ',' CSV HEADER;

\copy Answers (id, question_id, answer_body, date_written, answerer_name, answerer_email, reported, helpful)
FROM '/Users/donghyoungkim/Desktop/sdc_csv/answers.csv' DELIMITER ',' CSV HEADER;

\copy Photos (id, answer_id, url)
FROM '/Users/donghyoungkim/Desktop/sdc_csv/answers_photos.csv' DELIMITER ',' CSV HEADER;


-- Locally,
COPY Products(id, name, slogan, description, category, default_price)
FROM '/Users/donghyoungkim/Desktop/sdc_csv/product.csv'                 DELIMITER ','
CSV HEADER;

Copy Questions(id, product_id, question_body, date_written, asker_name, asker_email, reported, helpful)
FROM '/Users/donghyoungkim/Desktop/sdc_csv/questions.csv'                 DELIMITER ','
CSV HEADER;

Copy Answers (id, question_id, answer_body, date_written, answerer_name, answerer_email, reported, helpful)
FROM '/Users/donghyoungkim/Desktop/sdc_csv/answers.csv' DELIMITER ',' CSV HEADER;

Copy Photos (id, answer_id, url)
FROM '/Users/donghyoungkim/Desktop/sdc_csv/answers_photos.csv' DELIMITER ',' CSV HEADER;