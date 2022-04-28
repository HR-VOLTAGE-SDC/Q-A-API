import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse:false,
  stages: [
    { duration: '10s', target: 1},
    { duration: '15s', target: 500},
    { duration: '10s', target: 100},
    { duration: '1m', target: 1000},
    { duration: '10s', target: 100},
    { duration: '10s', target: 10},
    { duration: '30s', target: 0},
  ]
};

const API_BASE_URL = 'http://localhost:3000'

export default () => {
  let id = Math.floor(Math.random()*99999);

    http.batch([
      ['get', `${API_BASE_URL}/qa/questions?product_id=${id}`],
      ['get', `${API_BASE_URL}/qa/questions/${id}/answers`]
    ]);

  sleep(1);
};

