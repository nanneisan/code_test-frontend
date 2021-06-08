import axios from "axios";

//utils
import { getToken, removeToken } from "../util/auth";

//constants
import endpoints from "../constants/api";

const httpService = axios.create({
  baseURL: endpoints.baseUrl,
});

httpService.interceptors.request.use((config) => {
  config.headers["x-access-token"] =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjMwNDgyODcsImV4cCI6MTYyNDg2MjY4N30.zArEpjGhNUr6kJaxwmrqEWnDR5D4-Y2Nebp-SgdgDIQ"; //getToken();
  return config;
});

// httpService.interceptors.response.use((config) => {
//   console.log(config);
//   //can use logger here
//   let statusCode = config.data.meta.code;
//   // console.log(statusCode);
//   // if (statusCode === 401 || statusCode === 403) {
//   //   removeToken();
//   // }
//   // if (statusCode === 422) return false;
//   return config;
// });

export default httpService;
