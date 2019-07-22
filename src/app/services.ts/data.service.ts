import { Injectable } from '@angular/core';
import { TableItem } from '../models/tableItem';
import * as deepEqual from "deep-equal";
import { brandsDATA } from '../data/brands';
import { nodeDATA } from '../data/nodes';
import { manuDATA } from '../data/manu';
import { mgDATA } from '../data/mg';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  items: TableItem[] = [

    {
      Brand: "HERTH+BUSS JAKOPARTS",
      Node: "Ausgleichsbehälter Bremsflüssigkeit",
      Manufacturer: "BRANSON TRACTORS",
      Model_Group: "Supra",
      Id: "1",
      Target_URL: "category /HERTH+BUSS JAKOPARTS /BRANSON TRACTORS /Supra /Ausgleichsbehälter Bremsflüssigkeit",
      Memo: "area"
    },
    {
      Brand: "b-1 Bestprice",
      Node: "n-248 Bresscheibe",
      Manufacturer: "mg-1590 - A4",
      Model_Group: "",
      Id: "2",
      Target_URL: "search",
      Memo: "coment area"
    },
    {
      Brand: "ATEC GERMANY ",
      Node: "Abgasrohre",
      Manufacturer: "BELARUS",
      Model_Group: "FL II",
      Id: "3",
      Target_URL: "category /ATEC GERMANY /BELARUS /FL II /Abgasrohre",
      Memo: "area text"
    },
    {
      Brand: "LUCAS ELECTRICAL",
      Node: "Sekundärlufteinblasung",
      Manufacturer: "KIOTI",
      Model_Group: "FL III",
      Id: "4",
      Target_URL: "search /LUCAS ELECTRICAL /KIOTI /FL III /Sekundärlufteinblasung",
      Memo: "area text"
    },
    {
      Brand: "ATEC GERMANY ",
      Node: "Abgasrohre",
      Manufacturer: "BELARUS",
      Model_Group: "FL II",
      Id: "6",
      Target_URL: "search /ATEC GERMANY /BELARUS /FL II /Abgasrohre",
      Memo: "area text"
    },
    {
      Brand: "LUCAS ELECTRICAL",
      Node: "Sekundärlufteinblasung",
      Manufacturer: "KIOTI",
      Model_Group: "Discovery IV",
      Id: "5",
      Target_URL: "search /LUCAS ELECTRICAL /KIOTI /FL III /Sekundärlufteinblasung",
      Memo: "area text"
    }
  ];
  //  [new TableItem("b-1 Bestprice" ,"n-248 Bresscheibe" ,"mg-1590 - A4" ,"" ,"search"), new TableItem("Best" ,  "!!" ,  "@@" ,  "##" , "$$"),new TableItem("b-1 Bestprice" , "n-248 Bresscheibe" , "mg-1590 - A4" ,"" , "search")];

  constructor() {
  }


  get(): TableItem[] {
    return this.items;
  }

  set(itemForSet: TableItem) {
    this.items.push(itemForSet);
  }

  edit(itemForEdit: TableItem) {
    this.items[this.items.indexOf(this.items.find(item => item.Id == itemForEdit.Id))] = itemForEdit;
  }

  delete(id: string) {
    this.items = this.items.filter(item => item.Id != id.toString());
  }

  getBrands(): string[] {
    return brandsDATA;
  }

  getNodes(): string[] {
    return nodeDATA;
  }
  getManu(): string[] {
    return manuDATA;
  }

  getMg(key: string): string[] {
    return mgDATA;
  }

}
