import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LogInterceptor } from './interceptors/log';
import { SharedModule } from '../shared/shared.module';
import { AdminGuard } from './guards/admin.guard';
import { LoggedGuard } from './guards/logged.guard';
import { OutFromFormGuard } from './guards/out-from-form.guard';

@NgModule({
  declarations: [],
  imports: [
    SharedModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LogInterceptor, multi: true },
    AdminGuard,
    LoggedGuard,
    OutFromFormGuard
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
      if (parentModule) {
          throw new Error(`CoreModule has already been loaded. Import core modules in AppModule only.`);
      }
  }
}
