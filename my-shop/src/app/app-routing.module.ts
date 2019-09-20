import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutPageComponent } from './components/about-page/about-page.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';
import { ErrorNotFoundComponent } from './components/error-not-found/error-not-found.component';
import { HomePageComponent } from './components/home-page/home-page.component';


//This is my case 
const routes: Routes = [
    { path: 'home', component: HomePageComponent },
    { path: 'about', component: AboutPageComponent },
    { path: 'contact', component: ContactPageComponent },
    { 
        path: 'cart',
        loadChildren: () => import('./cart/cart.module').then(m => m.CartModule)
    },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: ErrorNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }