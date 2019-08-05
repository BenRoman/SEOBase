import { Component } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private static readonly  USE_LANGUAGE_COOKIE_KEY = 'UseLang';

  selectedLanguageIso: string;

  constructor(private cookieService: CookieService, private _translate: TranslateService) {
   
    this.selectedLanguageIso = this.cookieService.get(AppComponent.USE_LANGUAGE_COOKIE_KEY);
    if (!this.selectedLanguageIso) this.selectedLanguageIso = 'en';
    _translate.setDefaultLang(this.selectedLanguageIso);
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    _translate.use(this.selectedLanguageIso);
  }

  setLanguage(languageIso: string) {
    this.selectedLanguageIso = languageIso;
    this._translate.use(languageIso);
    this.cookieService.set(AppComponent.USE_LANGUAGE_COOKIE_KEY, languageIso, 365);
  }
}
