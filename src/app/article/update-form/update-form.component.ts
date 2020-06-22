import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../shared/article.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.scss']
})
export class UpdateFormComponent implements OnInit {
  article
  value

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.get()
  }

  put(updateForm): void {
    this.route.paramMap.subscribe(params => {
      this.articleService.updateArticleById(params.get('id'), updateForm.value).subscribe(
        (result) => {
          this.router.navigate(['/article'])
        },
        (err) => {
          console.error(err)
        }
      )
    })
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
