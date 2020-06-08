import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'
import { ArticleService } from '../shared/article.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {
  article

  constructor(
    private route: ActivatedRoute,
    private location: Location,
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

}
