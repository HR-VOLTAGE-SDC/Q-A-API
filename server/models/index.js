const pool = require("../postgresDBConnection.js");
const format = require('pg-format');

module.exports = {
    getAllQuestions: (params) => {
      console.log('whats in params', params)
    const product_id = params.product_id;
    const count = 5;
    const page = 1;
    const offset = (page * count) - count;
    const text = `
    SELECT JSON_BUILD_OBJECT(
      'product_id', ${product_id},
      'result', (SELECT ARRAY_AGG(JSON_BUILD_OBJECT(
        'question_id', id,
        'question_body', question_body,
        'question_date', question_date,
        'askerName', asker_name,
        'question_helpfulness', question_helpfulness,
        'reported', reported,
        'answer',
        (SELECT JSON_OBJECT_AGG(answers_data.id,
                              JSON_BUILD_OBJECT(
                                'id', answers_data.id,
                                'body', answers_data.body,
                                'date', answers_data.date,
                                'answerer_name', answers_data.answerer_name,
                                'helpfulness', answers_data.helpfulness,
                                'photos', answers_data.photos
                              )
            ) AS answers FROM answers_data WHERE answers_data.question_id = questions.id)
        )) FROM Questions WHERE Questions.product_id = ${product_id})
    )
    `
      //  check err message "error: argument of AND must be type boolean, not type json[]" when WHERE reported = false
      //  pagination and count with OFFSET and COUNT
      //  INDEX should be applied
    return pool.query(text)
    .catch((err) => console.log(err, 'Err getting questions'))
    },

    getAllAnswers: (params, query) => {
      const question_id = params.question_id;
      const page = query.page;
      const count = query.count;

      const text = `
        SELECT JSON_BUILD_OBJECT(
          'question', ${question_id},
          'page', ${page},
          'count', ${count},
          'results', (SELECT ARRAY_AGG(JSON_BUILD_OBJECT(
            'answer_id', id,
            'body', body,
            'date', date,
            'answerer_name', answerer_name,
            'helpfulness', helpfulness,
            'photos', photos
          )) FROM answers_data WHERE question_id = ${question_id})
        )
      `
      return pool.query(text)
      .catch((err) => console.log(err, 'Err from getting all Answers'))
    },

    addQuestion: (query) => {
      // make sure to set up default values for date, reported, helpfulness
      const { product_id, body, name, email } = query;
      console.log(product_id)
      const text = `
        INSERT INTO Questions (product_id, question_body, question_date, asker_name, asker_email) VALUES ($1, $2, NOW() AT TIME ZONE 'UTC', $3, $4) RETURNING id
      `
      return pool.query(text, [parseInt(product_id), body, name, email])
      // console.log(pool.query(text, [product_id, body, name, email]))
      .catch(err => console.log(err, 'err from adding Q'))
      // BUG FIX!!! error: duplicate key value violates unique constraint "questions_pkey"
    },

    addAnswer: (params, query) => {
      const { body, name, email, photos } = query;
      const question_id = params.question_id;
      console.log(body, email, question_id);
      const text = `
        INSERT INTO Answers ( question_id, body, date, answerer_name, answerer_email ) VALUES ($1, $2, NOW()  AT TIME ZONE 'UTC', $3, $4 ) RETURNING *
      `
      return pool.query(text, [question_id, body, name, email])
      .catch(err => console.log(err, 'err from add A'))
    },

    updateQuestionHelpful: (params) => {
      const question_id = params.question_id;
      const text = `
        UPDATE Questions SET question_helpfulness = question_helpfulness + 1 WHERE id = ${question_id}
      `
      return pool.query(text)
      .catch(err => console.log(err, 'err from update Q H'))
    },

    updateQuestionReport:  (params) => {
      const question_id = params.question_id;
      const text = `
        UPDATE Questions SET reported = true WHERE id = ${question_id}
      `
      return pool.query(text)
      .catch(err => console.log(err, 'err from q report'))
    },

    updateAnswerHelpful: (params) => {
      const answer_id = params.answer_id;
      const text = `
        UPDATE Answers SET helpfulness = helpfulness + 1 WHERE id = ${answer_id}
      `
      return pool.query(text)
      .catch(err => console.log(err, 'err from update A H'))
    },

    updateAnswerReport: (params) => {
      const answer_id = params.answer_id;
      const text = `
        UPDATE Answers SET reported = true WHERE id = ${answer_id}
      `
      return pool.query(text)
      .catch(err => console.log(err, 'err from Answer report'))
    }

}

