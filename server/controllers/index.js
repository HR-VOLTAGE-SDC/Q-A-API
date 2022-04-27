const models = require('../models');

module.exports = {
  // get request
  getAllQuestions: (req, res) => {
    console.log(req.query)
    models.getAllQuestions(req.query)
    .then((info) => {
      // info = pool.query(text)
      res.json(info.rows[0].json_build_object)
    })
    .catch((err) => res.sendStatus(500))
  },

  getAllAnswers: (req, res) => {
    console.log(req.params)
    console.log(req.query)
    models.getAllAnswers(req.params, req.query)
    .then((info) => {
      res.json(info.rows[0].json_build_object)
    })
    .catch(err => res.sendStatus(500))
  },
  // post req
  addQuestion: (req, res) => {
    // console.log(req.query)
    models.addQuestion(req.query)
    // .then(info => {

    // })
    // .catch(err => res.sendStatus(500))
  },

  addAnswer: (req, res) => {
    // console.log(req.params)
    // console.log(req.query)
    models.addAnswer(req.params, req.query)
    .then(info => {
      res.send(201, 'posted')

    })
    .catch(err => res.sendStatus(500))
  },

  // update and report question
  updateQuestionHelpful: (req, res) => {
    console.log(req.params)
    models.updateQuestionHelpful(req.params)
    .then(info => {
      res.sendStatus(204)
      console.log('helpfulness has been updated')
    })
    .catch(err => res.sendStatus(500))
  },

  updateQuestionReport: (req, res) => {
    console.log(req.params)
    models.updateQuestionReport(req.params)
    .then(info => {
      res.sendStatus(204)
      console.log('q has been reported')
    })
    .catch(err => res.sendStatus(500))
  },
  // update and report answer
  updateAnswerHelpful: (req, res) => {
    console.log(req.params)
    models.updateAnswerHelpful(req.params)
    .then(info => {
      res.sendStatus(204)
      console.log('Answer helpfulness has been updated')
    })
    .catch(err => res.sendStatus(500))
  },

  updateAnswerReport: (req, res) => {
    console.log(req.params)
    models.updateAnswerReport(req.params)
    .then(info => {
      res.sendStatus(204)
      console.log('Ans has been reported')
    })
    .catch(err => res.sendStatus(500))
  }
}

