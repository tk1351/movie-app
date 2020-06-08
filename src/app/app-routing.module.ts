import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleModule } from './article/article.module';


const routes: Routes = [
  { path: '', redirectTo: 'article', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ArticleModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
