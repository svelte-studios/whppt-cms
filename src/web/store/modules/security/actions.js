import api from "@/api";

export default {
  signup({ commit }, details) {
    return axios
      .post("/api/signup", details)
      .then(response => {
        console.log("RESPONSE.DATA", response.data);
        localStorage.setItem("access_token", response.data.access_token);
        commit("loggedIn", response.data);
      })
      .catch(err =>
        commit("error", err, {
          root: true
        })
      );
  },

  login({ commit }, credentials) {
    return axios
      .post("/api/login", credentials)
      .then(response => {
        localStorage.setItem("access_token", response.data.access_token);
        return axios.get("/sessions/test").then(() => {
          commit("loggedIn", response.data);
        });
      })
      .catch(err =>
        commit("error", err, {
          root: true
        })
      );
  }
};
