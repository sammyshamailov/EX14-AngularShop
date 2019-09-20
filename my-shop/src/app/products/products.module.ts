import { NgModule } from '@angular/core';
import { ProductsPageComponent } from './components/products-page/products-page.component';
import { CategoryChoiceComponent } from './components/category-choice/category-choice.component';
import { SharedModule } from '../shared/shared.module';
import { ProductsRoutingModule } from './products-routing.module';
import { EditPageComponent } from './components/edit-page/edit-page.component';

@NgModule({
  declarations: [
    ProductsPageComponent,
    CategoryChoiceComponent,
    EditPageComponent
  ],
  imports: [
    SharedModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
