import { Component, ViewChild, ElementRef } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {TranslateService} from '@ngx-translate/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { TableSearchComponent } from './app-components/table-search/table-search.component';
import { DialogService } from './services.ts/dialog.service';
import { SeoMainComponent } from './app-components/seo-main/seo-main.component';
import { ModalTreeComponent } from './app-components/modal-tree/modal-tree.component';
import { TableItem } from './models/tableItem';
import { forkJoin } from 'rxjs';
import { DataService } from './services.ts/data.service';
import { takeUntil } from 'rxjs/operators';
import { AtpResponseBase } from './models/AtpResponseBase';
import Swal from 'sweetalert2';
import { TreeNode } from './models/treeNode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private static readonly  USE_THEME_COOKIE_KEY = 'UseTheme';
  private static readonly  USE_LANGUAGE_COOKIE_KEY = 'UseLang';
  private static _dialogService: DialogService;

  @ViewChild('tableSearch') searchTable :TableSearchComponent;
  
  cssUrl: SafeResourceUrl;
  selectedTheme: Theme;
  selectedLanguageIso: string;
  public themes: Theme[] = [
    { name: 'Light', relUri: '/assets/css/themes/default.css' },
    { name: 'Metro', relUri: '/assets/css/themes/metro-dark.css' }
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
  }

  constructor(private sanitizer: DomSanitizer, private cookieService: CookieService, private _translate: TranslateService,  _dialogService: DialogService,private _dataService: DataService) {
    AppComponent._dialogService = _dialogService;
    this.selectedLanguageIso = this.cookieService.get(AppComponent.USE_LANGUAGE_COOKIE_KEY);
    if (!this.selectedLanguageIso) 
      this.selectedLanguageIso = 'en';
      
    _translate.setDefaultLang(this.selectedLanguageIso);
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    _translate.use(this.selectedLanguageIso);
  }

  ngOnInit(): void {
    let theme = this.cookieService.get(AppComponent.USE_THEME_COOKIE_KEY);
    if (theme) this.useDark = theme=='Metro';
    else this.useDark = false;

    this.searchTable.onSeoMainOpen.subscribe((item?: TableItem)=> {
      AppComponent._dialogService.open(SeoMainComponent, {
        function: (obj: SeoMainComponent)=> {
          
          //  emmiters
          obj.onNodesOpen.subscribe((node: TreeNode) => {
            AppComponent._dialogService.open(ModalTreeComponent, {
              function: (tree: ModalTreeComponent)=>{
                this._dataService.getNodes().subscribe(res => {tree.dataSource.data = res.data.items });
                tree.choosenNode = node;
                tree.onClose.subscribe((result: TreeNode)=>{
                  result.treeNodeId? obj.currentItem.treeNode = result: false;
                  AppComponent._dialogService.close('TreeNode');
                  debugger;
                })
                debugger;
              }
            }, 'TreeNode', '710px');
          })
          obj.onEdit.subscribe((item: TableItem)=>{
            this._dataService.edit(item).subscribe((res: AtpResponseBase) => (
              !res.error ?
                Swal.fire(
                  this._translate.instant('client_info_texts.edit_modal_title'),
                  this._translate.instant('client_info_texts.edited_successfully_title'),
                  'success') :
                Swal.fire(
                  this._translate.instant('client_info_texts.error_modal_title'),
                  this._translate.instant('client_info_texts.error_title'),
                  'error'),
                  this.searchTable.filterTable()
            ));
          })
          obj.onAdd.subscribe((item: TableItem)=>{
            this._dataService.set(item).subscribe((res: AtpResponseBase) => (!res.error ?
              Swal.fire(
                this._translate.instant('client_info_texts.add_modal_title'),
                this._translate.instant('client_info_texts.added_successfully_title'),
                'success') :
              Swal.fire(
                this._translate.instant('client_info_texts.error_modal_title'),
                this._translate.instant('client_info_texts.error_title'),
                'error')
                ,this.searchTable.filterTable()
            ));
          })
          obj.onClose.subscribe(()=>{
            AppComponent._dialogService.close('SeoMain');
          });
          

          //  fields
          {
            item? (obj.currentItem = item ): (obj.currentItem = new TableItem(), obj.currentItem.cmsContentType = 1),
            obj.categorySwipe = 'manufacturer';
            obj.isNew = item?false: true,

            forkJoin([this._dataService.getBrands(), this._dataService.getManu()]).subscribe(results => {
              if (results.length > 0) {
                obj.brands = results[0].data.items;
                obj.manus = results[1].data.items;

                obj.filteredBrands.next(obj.brands.slice());
                obj.filteredManus.next(obj.manus.slice());
              }
            });
            // if (obj.isNew)
            //   obj.currentItem.cmsContentType = 1;
            // else
            //   if (obj.currentItem.manufacturer.id)
            //     obj.getMG(false);

            obj.brandFilterCtrl.valueChanges.pipe(takeUntil(obj._onDestroy)).subscribe(() => {
              obj.filtering(obj.brands, obj.brandFilterCtrl.value, obj.filteredBrands);
            });
            obj.manuFilterCtrl.valueChanges.pipe(takeUntil(obj._onDestroy)).subscribe(() => {
              obj.filtering(obj.manus, obj.manuFilterCtrl.value, obj.filteredManus);
            });
          }
        }
      }, 'SeoMain', '800px');
    });

    this.searchTable.onRemove.subscribe((id: string)=>{
      Swal.fire({
        title: this._translate.instant('client_info_texts.removing_question_text'),
        text: this._translate.instant('client_info_texts.removing_details_text'),
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: this._translate.instant('button_texts.confirm_remove_button'),
        cancelButtonText: this._translate.instant('button_texts.cancel_remove_button')
      }).then((result) => {
        if (result.value) {
          this._dataService.delete(id).subscribe((res:AtpResponseBase) => !res.error?
            (this._dataService.get().subscribe(res => this.searchTable.dataSource.data = res.data.items),
            Swal.fire(
              this._translate.instant('client_info_texts.remove_modal_title'),
              this._translate.instant('client_info_texts.removed_successfully_title'),
              'success'
            )):
            Swal.fire(
              this._translate.instant('client_info_texts.error_modal_title'),
              this._translate.instant('client_info_texts.error_title'),
              'error'
            )); 
          
        } 
      })
    })
    
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
