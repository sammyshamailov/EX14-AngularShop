import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AdminGuard } from './guards/admin.guard';
import { LoggedGuard } from './guards/logged.guard';
import { OutFromFormGuard } from './guards/out-from-form.guard';
import { LogInterceptor } from './interceptors/log';
import { CartService } from './services/cart.service';
import { LocalizationService } from './services/localization.service';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LogInterceptor, multi: true },
    AdminGuard,
    LoggedGuard,
    OutFromFormGuard,
    CartService,
    LocalizationService,
    UserService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
      if (parentModule) {
          throw new Error(`CoreModule has already been loaded. Import core modules in AppModule only.`);
      }
  }
}
