import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { ArticleListComponent } from './article-list/article-list.component'
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleFormComponent } from './mypage/article-form/article-form.component';
import { ArticleService } from './shared/article.service'
import { ArticleComponent } from './article.component';
import { FormsModule }   from '@angular/forms';
import { AuthGuard } from '../auth/shared/auth.guard';
import { NgxPaginationModule } from 'ngx-pagination';
import { UpdateFormComponent } from './update-form/update-form.component'
import { AuthModule } from '../auth/auth.module';
import { MyPageComponent } from './mypage/my-page/my-page.component';
import { MyPageArticleDetailComponent } from './mypage/my-page-article-detail/my-page-article-detail.component';
import { EditProfileComponent } from './mypage/edit-profile/edit-profile.component';
import { EditPasswordComponent } from './mypage/edit-password/edit-password.component';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'

const routes: Routes = [
  { 
    path: 'article', component: ArticleComponent,
    children: [
      { path: '', component: ArticleListComponent },
      { path: ':id', component: ArticleDetailComponent }
    ]
  },
  { path: 'article-form', component: ArticleFormComponent ,canActivate: [AuthGuard] },
  { path: 'update-form', component: ArticleComponent,
    children: [
      { path: ':id', component: UpdateFormComponent, canActivate: [AuthGuard] }
    ]
  },
  { path: 'my-page', component: ArticleComponent ,canActivate: [AuthGuard],
    children: [
      { path: '', component: MyPageComponent },
      { path: ':id', component: MyPageArticleDetailComponent },
    ]
  },
  { path: 'edit-profile', component: ArticleComponent,
    children: [
      { path: ':id', component: EditProfileComponent, canActivate: [AuthGuard] }
    ]
  },
  { path: 'edit-password', component: ArticleComponent,
    children: [
      { path: ':id', component: EditPasswordComponent, canActivate: [AuthGuard] }
    ]
  }
]

@NgModule({
  declarations: [
    ArticleComponent,
    ArticleListComponent,
    ArticleDetailComponent,
    ArticleFormComponent,
    UpdateFormComponent,
    MyPageComponent,
    MyPageArticleDetailComponent,
    EditProfileComponent,
    EditPasswordComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled'
    }),
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    AuthModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [
    ArticleService
  ],
  bootstrap: []
})
export class ArticleModule { }