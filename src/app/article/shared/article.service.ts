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
  private searchUrl = 'api/v1/search/articleSearch'
  private userUrl = 'api/v1/users'
  
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

  searchArticle(searchData: string): Observable<any> {
    return this.http.post(this.searchUrl, searchData)
  }

  editProfileById(id: string, profile: { username: string, email: string }): Observable<any> {
    const url = `${this.userUrl}/userInfo/${id}`
    return this.http.put(url, profile, httpOptions)
  }

  editPasswordById(id: string, password: string): Observable<any> {
    const url = `${this.userUrl}/password/${id}`
    return this.http.put(url, password, httpOptions)
  }

  getProfileById(id: string): Observable<any> {
    const url = `${this.userUrl}/${id}`
    return this.http.get(url)
  }
}
