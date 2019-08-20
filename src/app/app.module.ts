import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MaterialModule } from './material-module';
import { SeoMainComponent } from './app-components/seo-main/seo-main.component';
import { TableSearchComponent } from './app-components/table-search/table-search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {NgxFlagIconCssModule} from 'ngx-flag-icon-css';
import {CookieService} from 'ngx-cookie-service';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import { ModalTreeComponent } from './app-components/modal-tree/modal-tree.component';
import { NgHighlightModule } from 'ngx-text-highlight';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    SeoMainComponent,
    TableSearchComponent,
    ModalTreeComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgxFlagIconCssModule,
    NgHighlightModule
  ],
  entryComponents: [SeoMainComponent , ModalTreeComponent],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