// drop not using tables before deployment

/*
      SELECT JSON_BUILD_OBJECT(
        'product_id', 3,
        'result', (SELECT ARRAY_AGG(JSON_BUILD_OBJECT(
          'question_id', id,
          'question_body', question_body,
          'question_date', question_date,
          'askerName', asker_name,
          'question_helpfulness', question_helpfulness,
          'reported', reported,
          'asnwer', (SELECT JSON_OBJECT_AGG(Answers.id,
                              JSON_BUILD_OBJECT(
                                'id', Answers.id,
                                'body', Answers.body,
                                'date', Answers.date,
                                'answer_name', Answers.answerer_name,
                                'helpfulness', Answers.helpfulness,
                                'photos', (SELECT COALESCE(ARRAY_AGG(JSON_BUILD_OBJECT(
                                            'id', Photos.id,
                                            'url', Photos.url
                                          ))) FROM Photos WHERE Answers.id = Photos.answer_id)
                              )
            ) AS Answers FROM Answers WHERE Answers.question_id = questions.id)
          )) FROM Questions WHERE product_id = 3)
      )

      for getAnswer
              SELECT JSON_BUILD_OBJECT(
          'question', ${question_id},
          'page', ${page},
          'count', ${count},
          'results', (SELECT ARRAY_AGG(JSON_BUILD_OBJECT(
            'answer_id', id,
            'body', body,
            'date', date,
            'answerer_name', answerer_name,
            'helpfulness', helpfulness,
            'photos', (SELECT COALESCE(ARRAY_AGG(JSON_BUILD_OBJECT(
                          'id', Photos.id,
                          'url', Photos.url
                      ))) FROM Photos WHERE Answers.id = Photos.answer_id)
          )) FROM Answers WHERE question_id = ${question_id})
        )



*/

/* GETall q with format
          const text = format(`
          SELECT JSON_BUILD_OBJECT(
            'product_id', %s,
            'result', (SELECT ARRAY_AGG(JSON_BUILD_OBJECT(
              'question_id', id,
              'question_body', question_body,
              'question_date', question_date,
              'askerName', asker_name,
              'question_helpfulness', question_helpfulness,
              'reported', reported,
              'answer',
              (SELECT JSON_OBJECT_AGG(answers_data.id,
                                    JSON_BUILD_OBJECT(
                                      'id', answers_data.id,
                                      'body', answers_data.body,
                                      'date', answers_data.date,
                                      'answerer_name', answers_data.answerer_name,
                                      'helpfulness', answers_data.helpfulness,
                                      'photos', answers_data.photos
                                    )
                  ) AS answers FROM answers_data WHERE answers_data.question_id = questions.id)
              )) FROM Questions WHERE Questions.product_id = %L LIMIT %L OFFSET %L)
          )
        `, product_id, product_id, count, offset);

getall q without
        SELECT JSON_BUILD_OBJECT(
          'product_id', ${product_id},
          'result', (SELECT ARRAY_AGG(JSON_BUILD_OBJECT(
            'question_id', id,
            'question_body', question_body,
            'question_date', question_date,
            'askerName', asker_name,
            'question_helpfulness', question_helpfulness,
            'reported', reported,
            'answer',
            (SELECT JSON_OBJECT_AGG(answers_data.id,
                                  JSON_BUILD_OBJECT(
                                    'id', answers_data.id,
                                    'body', answers_data.body,
                                    'date', answers_data.date,
                                    'answerer_name', answers_data.answerer_name,
                                    'helpfulness', answers_data.helpfulness,
                                    'photos', answers_data.photos
                                  )
                ) AS answers FROM answers_data WHERE answers_data.question_id = questions.id)
            )) FROM Questions WHERE Questions.product_id = ${product_id})
        )
*/