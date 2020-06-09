import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { Location } from '@angular/common'
import { ArticleService } from '../shared/article.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {
  article
  value = ''

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private articleService: ArticleService
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
