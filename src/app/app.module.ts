import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MaterialModule } from './material-module';
import { SeoMainComponent } from './app-components/seo-main/seo-main.component';
import { TableSearchComponent } from './app-components/table-search/table-search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@NgModule({
  declarations: [
    AppComponent,
    SeoMainComponent,
    TableSearchComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [SeoMainComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
