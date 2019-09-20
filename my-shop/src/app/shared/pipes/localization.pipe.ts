import { Pipe, PipeTransform } from '@angular/core';

import { LocalizationService } from 'src/app/core/services/localization.service';

@Pipe({
  name: 'localization'
})
export class LocalizationPipe implements PipeTransform {

  constructor(private localizationService: LocalizationService){}

  transform(word: string, lang: string): string {
    return this.localizationService.getTranslation(word, lang);
  }

}
