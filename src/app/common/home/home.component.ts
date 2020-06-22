import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/shared/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  users

  constructor(
    public auth: AuthService
  ) { }

  ngOnInit(): void {
    this.users = localStorage.getItem("username");
  }

}
