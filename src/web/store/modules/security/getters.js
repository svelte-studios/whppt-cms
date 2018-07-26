export default {

  user: state => {
    return JSON.parse(localStorage.getItem('user'));
  }

};