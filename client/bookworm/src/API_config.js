const EXPRESS_PORT = 5000;
const apiUrls = {
  development: `http://localhost:${EXPRESS_PORT}`,
  production: `https://ibookworms.herokuapp.com`,
};
const API_URL =
  window.location.hostname === 'localhost'
    ? apiUrls.development
    : apiUrls.production;
// if (window.location.hostname === 'localhost') {
//   API_URL = apiUrls.development;
// } else {
//   API_URL = apiUrls.production;
// }
export default API_URL;