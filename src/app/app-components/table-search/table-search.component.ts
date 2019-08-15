import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort, Sort } from '@angular/material';
import { SeoMainComponent } from '../seo-main/seo-main.component';
import { TableItem } from 'src/app/models/tableItem';
import { DataService } from 'src/app/services.ts/data.service';
import Swal, {SweetAlertType} from 'sweetalert2';
import 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import { AtpResponseBase } from 'src/app/models/AtpResponseBase';

@Component({
  selector: 'table-search',
  templateUrl: './table-search.component.html',
  styleUrls: ['./table-search.component.css']
})
export class TableSearchComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['Target','Brand', 'Node', 'Manufacturer', 'Model_Group', 'Target_URL', 'Action'];
  itemsPerPage: number[] = [5, 25, 100];
  dataSource = new MatTableDataSource<TableItem>();
  keyWord:string = "";
  seoLoading:boolean = true;
  constructor(public SEOmainDataDialog: MatDialog , public _dataService : DataService , private _translationService: TranslateService) { }

  ngOnInit() {
    this._dataService.get().subscribe(res =>{ 
      this.dataSource.data = res.data.items
      this.seoLoading = false
    })
    this.dataSource.paginator = this.paginator;
    this._translationService.stream('labels_and_placeholders.items_per_page_mat_info').subscribe(res=>{
      this.dataSource.sort = this.sort;
      this.dataSource.paginator._intl.itemsPerPageLabel = res;
      this.dataSource.filter = '';
    })
  }

  tableFilter(){
    this._dataService.get().subscribe(res => this.dataSource.data = res.data.items.filter(item => (
      ( item.modelGroup.name?item.modelGroup.name.toLowerCase().includes(this.keyWord.toLowerCase()) : false ) || 
      ( item.displayBrand.name?item.displayBrand.name.toLowerCase().includes(this.keyWord.toLowerCase()) : false ) || 
      ( item.treeNode.name?item.treeNode.name.toLowerCase().includes(this.keyWord.toLowerCase()) : false ) || 
      ( item.manufacturer.name?item.manufacturer.name.toLowerCase().includes(this.keyWord.toLowerCase()) : false)
    )));
  }

  openSEOmain(id: number){
    var tmp:TableItem = this.dataSource.data.find(item=>item.id === id);
    const dialogRef = this.SEOmainDataDialog.open(SeoMainComponent, {
      width: '800px',
      disableClose: true,
      data: { item : tmp }
    });
    dialogRef.afterClosed().subscribe(w =>( this.tableFilter() ));
  }

  sortData(sort: Sort) {
    // const data = this.dataSource.data.slice();
    // if (!sort.active || sort.direction === '') {
    //   this.dataSource.data = data;
    //   return;
    // }

    this.dataSource.data = this.dataSource.data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'brand': return compare(a.displayBrand.name, b.displayBrand.name, isAsc);
        case 'node': return compare(a.treeNode.name, b.treeNode.name, isAsc);
        case 'manu': return compare(a.manufacturer.name, b.manufacturer.name, isAsc);
        case 'mg': return compare(a.modelGroup.name, b.modelGroup.name, isAsc);
        
        default: return 0;
      }
    });
    function compare(a: number | string, b: number | string, isAsc: boolean) {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
  }




  removeItem(id:string){
    Swal.fire({
      title: this._translationService.instant('client_info_texts.removing_question_text'),
      text: this._translationService.instant('client_info_texts.removing_details_text'),
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: this._translationService.instant('button_texts.confirm_remove_button'),
      cancelButtonText: this._translationService.instant('button_texts.cancel_remove_button')
    }).then((result) => {
      if (result.value) {
        this._dataService.delete(id).subscribe((res:AtpResponseBase) => !res.error?
          (this._dataService.get().subscribe(res => this.dataSource.data = res.data.items),
          Swal.fire(
            this._translationService.instant('client_info_texts.remove_modal_title'),
            this._translationService.instant('client_info_texts.removed_successfully_title'),
            'success'
          )):
          Swal.fire(
            this._translationService.instant('client_info_texts.error_modal_title'),
            this._translationService.instant('client_info_texts.error_title'),
            'error'
          )); 
        
      } 
    })
  }

}
