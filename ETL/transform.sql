\c qna;

DROP TABLE IF EXISTS photos_data;
CREATE TABLE photos_data AS SELECT Photos.answer_id,
JSON_AGG(JSON_BUILD_OBJECT('url', url)) as photos FROM Photos GROUP BY Photos.answer_id;

DROP TABLE IF EXISTS answers_data;

CREATE TABLE answers_data AS SELECT Answers.*, photos_data.photos
FROM Answers LEFT JOIN photos_data ON
Answers.id = photos_data.answer_id ORDER BY Answers.id;

ALTER TABLE answers_data ALTER photos SET DEFAULT '[]';

DROP TABLE IF EXISTS Photos CASCADE;
DROP TABLE IF EXISTS Answers CASCADE;

-- -- would query time be faster if unix epoch is converted already into to_timestamp when creating table?
-- -- transforming uniq epoch into to_timestamp
UPDATE questions SET question_date = question_date/1000;
ALTER TABLE questions ALTER question_date TYPE TIMESTAMP WITHOUT TIME ZONE USING to_timestamp(question_date) AT TIME ZONE 'UTC';

UPDATE answers SET date = date/1000;
ALTER TABLE answers ALTER date TYPE TIMESTAMP WITHOUT TIME ZONE USING to_timestamp(date) AT TIME ZONE 'UTC';

-- INDEXing the tables
CREATE INDEX product_id ON Questions (product_id);
CREATE INDEX question_id ON answers_data (question_id);

/*
qna=# ALTER TABLE answers_data ADD PRIMARY KEY (id);
ALTER TABLE
qna=# CREATE SEQUENCE answers_data_id_seq;
CREATE SEQUENCE
qna=# ALTER SEQUENCE answers_data_id_seq OWNED BY answers_data.id;
ALTER SEQUENCE
qna=# ALTER TABLE answers_data ALTER COLUMN id SET DEFAULT nextval('answers_data_id_seq');
ALTER TABLE
qna=# ALTER TABLE answers_data ALTER COLUMN id SET NOT NULL;
ALTER TABLE
qna=# SELECT MAX(id) FROM answers_data;
   max
---------
 6879306
(1 row)

qna=# SELECT nextval('answers_data_id_seq');
 nextval
---------
       1
(1 row)
qna=# BEGIN;
BEGIN
qna=*# LOCK TABLE answers_data IN EXCLUSIVE MODE;
LOCK TABLE
qna=*# SELECT setval('answers_data_id_seq', COALESCE((SELECT MAX(id)+1 FROM answers_data), 1), false);
 setval
---------
 6879307
(1 row)

qna=*# COMMIT;
COMMIT
qna=# SELECT MAX(id) FROM answers_data;
   max
---------
 6879306
(1 row)
*/

