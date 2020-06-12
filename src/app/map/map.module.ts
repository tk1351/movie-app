import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FormsModule }   from '@angular/forms';
import { MapComponent } from './map.component';
import { MapApiComponent } from './map-api/map-api.component';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';

const routes: Routes = [
  { path:'map', component: MapComponent,
    children: [
      { path: '', component: MapApiComponent }
    ]
  }
]

@NgModule({
  declarations: [
  MapApiComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.key
    })
  ],
  providers: [
    
  ],
  bootstrap: []
})
export class MapModule { }