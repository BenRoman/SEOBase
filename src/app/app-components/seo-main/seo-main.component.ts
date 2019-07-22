import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSelect } from '@angular/material';
import { DataService } from 'src/app/services.ts/data.service';
import { TableItem } from 'src/app/models/tableItem';
import { FormControl } from '@angular/forms';
import { Subject, ReplaySubject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import Swal, {SweetAlertType} from 'sweetalert2';
import 'rxjs';

@Component({
  selector: 'seo-main',
  templateUrl: './seo-main.component.html',
  styleUrls: ['./seo-main.component.css']
})
export class SeoMainComponent implements OnInit {


  public brandFilterCtrl: FormControl = new FormControl();
  public nodeFilterCtrl: FormControl = new FormControl();
  public manuFilterCtrl: FormControl = new FormControl();
  public mgFilterCtrl: FormControl = new FormControl();

  public filteredBrands: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  public filteredNodes: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  public filteredManus: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  public filteredMgs: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);

  @ViewChild('linkElement') singleSelect;

  protected _onDestroy = new Subject<void>();
  
  private currentItem:TableItem  = new TableItem();
  private targetURL:string ;
  public categorySwipe: string;
  public isNew: boolean = true;
  public validation: boolean = true;
  public inValids: string[] = [];
  public brands :string[] ;
  public nodes :string[] ;
  public manus :string[] ;
  public mgs :string[] ;

  constructor(public dialogRef: MatDialogRef<SeoMainComponent>,@Inject(MAT_DIALOG_DATA) public data: any , public _dataService :DataService) { 
    if (data.item){
      this.currentItem = data.item;
      this.isNew = false;
    }
  }

  ngOnInit() {
    this.targetURL = 'search';
    this.brands = this._dataService.getBrands();
    this.nodes = this._dataService.getNodes();
    this.manus = this._dataService.getManu();
    
    if(!this.isNew)
      this.getMG(this.currentItem.Manufacturer);

    this.filteredBrands.next(this.brands.slice());
    this.filteredNodes.next(this.nodes.slice());
    this.filteredManus.next(this.manus.slice());

    this.brandFilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
        this.filtering(this.brands , this.brandFilterCtrl.value , this.filteredBrands);
      });
    this.nodeFilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
        this.filtering(this.nodes , this.nodeFilterCtrl.value , this.filteredNodes);
      });

    this.manuFilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
        this.filtering(this.manus , this.manuFilterCtrl.value , this.filteredManus);
      });

    
  


  }

  getMG(key:string){
    this.mgs = this._dataService.getMg(key);

    this.filteredMgs.next(this.mgs.slice());
    this.mgFilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
      this.filtering(this.mgs, this.mgFilterCtrl.value , this.filteredMgs);
    });
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  filtering(array :any[] , search :string , filtered:any) {
    if (!array) {
      return;
    }
    if (!search) {
      filtered.next(array.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    filtered.next(
      array.filter(array => array.toLowerCase().indexOf(search) > -1)
    );
  }

  qwe(){
    console.log(this.targetURL);
    console.log(this.categorySwipe);
  }

  close(): void {
    this.dialogRef.close();
  }
  

  validator(){
    this.inValids = [];
    var isNewItem = 0;
    ['Brand' , 'Manufacturer', 'Node', 'Model_Group'].forEach(prop => {
      if (this.currentItem[prop] == " " )
        this.inValids.push(prop);
      if (this.currentItem[prop] == "" )
        isNewItem++;
        
    });
    if(isNewItem == 4 )
      this.inValids.push("Can not be empty");
  }
  
  addNewItem(){
    this.validator();
    if ( this.inValids.length == 0 ){
      this.currentItem.Target_URL = this.singleSelect.nativeElement.innerText;
      if(this.isNew)
        this._dataService.set(this.currentItem);
      else
        this._dataService.edit(this.currentItem);
      this.close();
    }
  }

  preview(){
    Swal.fire(this.currentItem.Target_URL);
  }
}
