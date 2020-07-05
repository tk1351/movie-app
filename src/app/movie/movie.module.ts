import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FormsModule }   from '@angular/forms';
import { AuthModule } from '../auth/auth.module';
import { MovieComponent } from './movie.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MovieSearchComponent } from './movie-search/movie-search.component';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'

const routes: Routes = [
  { path: 'movie', component: MovieComponent, 
    children: [
      { path: '', component: MovieSearchComponent  }
    ]
  },
  { path: 'detail/:id', component: MovieDetailComponent }
]

@NgModule({
  declarations: [
    MovieComponent,
    MovieListComponent,
    MovieDetailComponent,
    MovieSearchComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled'
    }),
    CommonModule,
    FormsModule,
    AuthModule,
    NgxPaginationModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [
  ],
  bootstrap: []
})
export class MovieModule { }