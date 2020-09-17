import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { ArticleService } from '../../shared/article.service';

@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.scss'],
})
export class MyPageComponent implements OnInit {
  articles;
  myArticles;
  users;
  userId;

  page: number = 1;

  constructor(
    private articleService: ArticleService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.users = localStorage.getItem('username');
    this.userId = localStorage.getItem('userId');
    this.get();
  }

  get(): void {
    this.articleService.getArticle().subscribe((articles) => {
      console.log(articles);
      this.myArticles = articles.filter(
        (article) => article.uid === this.userId
      );
    });
  }
}
