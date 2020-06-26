import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { CommonService } from '../../common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public auth: AuthService,
    private commonService: CommonService,
    public location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logout(){
    this.auth.logout()
  }
}
