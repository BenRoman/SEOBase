import { Component } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {TranslateService} from '@ngx-translate/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private static readonly  USE_THEME_COOKIE_KEY = 'UseTheme';
  private static readonly  USE_LANGUAGE_COOKIE_KEY = 'UseLang';
  
  cssUrl: SafeResourceUrl;
  selectedTheme: Theme;
  selectedLanguageIso: string;
  public themes: Theme[] = [
    { name: 'Light', relUri: 'src/styles.css' },
    { name: 'Metro', relUri: 'src/styles.css' }
  ];

  private _useDark: boolean;
  get useDark(): boolean {
    return this._useDark;
  }
  set useDark(value: boolean) {
    this._useDark = value;
    this.selectedTheme = value?this.themes[1]:this.themes[0];
    this.cssUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.selectedTheme.relUri);
    this.cookieService.set(AppComponent.USE_THEME_COOKIE_KEY, this.selectedTheme.name, 7);
    console.log(this.cssUrl);
  }

  constructor(private sanitizer: DomSanitizer, private cookieService: CookieService, private _translate: TranslateService) {
    this.selectedLanguageIso = this.cookieService.get(AppComponent.USE_LANGUAGE_COOKIE_KEY);
    if (!this.selectedLanguageIso) this.selectedLanguageIso = 'en';
    _translate.setDefaultLang(this.selectedLanguageIso);
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    _translate.use(this.selectedLanguageIso);
  }

  ngOnInit(): void {
    let theme = this.cookieService.get(AppComponent.USE_THEME_COOKIE_KEY);
    if (theme) this.useDark = theme=='Metro';
    else this.useDark = false;
  }

  setLanguage(languageIso: string) {
    this.selectedLanguageIso = languageIso;
    this._translate.use(languageIso);
    this.cookieService.set(AppComponent.USE_LANGUAGE_COOKIE_KEY, languageIso, 365);
  }
}


export interface Theme {
  name: string;
  relUri: string;
}
