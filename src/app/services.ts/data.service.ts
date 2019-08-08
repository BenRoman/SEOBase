import { Injectable } from '@angular/core';
import { TableItem } from '../models/tableItem';
import * as deepEqual from "deep-equal";
import { brandsDATA } from '../data/brands';
import { nodeDATA } from '../data/nodes';
import { manuDATA } from '../data/manu';
import { mgDATA } from '../data/mg';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SeoContentBaseService } from './seo-content-base.service';
import { SelectItem } from '../models/selectItem';

@Injectable({
  providedIn: 'root'
})
export class DataService extends SeoContentBaseService {

  
  private static _seoContentGetUrl = 'seocontent';

  // items: TableItem[] = [

  //   {
  //     Brand: "HERTH+BUSS JAKOPARTS",
  //     Node: "Ausgleichsbehälter Bremsflüssigkeit",
  //     Manufacturer: "BRANSON TRACTORS",
  //     Model_Group: "Supra",
  //     Id: "1",
  //     Target_URL: "category /HERTH+BUSS JAKOPARTS /BRANSON TRACTORS /Supra /Ausgleichsbehälter Bremsflüssigkeit",
  //     Memo: "area"
  //   },
  //   {
  //     Brand: "b-1 Bestprice",
  //     Node: "n-248 Bresscheibe",
  //     Manufacturer: "mg-1590 - A4",
  //     Model_Group: "",
  //     Id: "2",
  //     Target_URL: "search",
  //     Memo: "coment area"
  //   },
  //   {
  //     Brand: "ATEC GERMANY ",
  //     Node: "Abgasrohre",
  //     Manufacturer: "BELARUS",
  //     Model_Group: "FL II",
  //     Id: "3",
  //     Target_URL: "category /ATEC GERMANY /BELARUS /FL II /Abgasrohre",
  //     Memo: "area text"
  //   },
  //   {
  //     Brand: "LUCAS ELECTRICAL",
  //     Node: "Sekundärlufteinblasung",
  //     Manufacturer: "KIOTI",
  //     Model_Group: "FL III",
  //     Id: "4",
  //     Target_URL: "search /LUCAS ELECTRICAL /KIOTI /FL III /Sekundärlufteinblasung",
  //     Memo: "area text"
  //   },
  //   {
  //     Brand: "ATEC GERMANY ",
  //     Node: "Abgasrohre",
  //     Manufacturer: "BELARUS",
  //     Model_Group: "FL II",
  //     Id: "6",
  //     Target_URL: "search /ATEC GERMANY /BELARUS /FL II /Abgasrohre",
  //     Memo: "area text"
  //   },
  //   {
  //     Brand: "LUCAS ELECTRICAL",
  //     Node: "Sekundärlufteinblasung",
  //     Manufacturer: "KIOTI",
  //     Model_Group: "Discovery IV",
  //     Id: "5",
  //     Target_URL: "search /LUCAS ELECTRICAL /KIOTI /FL III /Sekundärlufteinblasung",
  //     Memo: "area text"
  //   }
  // ];
  //  [new TableItem("b-1 Bestprice" ,"n-248 Bresscheibe" ,"mg-1590 - A4" ,"" ,"search"), new TableItem("Best" ,  "!!" ,  "@@" ,  "##" , "$$"),new TableItem("b-1 Bestprice" , "n-248 Bresscheibe" , "mg-1590 - A4" ,"" , "search")];

  constructor(protected http : HttpClient) {
    super(http);
  }

  get():any{
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get( this.getUrl(DataService._seoContentGetUrl) , {headers:headers});
    // return this.items;
  }

  // set(itemForSet: TableItem) {
  //   this.items.push(itemForSet);
  // }

  // edit(itemForEdit: TableItem) {
  //   this.items[this.items.indexOf(this.items.find(item => item.id == itemForEdit.id))] = itemForEdit;
  // }

  // delete(id: string) {
  //   this.items = this.items.filter(item => item.id != id.toString());
  // }

  getBrands(): any {
    // return brandsDATA;
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get( this.getUrl(DataService._seoContentGetUrl + '/brands') , {headers:headers});

  }

  getNodes(): any{
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get( this.getUrl(DataService._seoContentGetUrl + '/nodes') , {headers:headers});
    // return nodeDATA;
  }
  getManu(): any {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get( this.getUrl(DataService._seoContentGetUrl + '/manufacturer') , {headers:headers});
    // return manuDATA;
  }

  getMg(key: number): any {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get( this.getUrl(DataService._seoContentGetUrl + '/model_groups/' + key) , {headers:headers});
    // return mgDATA;
  }

}
