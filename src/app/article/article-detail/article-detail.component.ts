import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { ArticleService } from '../shared/article.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
})
export class ArticleDetailComponent implements OnInit {
  article;
  updateform;
  users;
  value = '';
  username;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public articleService: ArticleService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.get();
    this.getUser();
  }

  get(): void {
    this.route.paramMap.subscribe((params) => {
      const articleObservable = this.articleService.getArticleById(
        params.get('id')
      );
      articleObservable.subscribe(
        (data) => {
          this.article = data;
        },
        (err) => {
          console.log('失敗');
        }
      );
    });
  }

  delete(): void {
    this.route.paramMap.subscribe((params) => {
      this.articleService
        .deleteArticleById(params.get('id'))
        .subscribe(() => this.router.navigate(['/article']));
    });
  }

  getUser(): void {
    this.articleService.getUsers().subscribe((users) => {
      this.username = users.filter(
        (user) => user._id === this.article.uid
      )[0].username;
    });
  }
}
