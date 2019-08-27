import { Pipe, PipeTransform } from '@angular/core';
import { LocalizationService } from '../services/localization.service';

@Pipe({
  name: 'localization',
  pure: false
})
export class LocalizationPipe implements PipeTransform {

  constructor(private localizationService: LocalizationService){}

  transform(value: any, ...args: any[]): any {
    return this.localizationService.language[value];
  }

}
