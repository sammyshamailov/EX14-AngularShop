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

  changeLang(lang: string) {
    this.currentLang = lang;
  }

  getWord(word: string): string { 
    return languagesData[this.currentLang][word]; 
  }

  getTranslation(word: string, lang: string): string {
    return languagesData[lang][word];
  }
}
