import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FormsModule }   from '@angular/forms';
import { MapComponent } from './map.component';
import { MapApiComponent } from './map-api/map-api.component';
import { AgmCoreModule } from '@agm/core';
import { env } from '../map/map-api';

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
      apiKey: env.key
    })
  ],
  providers: [
    
  ],
  bootstrap: []
})
export class MapModule { }