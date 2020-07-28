import decode from 'jwt-decode';

class AuthService {
  // retrieve data saved in token
  getProfile() {
    return decode(this.getToken());
  }

  // check if use is still logged in
  loggedIn() {
    //checks if there is a saved token and still valid
    const token = this.getToken();
    // use type coersion to check if token is not undefied and not expired
    return !!token & !this.isTokenExpired(token);
  }

  // check if token has expired
  isTokenExpired(token) {
    try{
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }

  // retrieve token from localStorage
  getToken() {
    // retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  }

  // set token to localStorage and reload to homepage
  login(idToken) {
    // saves user token to localstorage
    localStorage.setItem('id_token', idToken);

    window.location.assign('/');
  }

  // clear token from localstorage and force logout with reload
  logout() {
    // clear user token and profile data from localstorage
    localStorage.removeItem('id_token');
    // this will reload the page and reset the state of the application
    window.location.assign('/');
  }
}

export default new AuthService();