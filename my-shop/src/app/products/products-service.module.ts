import { NgModule, Optional, SkipSelf } from '@angular/core';
import { DataService } from './services/data.service';

@NgModule({
    providers: [ DataService ]
})
export class ProductsServiceModule {
    constructor(@Optional() @SkipSelf() parentModule: ProductsServiceModule) {
        if (parentModule) {
            throw new Error(`ProductsServiceModule has already been loaded. Import core modules in AppModule only.`);
        }
    }
}
