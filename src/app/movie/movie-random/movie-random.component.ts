import { Component, OnInit } from '@angular/core';
import { MovieService } from '../shared/movie.service';
import { MovieResults } from '../movie-list/movies';

@Component({
  selector: 'app-movie-random',
  templateUrl: './movie-random.component.html',
  styleUrls: ['./movie-random.component.scss']
})
export class MovieRandomComponent implements OnInit {
  movie: MovieResults
  page: number = 1

  constructor(
    private movieService: MovieService
    ) { }
    
    ngOnInit(): void {
    }
    
    getRandom(page: number): void {
      this.movieService.getNowPlaying(page)
        .subscribe(movies => {          
          const randomMovie = movies.results[Math.floor(Math.random() * movies.results.length)]
          this.movie = randomMovie
       })
  }

}
