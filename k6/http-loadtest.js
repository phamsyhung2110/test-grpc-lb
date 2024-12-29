import http from 'k6/http';
import { check } from 'k6';

export const options = {
discardResponseBodies: true,
scenarios: {
    sendRequest: {
        exec: 'sendRequest',
        executor: 'constant-arrival-rate',
        duration: '60s',
        rate: 20,
        timeUnit: '1s',
        preAllocatedVUs: 5,
        maxVUs: 50,
      }
    }
};

export function sendRequest() {
  const url = 'http://service-a-http:5000/hello?name=User';
  const res = http.get(url);

  check(res, {
    'is status 200': (r) => r.status === 200,
  });
}
