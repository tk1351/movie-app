import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { ArticleListComponent } from './article-list/article-list.component'
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleFormComponent } from './article-form/article-form.component';
import { ArticleService } from './shared/article.service'
import { ArticleComponent } from './article.component';
import { FormsModule }   from '@angular/forms';
import { AuthGuard } from '../auth/shared/auth.guard';
import { NgxPaginationModule } from 'ngx-pagination';
import { UpdateFormComponent } from './update-form/update-form.component'
import { AuthModule } from '../auth/auth.module';

const routes: Routes = [
  { 
    path: 'article', component: ArticleComponent,
    children: [
      { path: '', component: ArticleListComponent },
      { path: ':id', component: ArticleDetailComponent }
    ]
  },
  { path: 'article-form', component: ArticleFormComponent ,canActivate: [AuthGuard]},
  { path: 'update-form', component: ArticleComponent,
    children: [
      { path: ':id', component: UpdateFormComponent, canActivate: [AuthGuard] }
    ]
  }
]

@NgModule({
  declarations: [
    ArticleComponent,
    ArticleListComponent,
    ArticleDetailComponent,
    ArticleFormComponent,
    UpdateFormComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    AuthModule
  ],
  providers: [
    ArticleService
  ],
  bootstrap: []
})
export class ArticleModule { }