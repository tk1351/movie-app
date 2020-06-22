import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errors: any = []

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login(loginForm) {
    this.authService.loginUser(loginForm.value).subscribe(
      (token) => {
        console.log(token)
        localStorage.setItem('username', decodeJwt(token).username);
        localStorage.setItem('userId', decodeJwt(token).userId);
        this.router.navigate(['/'])
      },
      (err: HttpErrorResponse) => {
        console.error(err)
        this.errors = err.error.errors
      }
    )
  }
  

}

const decodeJwt = (token) => {                                        
  const base64Url = token.split('.')[1];                             
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');    
  return JSON.parse(decodeURIComponent(escape(window.atob(base64))));
};

     
