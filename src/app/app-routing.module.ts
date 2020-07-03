import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleModule } from './article/article.module';
import { AuthModule } from './auth/auth.module';
import { HomeComponent } from './common/home/home.component';
import { MapModule } from './map/map.module'
import { MovieModule } from './movie/movie.module';


const routes: Routes = [
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ArticleModule,
    MapModule,
    MovieModule,
    AuthModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
