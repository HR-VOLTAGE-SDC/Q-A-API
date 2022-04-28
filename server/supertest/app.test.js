const app = require('../app.js');
const request = require('supertest');


//end point testing

describe('GET /reviews', function () {
  it('responds with reviews for the correct product_id',  () => {
    request(app)
    .get('/')
    .query({product_id: 11})
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect((res) => {
      expect(res.product_id).toBe(11);
      expect(res.results).not.toBeNull();
      expect(200, done);
    })
  })
}
// describe("test api", () => {
//   test('GET /qa/questions', (done) => {
//     request(app)
//       .get('/qa/questions')
//       .query({ product_id: 555 })
//       .expect("Content-Type", /json/)
//       .expect((res) => {
//         expect(res.product_id).toBe(555);
//         expect(res.results).not.toBeNull();
//         expect(200, done);
//       })
//   });
// });