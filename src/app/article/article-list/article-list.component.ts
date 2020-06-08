import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../shared/article.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  article

  constructor(
    private articleService: ArticleService
  ) { }

  ngOnInit(): void {
    this.get()
  }
  get():void {
    this.articleService.getArticle()
      .subscribe(article => this.article = article)
  }

}
