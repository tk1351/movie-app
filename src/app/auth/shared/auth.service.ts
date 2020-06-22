import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { JwtHelperService } from "@auth0/angular-jwt"
import * as moment from 'moment'

const jwt = new JwtHelperService()

class DecodedToken {
  userId: string = ''
  username: string = ''
  exp: number = 0
}

const httpOptions = {
  headers: new HttpHeaders( {
    'Content-Type':  'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private decodedToken

  constructor(
    private http: HttpClient,
    private router: Router
  ) { 
    this.decodedToken = JSON.parse(localStorage.getItem('app-meta')) || new DecodedToken
  }

  private usersUrl = '/api/v1/users'
  private registerUrl = '/api/v1/users/register'
  private loginUrl = '/api/v1/users/login'

  getToken() {
    return localStorage.getItem('app-auth')
  }

  isAuthenticated() {
    return moment().isBefore(moment.unix(this.decodedToken.exp))
  }

  isEditor() {
    return this.decodedToken.role === "editor"
  }

  isSystemAdmin() {
    return this.decodedToken.role === "systemAdmin"
  }

  registerUser(userData: any): Observable<any> {
    return this.http.post(this.registerUrl, userData)
  }

  loginUser(userData: any): Observable<any> {
    return this.http.post(this.loginUrl, userData).pipe(map(
      (token: string) => {
        this.decodedToken = jwt.decodeToken(token)
        localStorage.setItem('app-auth', token)
        localStorage.setItem('app-meta', JSON.stringify(this.decodedToken))
        return token
      }
    ))
  }

  logout() {
    localStorage.removeItem('app-auth')
    localStorage.removeItem('app-meta')
    this.decodedToken = new DecodedToken
    this.router.navigate(['/'])
  }

  getUsers() {
    return this.http.get(this.usersUrl)
  }

  getUserById(id: string): Observable<any> {
    const url = `${this.usersUrl}/${id}`
    return this.http.get(url)
  }

  deleteUserById(id: string): Observable<any> {
    const url = `${this.usersUrl}/${id}`
    return this.http.delete(url, httpOptions)
  }
}