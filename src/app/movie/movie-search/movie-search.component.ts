import { Component, OnInit } from '@angular/core';
import { MovieService } from '../shared/movie.service';
import { ActivatedRoute } from '@angular/router';
import { Movies } from '../movie-list/movies';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent implements OnInit {
  movies: Movies

  constructor(
    private movieSearch: MovieService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  search(query): void {
    this.movieSearch.search(query.value).subscribe(
      (movies) => {
        this.movies = movies
      },
      (err) => {
        console.error(err)
      }
    )
  }

}
