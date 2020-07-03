import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  errors: any = []
  hide = true

  constructor(
    private authService: AuthService,
    public auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  register(registerForm) {
    const registerBody = {...registerForm.value, role: 'editor'}

    this.authService.registerUser(registerBody).subscribe(
      (result) => {
        console.log("success")
        this.router.navigate(['/admin'])
      },
      (err: HttpErrorResponse) => {
        console.error(err)
        this.errors = err.error.errors
      }
    )
  }

}
