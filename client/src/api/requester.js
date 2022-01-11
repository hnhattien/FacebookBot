import axios from 'axios';
const BASE_URL = 'http://localhost:3001'

export function setupAxios() {
  axios.defaults.baseURL = `${BASE_URL}/api/v1/`;
  axios.defaults.headers.common['Content-Type'] = 'application/json';
}







const responseBody = res => res.data;

const requester = {
  get: (url, params, config = {}) =>
    axios
      .get(url, {
        params,
        ...config
      })
      .then(responseBody),

  post: (url, data, config = {}) =>
    axios.post(url, data, config).then(responseBody),
  put: (url, data, config = {}) =>
    axios.put(url, data, config).then(responseBody),
  delete: (url, data, config = {}) =>
    axios.delete(url, { data, ...config }).then(responseBody)
};

export default requester;
