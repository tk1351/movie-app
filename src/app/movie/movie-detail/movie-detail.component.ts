import { Component, OnInit } from '@angular/core';
import { MovieService } from '../shared/movie.service';
import { Movie } from './movie';
import { ActivatedRoute } from '@angular/router';
import { Movies } from '../movie-list/movies';
import { Location } from '@angular/common';
import { MovieCast, MovieCrew } from './movie.credits';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})

export class MovieDetailComponent implements OnInit {
  movie: Movie
  movies: Movies
  casts: MovieCast[]
  crews: MovieCrew[]

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.get()
  }

  get(): void {
    this.route.paramMap.subscribe(params => {
      const id = +this.route.snapshot.paramMap.get('id')
      const movieObservable = this.movieService.getDetail(id)
  
      movieObservable.subscribe(
        (data) => {
          this.movie = data
        },
        (err) => {
          console.log(err)
        }
      )

      const creditsObservable = this.movieService.getCredits(id)

      creditsObservable.subscribe(
        (data) => {
          this.crews = data.crew.slice(0, 4)
          this.casts = data.cast.slice(0, 4)
        },
        (err) => {
          console.log(err)
        }
      )

    })
  }

  goBack(): void {
    this.location.back();
  }

}
