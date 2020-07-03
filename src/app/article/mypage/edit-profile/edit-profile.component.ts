import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../shared/article.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  user

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.get()
  }

  put(editForm): void {
    this.route.paramMap.subscribe(params => {
      this.articleService.editProfileById(params.get('id'), editForm.value).subscribe(
        (result) => {
          localStorage.setItem('username', editForm.value.username)
          this.router.navigate(['/my-page'])
        },
        (err) => {
          console.error(err)
        }
      )
    })
  }

  get(): void {
    this.route.paramMap.subscribe(params => {
      this.articleService.getProfileById(params.get('id')).subscribe(
        (result) => {
          this.user = result
        },
        (err) => {
          console.error(err)
        }
      )
    })
  }

}
