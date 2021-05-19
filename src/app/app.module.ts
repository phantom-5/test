import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {HttpClientModule} from '@angular/common/http'
import { UserAuthService } from './user-auth.service';
import { FormsComponent } from './forms/forms.component';
import { TemplateformComponent } from './templateform/templateform.component';
import { ReactiveformComponent } from './reactiveform/reactiveform.component';

const appRoutes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'dashboard/:username', component: DashboardComponent, canActivate:[UserAuthService]},
  {path: '', component: LoginComponent},
  {path: 'admin',loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
  {path: 'formsdemo',component:FormsComponent, children:[
    {path: 'templateform', component:TemplateformComponent},
    {path: 'reactiveform', component:ReactiveformComponent}
  ]},
  {path: '**', redirectTo: '/'}
]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    FormsComponent,
    TemplateformComponent,
    ReactiveformComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
