import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocalizationPipe } from './pipes/localization.pipe';
import { PermissionDirective } from './directives/permission.directive';
import { ProductComponent } from './components/product/product.component';

@NgModule({
  declarations: [
    LocalizationPipe,
    PermissionDirective,
    ProductComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LocalizationPipe,
    PermissionDirective
  ]
})
export class SharedModule { }
