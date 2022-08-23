import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = false;

  constructor(
    private router: Router,
    private jwtHelperService: JwtHelperService,
    private storageService: StorageService
  ) {
    const token = localStorage.getItem('token');
    if (token) {
      this.loggedIn = true;
      const user = this.jwtHelperService.decodeToken(token).user;
      console.log(this.jwtHelperService.decodeToken(token));
      // parse token and set user info
    }
  }

  login() {
    this.loggedIn = true;
    this.storageService.setLocalStorage('token', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjaGFtYTFAY2hhbWEuY29tIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTY2MTI1ODg4OCwiZXhwIjoxNjkyNzk0ODg4fQ.fNjuH03FYEPlMujQS8hUnXrfvZGKbYFhUIJ8fTtSZI4');
    this.router.navigateByUrl("");
  }

  logout() {
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}
