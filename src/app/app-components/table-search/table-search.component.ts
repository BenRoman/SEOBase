import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SeoMainComponent } from '../seo-main/seo-main.component';
import { TableItem } from 'src/app/models/tableItem';
import { DataService } from 'src/app/services.ts/data.service';
import Swal, {SweetAlertType} from 'sweetalert2';
import 'rxjs';
import {TranslateService} from '@ngx-translate/core';

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

  constructor(public SEOmainDataDialog: MatDialog , public _dataService : DataService , private _translationService: TranslateService) { }

  ngOnInit() {
    this._dataService.get().subscribe(res =>{ this.dataSource.data = res.data.items })
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this._translationService.stream('labels_and_placeholders.items_per_page_mat_info').subscribe(res=>{
      this.dataSource.paginator._intl.itemsPerPageLabel = res;
      this.dataSource.filter = '';
    })
  }

  tableFilter(){
    this._dataService.get().subscribe(res => this.dataSource.data = res.data.items.filter(item => (item.modelGroup.name.includes(this.keyWord) || item.displayBrand.name.includes(this.keyWord) || item.treeNode.name.includes(this.keyWord) || item.manufacturer.name.includes(this.keyWord) )));
  }

  openSEOmain(id: number){
    var tmp:TableItem = this.dataSource.data.find(item=>item.id === id);
    console.log(tmp);
    console.log(this.dataSource.data);
    const dialogRef = this.SEOmainDataDialog.open(SeoMainComponent, {
      width: '800px',
      disableClose: true,
      data: { item : tmp ? tmp : null  }
    });
    dialogRef.afterClosed().subscribe(w => this.tableFilter());
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
        Swal.fire(
          this._translationService.instant('client_info_texts.remove_modal_title'),
          this._translationService.instant('client_info_texts.removed_successfully_title'),
          'success'
        );
        // this._dataService.delete(id); //TODO
        this.dataSource.data = this._dataService.get();
      } 
    })
  }

}
