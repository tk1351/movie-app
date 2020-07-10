import { Component, OnInit } from '@angular/core';
import { MovieService } from '../shared/movie.service';
import { Movie } from './movie';
import { ActivatedRoute } from '@angular/router';
import { Movies, MovieResults } from '../movie-list/movies';
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
  similarMovies: MovieResults[]

  director
  screenplay
  photography
  producer

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
          this.crews = data.crew
          this.casts = data.cast.slice(0, 4)
 
          this.director = this.crews.filter(crew => crew.job === 'Director')[0]
          this.screenplay = this.crews.filter(crew => crew.job === 'Screenplay')[0]
          this.photography = this.crews.filter(crew => crew.job === 'Director of Photography')[0]
          this.producer = this.crews.filter(crew => crew.job === 'Producer')[0]

        },
        (err) => {
          console.log(err)
        }
      )

      const similarObservable = this.movieService.getSimilar(id)

      similarObservable.subscribe(
        (data) => {
          this.similarMovies = data.results
          console.log(this.similarMovies)
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
