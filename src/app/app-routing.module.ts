import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleModule } from './article/article.module';
import { AuthModule } from './auth/auth.module';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ArticleModule,
    AuthModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
