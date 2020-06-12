import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  users

  constructor(
    private route: ActivatedRoute,
    private commonService: CommonService,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
  }

  get(): void {
    this.route.paramMap.subscribe(params => {
      const usersObservable = this.commonService.getUsername
      (params.get('id'))
      usersObservable.subscribe(
        (data) => {
          this.users = data
        },
        (err) => {
          console.log('失敗')
        }
      )
    })
  }

}
