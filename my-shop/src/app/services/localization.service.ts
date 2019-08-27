import { Injectable } from '@angular/core';
import languagesData from '../../assets/static/language.json'

interface ILanguage {
  "Home": string;
  "Cart": string;
  "Products": string;
  "LogIn": string;
  "LogOut": string;
  "Admin": string;
  "About": string;
  "Contact": string;
}

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {
  private currentLang: ILanguage;
  get language(){ return this.currentLang };

  constructor() {
    this.currentLang = languagesData.EN;
  }

  changeLang(lang: string) {
    this.currentLang = null;
    console.log("enterd changeLang: ", lang);
    if (lang === "EN")
      this.currentLang = languagesData.EN;
    else if (lang === "ES")
      this.currentLang = languagesData.ES;
    else if (lang === "RU")
      this.currentLang = languagesData.RU;
    else{
      this.currentLang = languagesData.HE;
    }
    console.log(this.currentLang);
  }
}
