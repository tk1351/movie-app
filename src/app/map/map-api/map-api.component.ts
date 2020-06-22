import { Component, OnInit } from '@angular/core';
import { MovieMaps } from '../agm-list/movie-map-list'

@Component({
  selector: 'app-map-api',
  templateUrl: './map-api.component.html',
  styleUrls: ['./map-api.component.scss']
})
export class MapApiComponent implements OnInit {

  lat: number = 35.686159;
  lng: number = 139.744989;
  zoom: number = 12;

  movieMaps = MovieMaps

  constructor() { }

  ngOnInit(): void {
  }

}
