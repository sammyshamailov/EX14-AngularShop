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
import { OutFromFormGuard } from './guards/out-from-form.guard';
import { ErrorNotFoundComponent } from './components/error-not-found/error-not-found.component';


//This is my case 
const routes: Routes = [
    { path: 'home', component: HomePageComponent, data: { animation: 'Home' } },
    { path: 'about', component: AboutPageComponent, data: { animation: 'About' } },
    { path: 'contact', component: ContactPageComponent, data: { animation: 'Contact' } },
    { path: 'products', component: ProductsPageComponent, data: { animation: 'Products' } },
    {
        path: 'cart', component: CartComponent, canActivate: [LoggedGuard],
        children: [{
            path: 'product/:title', component: ProductComponent, data: { animation: 'Product' }
        }]
    },
    { path: 'product/:title', component: ProductComponent, data: { animation: 'Product' } },
    { path: 'log-in', component: LoginPageComponent, data: { animation: 'LogIn' } },
    { path: 'add-edit', component: EditPageComponent, canActivate: [AdminGuard], canDeactivate: [OutFromFormGuard], data: { animation: 'Admin' } },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: ErrorNotFoundComponent, data: { animation: 'NotFound' } }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }