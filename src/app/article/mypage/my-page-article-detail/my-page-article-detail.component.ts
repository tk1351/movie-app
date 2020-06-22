import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../../shared/article.service';
import { AuthService } from 'src/app/auth/shared/auth.service';

@Component({
  selector: 'app-my-page-article-detail',
  templateUrl: './my-page-article-detail.component.html',
  styleUrls: ['./my-page-article-detail.component.scss']
})
export class MyPageArticleDetailComponent implements OnInit {
  article

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public articleService: ArticleService,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
    this.get()
  }

  get(): void {
    this.route.paramMap.subscribe(params => {
      const articleObservable = this.articleService.getArticleById
      (params.get('id'))
      articleObservable.subscribe(
        (data) => {
          this.article = data
        },
        (err) => {
          console.log('失敗')
        }
      )
    })
  }

  delete(): void {
    this.route.paramMap.subscribe(params => {
      this.articleService.deleteArticleById(params.get('id'))
        .subscribe(() => this.router.navigate(['/article']))
    })
  }

}
