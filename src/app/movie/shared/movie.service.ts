import { Injectable } from '@angular/core';
import { Movie } from '../movie-detail/movie'
import { Movies } from '../movie-list/movies'
import { MovieCredits } from '../movie-detail/movie.credits'
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders( {
    'Content-Type':  'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private API_KEY = 'b984f3182bc1e36977e4ee6caca2f7f7'
  private lang = 'ja-JA'
  private now_playing_url = 'https://api.themoviedb.org/3/movie/now_playing'
  private movie_url = 'https://api.themoviedb.org/3/movie/'
  private serach_url = 'https://api.themoviedb.org/3/search/movie'

  constructor(
    private http: HttpClient
  ) { }

  getNowPlaying(page: number): Observable<Movies> {
    const url = `${this.now_playing_url}?api_key=${this.API_KEY}&language=${this.lang}&page=${page}`
    return this.http.get<Movies>(url)
  }

  search(query: {queryParam: string}): Observable<Movies> {
    const url = `${this.serach_url}?api_key=${this.API_KEY}&language=${this.lang}&query=${query.queryParam}`
    return this.http.get<Movies>(url)
  }

  getDetail(id: number): Observable<Movie> {
    const url = `${this.movie_url}${id}?api_key=${this.API_KEY}&language=${this.lang}`
    return this.http.get<Movie>(url)
  }

  getCredits(id: number): Observable<MovieCredits> {
    const url = `${this.movie_url}${id}/credits?api_key=${this.API_KEY}`
    return this.http.get<MovieCredits>(url)
  }

  getSimilar(id: number): Observable<Movies> {
    const url = `${this.movie_url}${id}/similar?api_key=${this.API_KEY}&language=${this.lang}&page=1`
    return this.http.get<Movies>(url)
  }


}

