import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleModule } from './article/article.module';
import { AuthModule } from './auth/auth.module';
import { HomeComponent } from './common/home/home.component';
import { MapModule } from './map/map.module'
import { MovieModule } from './movie/movie.module';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled'
    }),
    ArticleModule,
    MapModule,
    MovieModule,
    AuthModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
