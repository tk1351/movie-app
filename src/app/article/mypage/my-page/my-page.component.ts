import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../shared/article.service';
import { AuthService } from 'src/app/auth/shared/auth.service';

@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.scss']
})
export class MyPageComponent implements OnInit {
  articles
  myArticles
  users
  userId

  page: number = 1
  data: Array<any>

  constructor(
    private articleService: ArticleService,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
    this.get()
    this.data = new Array<any>()
    this.users = localStorage.getItem("username")
    this.userId = localStorage.getItem("userId")
  }

  get(): void {
    this.articleService.getArticle()
      .subscribe(articles => {
        this.myArticles = articles.filter(article => article.uid === this.userId)
      })
  }
}
