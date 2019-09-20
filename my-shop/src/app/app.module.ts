import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ProductsModule } from './products/products.module';
import { SharedModule } from './shared/shared.module';
import { LoginModule } from './login/login.module';

import { AboutPageComponent } from './components/about-page/about-page.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';
import { ErrorNotFoundComponent } from './components/error-not-found/error-not-found.component';
import { HeaderComponent } from './components/header/header.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MenuComponent } from './components/menu/menu.component';
import { SocialLinkComponent } from './components/social-link/social-link.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SocialLinkComponent,
    MenuComponent,
    HomePageComponent,
    AboutPageComponent,
    ContactPageComponent,
    ErrorNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    ProductsModule,
    LoginModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
