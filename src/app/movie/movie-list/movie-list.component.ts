import { Component, OnInit } from '@angular/core';
import { MovieService } from '../shared/movie.service';
import { Movies } from './movies';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  movies: Movies
  
  page: number = 1
  data: Array<any>

  constructor(
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    this.get(this.page)
  }

  get(page: number): void {
    this.movieService.getNowPlaying(page)
      .subscribe(movies => this.movies= movies)
  }

}
