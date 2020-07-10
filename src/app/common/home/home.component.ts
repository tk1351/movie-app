import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { MovieService } from 'src/app/movie/shared/movie.service';
import { Movies } from 'src/app/movie/movie-list/movies';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  users

  movies: Movies
  
  page: number = 1
  data: Array<any>

  constructor(
    public auth: AuthService,
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    this.users = localStorage.getItem("username")
    this.get(this.page)
  }

  get(page: number): void {
    this.movieService.getNowPlaying(page)
      .subscribe(movies => this.movies= movies)
  }


}
