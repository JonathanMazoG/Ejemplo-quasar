import { boot } from "quasar/wrappers";
import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:1341/sapi/" });
//const api = axios.create({ baseURL: "https://admin.isimony.com/sapi/" });

const axiosInstanceBaseURL = "http://localhost:1341/sapi/";
//const axiosInstanceBaseURL = 'https://admin.isimony.com/sapi/';

const axiosInstance = axios.create({
  baseURL: axiosInstanceBaseURL,
});

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});

export { api, axiosInstance };
