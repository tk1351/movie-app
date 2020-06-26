import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../shared/article.service';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  articles

  page: number = 1
  data: Array<any>

  constructor(
    private articleService: ArticleService,
    public auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.get()
    this.data = new Array<any>()
  }

  get():void {
    this.articleService.getArticle()
      .subscribe(article => this.articles = article)
  }

  search(searchForm) {
    this.articleService.searchArticle(searchForm.value).subscribe(
      (articles) => {
        // console.log(articles)
        console.log(searchForm.value)
        this.articles = articles
      },
      (err) => {
        console.error(err)
      }
    )
  }

}
