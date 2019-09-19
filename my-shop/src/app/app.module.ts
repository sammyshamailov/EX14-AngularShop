import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { ProductsPageComponent } from './components/products-page/products-page.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';
import { CategoryChoiceComponent } from './components/category-choice/category-choice.component';
import { SocialLinkComponent } from './components/social-link/social-link.component';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { EditPageComponent } from './components/edit-page/edit-page.component';
import { ErrorNotFoundComponent } from './components/error-not-found/error-not-found.component';

import { LocalizationPipe } from './pipes/localization.pipe';
import { PermissionDirective } from './directives/permission.directive';
import { LogInterceptor } from './interceptors/log';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    HomePageComponent,
    AboutPageComponent,
    ProductsPageComponent,
    ContactPageComponent,
    CategoryChoiceComponent,
    SocialLinkComponent,
    ProductComponent,
    CartComponent,
    LoginPageComponent,
    EditPageComponent,
    LocalizationPipe,
    PermissionDirective,
    ErrorNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: LogInterceptor, multi: true } ]
})
export class AppModule { }
