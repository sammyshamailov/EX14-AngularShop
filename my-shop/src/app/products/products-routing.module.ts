import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsPageComponent } from './components/products-page/products-page.component';
import { ProductComponent } from '../shared/components/product/product.component';
import { EditPageComponent } from './components/edit-page/edit-page.component';
import { AdminGuard } from '../core/guards/admin.guard';
import { OutFromFormGuard } from '../core/guards/out-from-form.guard';


//This is my case 
const routes: Routes = [
    { path: 'products', component: ProductsPageComponent },
    { path: 'product/:title', component: ProductComponent },
    { path: 'add-edit', component: EditPageComponent, canActivate: [AdminGuard], canDeactivate: [OutFromFormGuard] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductsRoutingModule { }
