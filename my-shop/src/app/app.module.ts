import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AboutComponent } from './components/about/about.component';
import { ProductsPageComponent } from './components/products-page/products-page.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';
import { CategoryChoiceComponent } from './components/category-choice/category-choice.component';
import { SocialLinkComponent } from './components/social-link/social-link.component';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    HomePageComponent,
    AboutComponent,
    ProductsPageComponent,
    ContactPageComponent,
    CategoryChoiceComponent,
    SocialLinkComponent,
    ProductComponent,
    CartComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
