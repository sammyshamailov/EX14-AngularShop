import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AboutComponent } from './about/about.component';
import { ProductsPageComponent } from './products-page/products-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { ProductsDetailsPageComponent } from './products-details-page/products-details-page.component';
import { CategoryChoiceComponent } from './category-choice/category-choice.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    HomePageComponent,
    AboutComponent,
    ProductsPageComponent,
    ContactPageComponent,
    ProductsDetailsPageComponent,
    CategoryChoiceComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
