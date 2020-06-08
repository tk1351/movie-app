import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'

const httpOptions = {
  headers: new HttpHeaders( {
    'Content-Type':  'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(
    private http: HttpClient
  ) { }

  private articleUrl = 'api/v1/article'

  getArticle(): Observable<any> {
    return this.http.get(this.articleUrl)
  }

  getArticleById(id: string): Observable<any> {
    const url = `${this.articleUrl}/${id}`
    console.log(this.http.get(url))
    return this.http.get(url)
  }
}
