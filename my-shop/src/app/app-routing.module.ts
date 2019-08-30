import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { ProductsPageComponent } from './components/products-page/products-page.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { EditPageComponent } from './components/edit-page/edit-page.component';
import { LoggedGuard } from './guards/logged.guard';
import { AdminGuard } from './guards/admin.guard';


//This is my case 
const routes: Routes = [
    { path: 'home', component: HomePageComponent },
    { path: 'about', component: AboutPageComponent },
    { path: 'contact', component: ContactPageComponent },
    { path: 'products', component: ProductsPageComponent },
    {
        path: 'cart', component: CartComponent, canActivate: [LoggedGuard],
        children: [{
            path: 'product/:title', component: ProductComponent
        }]
    },
    { path: 'product/:title', component: ProductComponent },
    { path: 'log-in', component: LoginPageComponent },
    { path: 'add-edit', component: EditPageComponent, canActivate: [AdminGuard] },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: HomePageComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }