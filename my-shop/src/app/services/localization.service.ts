import { Injectable } from '@angular/core';
import languagesData from '../../assets/static/language.json'

interface ILanguage {
  "Home": string;
  "Cart": string;
  "Products": string;
  "Log In": string;
  "Log Out": string;
  "Add/Edit": string;
  "About": string;
  "Contact": string;
}

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {
  private currentLang: string = "EN";
  get currLanguage() { return this.currentLang; };

  constructor() { }

  /**
   * Changes current language.
   * @param lang The selected language.
   */
  changeLang(lang: string) {
    this.currentLang = lang;
  }

  /**
   * Returns translation of word.
   * @param word The desired word.
   * @param lang The desired language.
   * @returns Translation of the word.
   */
  getTranslation(word: string, lang: string): string {
    return languagesData[lang][word];
  }
}
