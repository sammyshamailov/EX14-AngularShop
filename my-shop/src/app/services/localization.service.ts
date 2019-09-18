import { Injectable } from '@angular/core';
import languagesData from '../../assets/static/language.json'
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { ILanguage } from '../../models/ilanguage'

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {
  private currentLang: string = "EN";
  get currLanguage() { return this.currentLang; };

  private _languages = new BehaviorSubject(null);
  public readonly languagesObserv: Observable<ILanguage> = this._languages.asObservable();
  private languages: ILanguage[] = [];

  constructor(private http: HttpClient) {
    this.loadLanguages();
   }

  /**
   * Gets the products data and changes it accordingly.
   * @returns promise representation of the products list.
   */
  private getLanguagesPromise(): Promise<ILanguage[]> {
    return this.http.get('../../assets/static/language.json')
      .pipe(
        map(json => json as ILanguage[])
      )
      .toPromise()
      .catch(error => Promise.reject('error'));
  }

  /**
   * Loads products into the BehaviorSubject variable.
   */
  private loadLanguages() {
    this.getLanguagesPromise()
      .then((o) => {
        this.languages = o;
        this._languages.next(this.languages[this.currentLang]);
        console.log(this._languages);
      });
  }

  changeLang(lang: string) {
    this.currentLang = lang;
    this._languages.next(this.languages[this.currentLang]);
    console.log(this._languages);
  }

  getTranslation(word: string, lang: string): string {
    let translatedWord: string;
    this.languagesObserv.subscribe(language => {
      translatedWord = language[word];
    });
    console.log(translatedWord);
    return translatedWord;
    // return languagesData[lang][word];
  }
}
