import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../shared/article.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.scss']
})
export class EditPasswordComponent implements OnInit {
  errors: any = []
  hide = true

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  put(editPasswordForm): void {
    this.route.paramMap.subscribe(params => {
      this.articleService.editPasswordById(params.get('id'), editPasswordForm.value).subscribe(
        (result) => {
          console.log(editPasswordForm.value)
          this.router.navigate(['/my-page'])
        },
        (err) => {
          console.error(err)
          this.errors = err.error.errors
        }
      )
    })
  }

}
