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

  private static _seoContentGetBrandsUrl = '/brands';
  private static _seoContentGetNodesUrl = '/nodes';
  private static _seoContentGetManusUrl = '/manufacturers';
  private static _seoContentGetMgsUrl = '/model_groups';

  private static _seoTableItemUrl = '/tables';


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
    return this.http.get( this.getUrl(DataService._seoContentGetUrl + DataService._seoTableItemUrl) , {headers:headers});
  }

  set(itemForSet: TableItem) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.getUrl(DataService._seoContentGetUrl + DataService._seoTableItemUrl), JSON.stringify(
      {
        Id : itemForSet.id ,
        CMSId : itemForSet.cmsContentId , 
        CMSType : itemForSet.cmsContentType , 
        ManuId : itemForSet.manufacturer.id , 
        MGId : itemForSet.modelGroup.id , 
        BrandId : itemForSet.displayBrand.id , 
        NodeId : itemForSet.treeNode.treeNodeId , 
        Memo : itemForSet.memo
      }), {headers: headers});
  }

  edit(itemForEdit: TableItem) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put(this.getUrl(DataService._seoContentGetUrl + DataService._seoTableItemUrl), JSON.stringify(
      {
        Id : itemForEdit.id ,
        CMSId : itemForEdit.cmsContentId , 
        CMSType : itemForEdit.cmsContentType , 
        ManuId : itemForEdit.manufacturer.id , 
        MGId : itemForEdit.modelGroup.id , 
        BrandId : itemForEdit.displayBrand.id , 
        NodeId : itemForEdit.treeNode.treeNodeId , 
        Memo : itemForEdit.memo
      }), {headers: headers});
  }

  delete(id: string) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.delete(this.getUrl(DataService._seoContentGetUrl + DataService._seoTableItemUrl + "/" + id) , {headers: headers});
    // this.items = this.items.filter(item => item.id != id.toString());
  }

  getBrands(): any {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get( this.getUrl(DataService._seoContentGetUrl + DataService._seoContentGetBrandsUrl) , {headers:headers});

  }

  getNodes(): any{
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get( this.getUrl(DataService._seoContentGetUrl + DataService._seoContentGetNodesUrl) , {headers:headers});
  }
  getManu(): any {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get( this.getUrl(DataService._seoContentGetUrl + DataService._seoContentGetManusUrl) , {headers:headers});
  }

  getMg(key: number): any {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get( this.getUrl(DataService._seoContentGetUrl + DataService._seoContentGetMgsUrl + '/'+ key) , {headers:headers});
  }

}
