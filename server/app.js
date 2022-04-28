const express = require("express");
const morgan = require("morgan");
const controllers = require("./controllers");

const app = express();
const port = 3000;

// middleware
app.use(express.json()); // => req.body
app.use(morgan('dev'));

//ROUTES//

/* setting up the app first and then controller and model */

// get all for questions
app.get('/qa/questions', controllers.getAllQuestions)
// get all for answers
app.get(`/qa/questions/:question_id/answers`, controllers.getAllAnswers)

// post question
app.post(`/qa/questions`, controllers.addQuestion)
// post answers
app.post(`/qa/questions/:question_id/answers`, controllers.addAnswer)

// update question helpful
app.put(`/qa/questions/:question_id/helpful`, controllers.updateQuestionHelpful)
// update question report
app.put(`/qa/questions/:question_id/report`, controllers.updateQuestionReport)
// update answer helpful
app.put(`/qa/answers/:answer_id/helpful`, controllers.updateAnswerHelpful)
// update answer report
app.put(`/qa/answers/:answer_id/report`, controllers.updateAnswerReport)




app.listen(port,() => {
  console.log(`server is listening to port ${port}`)
});