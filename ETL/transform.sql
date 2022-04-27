\c qna;

-- DROP TABLE IF EXISTS photos_data;
-- CREATE TABLE photos_data AS SELECT Photos.answer_id,
-- JSON_AGG(JSON_BUILD_OBJECT('url', url)) as photos FROM Photos GROUP BY Photos.answer_id;

-- DROP TABLE IF EXISTS answers_data;

-- CREATE TABLE answers_data AS SELECT Answers.*, photos_data.photos
-- FROM Answers LEFT JOIN photos_data ON
-- Answers.id = photos_data.answer_id;

-- ALTER TABLE answers_data ALTER photos SET DEFAULT '[]';


-- would query time be faster if unix epoch is converted already into to_timestamp when creating table?
-- transforming uniq epoch into to_timestamp
UPDATE questions SET question_date = question_date/1000;
ALTER TABLE questions ALTER question_date TYPE TIMESTAMP WITHOUT TIME ZONE USING to_timestamp(question_date) AT TIME ZONE 'UTC';

UPDATE answers SET date = date/1000;
ALTER TABLE answers ALTER date TYPE TIMESTAMP WITHOUT TIME ZONE USING to_timestamp(date) AT TIME ZONE 'UTC';

