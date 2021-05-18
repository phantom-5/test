import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoComponent } from './info/info.component';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  {path: '', component: InfoComponent}
]

@NgModule({
  declarations: [
    InfoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(appRoutes)
  ]
})
export class AdminModule { }
