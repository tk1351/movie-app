import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  static articles(articles: any) {
    throw new Error("Method not implemented.");
  }

  constructor() { }

  ngOnInit(): void {
  }

}