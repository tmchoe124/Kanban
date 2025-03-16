import { JwtPayload, jwtDecode } from 'jwt-decode';

interface CustomJwtPayload extends JwtPayload {
  username: string;
}

class AuthService {
  getProfile() {
    // TODO: return the decoded token
    const token = this.getToken();
    return token ? jwtDecode<CustomJwtPayload>(token) : null;
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    const token = this.getToken();
    return token && !this.isTokenExpired(token) ? true : false;
  }
  
  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
    try {
      const decoded = jwtDecode<CustomJwtPayload>(token);
      if (!decoded.exp) {
        return true;
      }
      return decoded.exp * 1000 < Date.now();
    } catch (error) {
      return true;
    }
  }

  getToken(): string {
    // TODO: return the token
    return localStorage.getItem("id_token") || "";
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    localStorage.setItem("id_token", idToken);
    //TODO: redirect to the homepage
    window.location.assign("/");
  }

  logout() {
    // TODO: remove the token from localStorage
    localStorage.removeItem("id_token");
    // TODO: redirect to the login page
    window.location.assign("/login");
  }
}

export default new AuthService();
