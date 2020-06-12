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
export class CommonService {

  constructor(
    private http: HttpClient
  ) { }

  private usersUrl = 'api/v1/users'

  getUsername(id: string): Observable<any> {
    const url = `${this.usersUrl}/${id}`
    return this.http.get(url)
  }
}
