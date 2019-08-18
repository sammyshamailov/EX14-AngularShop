import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AboutComponent } from './about/about.component';
import { ProductsPageComponent } from './products-page/products-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { CategoryChoiceComponent } from './category-choice/category-choice.component';
import { SocialLinkComponent } from './social-link/social-link.component';
import { ProductComponent } from './product/product.component';

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
    ProductComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
