import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { ArticleService } from '../shared/article.service';
import { AuthService } from 'src/app/auth/shared/auth.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {
  article
  updateform
  value = ''

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
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
