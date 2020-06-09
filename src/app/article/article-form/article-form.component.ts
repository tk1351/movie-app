import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../shared/article.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit {

  constructor(
    private articleService: ArticleService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  post(articleForm) {
    this.articleService.postArticle(articleForm.value).subscribe(
      (result) => {
        console.log('success')
        this.router.navigate(['/article'])
      },
      (err) => {
        console.error(err)
      }
    )
  }

}
