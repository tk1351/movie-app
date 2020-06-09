import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { 
    // this.decodedToken = JSON.parse(localStorage.getItem('app-meta')) || new DecodedToken
  }

  private registerUrl = '/api/v1/users/register'
  private loginUrl = '/api/v1/users/login'

  registerUser(userData: any): Observable<any> {
    return this.http.post(this.registerUrl, userData)
  }

  loginUser(userData: any): Observable<any> {
    return this.http.post(this.loginUrl, userData)
  }
}