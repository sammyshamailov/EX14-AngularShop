import { Pipe, PipeTransform } from '@angular/core';

import { LocalizationService } from '../services/localization.service';
import { ILanguage } from 'src/models/ilanguage';

@Pipe({
  name: 'localization'
})
export class LocalizationPipe implements PipeTransform {
  currentLang: ILanguage[];

  constructor(private localizationService: LocalizationService){
    // this.localizationService.languagesObserv.subscribe(language => this.currentLang = language)
  }

  transform(word: string, lang: string): string {
    // return this.currentLang[word];
    return this.localizationService.getTranslation(word, lang);
  }

}
