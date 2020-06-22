import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  users

  constructor(
    private authService: AuthService,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
    this.get()
  }

  get(): void {
    this.authService.getUsers()
      .subscribe(user => this.users = user)
  }

}
