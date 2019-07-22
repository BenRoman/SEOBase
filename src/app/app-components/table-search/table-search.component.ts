import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SeoMainComponent } from '../seo-main/seo-main.component';
import { TableItem } from 'src/app/models/tableItem';
import { DataService } from 'src/app/services.ts/data.service';
import Swal, {SweetAlertType} from 'sweetalert2';
import 'rxjs';

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

  constructor(public SEOmainDataDialog: MatDialog , public _dataService : DataService) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<TableItem>(this._dataService.get());
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  tableFilter(){
    this.dataSource.data = this._dataService.get().filter(item => (item.Model_Group.includes(this.keyWord) || item.Brand.includes(this.keyWord) || item.Node.includes(this.keyWord) || item.Manufacturer.includes(this.keyWord) ));
  }

  openSEOmain(id: number){
    var tmp:TableItem = this.dataSource.data.find(item=>item.Id === id.toString());;
    const dialogRef = this.SEOmainDataDialog.open(SeoMainComponent, {
      width: '800px',
      disableClose: true,
      data: { item : tmp ? tmp : null  }
    });
    dialogRef.afterClosed().subscribe(w => this.tableFilter());
  }



  removeItem(id:string){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this item!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your item has been deleted.',
          'success'
        );
        this._dataService.delete(id);
        this.dataSource.data = this._dataService.get();
      } 
    })
  }

}
