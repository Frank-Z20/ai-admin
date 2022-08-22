import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = false;

  constructor(
    private router: Router
  ) {
    const token = localStorage.getItem('token');
    if (token) {
      // parse token and set user info
    }
  }

  login() {
    this.loggedIn = true;
    this.router.navigateByUrl("");
  }

  logout() {
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}
