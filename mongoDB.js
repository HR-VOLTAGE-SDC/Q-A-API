import mongoose from 'mongoose'
const { Schema } = mongoose;

const qnaSchema = new Schema({
  product_id: Number,
  results: [
    {
      question_id: Number,
      question_body: String,
      asker_name: String,
      question_helpfulness: Number,
      reported: Boolean,
      answers: [
        answers_id: Number,
        body: String,
        date: Date,
        answerer_name: String,
        helpfulness: Number,
        photos: [
          {
            photo_id: Number,
            url: String
          }
        ]
      ]
    }
  ]
})