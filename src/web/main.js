import App from "@/App";
import router from "@/router";
import auth from "@/auth";
import store from "./store";

Vue.config.productionTip = false;

auth.checkAuth();

axios.interceptors.request.use(function(config) {
  config.baseURL = whppt_api_base_url || "/";
  let token = localStorage.getItem("access_token");
  config.headers.common.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) router.push({ path: "/" });
    if (error.response.status === 403) router.push({ path: "/403" });
    return Promise.reject(error);
  }
);

new Vue({
  el: "#app",
  router,
  store,
  template: "<App/>",
  components: { App }
});
