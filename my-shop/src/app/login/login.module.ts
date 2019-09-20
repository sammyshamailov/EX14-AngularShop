import { NgModule } from '@angular/core';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SharedModule } from '../shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
