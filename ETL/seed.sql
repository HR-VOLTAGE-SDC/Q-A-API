\c qna;

\copy Questions FROM '/Users/donghyoungkim/Desktop/sdc_csv/questions.csv' DELIMITER ',' CSV HEADER;

\copy Answers FROM '/Users/donghyoungkim/Desktop/sdc_csv/answers.csv' DELIMITER ',' CSV HEADER;

\copy Photos FROM '/Users/donghyoungkim/Desktop/sdc_csv/answers_photos.csv' DELIMITER ',' CSV HEADER;

