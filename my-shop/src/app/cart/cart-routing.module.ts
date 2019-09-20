import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CartComponent } from './components/cart/cart.component';
import { ProductComponent } from '../shared/components/product/product.component';
import { LoggedGuard } from '../core/guards/logged.guard';

const routes: Routes = [
    {
        path: '', component: CartComponent, canActivate: [LoggedGuard],
        children: [{
            path: 'product/:title', component: ProductComponent
        }]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CartRoutingModule { }