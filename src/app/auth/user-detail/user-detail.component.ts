import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
    this.get()
  }

  get(): void {
    this.route.paramMap.subscribe(params => {
      const userObservable = this.authService.getUserById
      (params.get('id'))
      userObservable.subscribe(
        (data) => {
          this.user = data
        },
        (err) => {
          console.log('失敗')
        }
      )
    })
  }

  delete(): void {
    this.route.paramMap.subscribe(params => {
      this.authService.deleteUserById(params.get('id'))
        .subscribe(() => this.router.navigate(['/admin']))
    })
  }
}
