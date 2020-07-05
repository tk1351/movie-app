import { Component, OnInit } from '@angular/core';
import { MovieService } from '../shared/movie.service';
import { Movies } from '../movie-list/movies';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent implements OnInit {
  movies: Movies
  queryParam

  constructor(
    private movieSearch: MovieService
  ) { }

  ngOnInit(): void {
    this.get()
  }

  search(query): void {
    this.movieSearch.search(query.value).subscribe(
      (movies) => {
        localStorage.setItem('movies', JSON.stringify(movies))
        localStorage.setItem('title', JSON.stringify(query.value.queryParam))
        this.movies = movies
      },
      (err) => {
        console.error(err)
      }
    )
  }
  
  get(): void {
    const searchMovies: Movies = JSON.parse(localStorage.getItem('movies'))
    const searchMoviesQueryParam: Movies = JSON.parse(localStorage.getItem('title'))

    this.movies = searchMovies
    this.queryParam = searchMoviesQueryParam
  }

}
