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

  getUsers(): Observable<any> {
    return this.http.get('api/v1/users')
  }

  getArticleById(id: string): Observable<any> {
    const url = `${this.articleUrl}/${id}`
    return this.http.get(url)
  }

  postArticle(articleData: string): Observable<any> {
    return this.http.post(this.articleUrl, articleData)
  }

  deleteArticleById(id: string): Observable<any> {
    const url = `${this.articleUrl}/${id}`
    return this.http.delete(url, httpOptions)
  }

  updateArticleById(id: string, article: {title: string, text: string}): Observable<any> {
    const url = `${this.articleUrl}/${id}`
    return this.http.put(url, article,  httpOptions)
  }
}
