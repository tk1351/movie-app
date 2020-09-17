import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { ArticleService } from '../../shared/article.service';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss'],
})
export class ArticleFormComponent implements OnInit {
  constructor(
    private articleService: ArticleService,
    public auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  post(articleForm) {
    const uid = localStorage.getItem('userId');
    const postValue = { ...articleForm.value, uid: uid };

    this.articleService.postArticle(postValue).subscribe(
      (result) => {
        console.log('success');
        this.router.navigate(['/article']);
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
