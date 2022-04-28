import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse:false,
  vus: 100,
  duration: '15s'
};

export default () => {
  let id = Math.floor(Math.random()*99999);
  const url = `http://localhost:3000/qa/questions?product_id=${id}`
  http.get(url);
  sleep(1);
};
