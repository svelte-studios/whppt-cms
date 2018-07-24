import forLogin from "./forLogin";

export default context => {
  return {
    forLogin: forLogin(context)
  };
};
