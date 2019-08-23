import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSelect, MatDialog } from '@angular/material';
import { DataService } from 'src/app/services.ts/data.service';
import { TableItem } from 'src/app/models/tableItem';
import { FormControl } from '@angular/forms';
import { Subject, ReplaySubject, forkJoin } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import Swal, {SweetAlertType} from 'sweetalert2';
import 'rxjs';
import { SelectItem } from 'src/app/models/selectItem';
import { AtpResponseBase } from 'src/app/models/AtpResponseBase';
import { TranslateService } from '@ngx-translate/core';
import { TreeNode } from 'src/app/models/treeNode';
import { ModalTreeComponent } from '../modal-tree/modal-tree.component';

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

  public filteredBrands: ReplaySubject<SelectItem[]> = new ReplaySubject<SelectItem[]>(1);
  public filteredNodes: ReplaySubject<TreeNode[]> = new ReplaySubject<TreeNode[]>(1);
  public filteredManus: ReplaySubject<SelectItem[]> = new ReplaySubject<SelectItem[]>(1);
  public filteredMgs: ReplaySubject<SelectItem[]> = new ReplaySubject<SelectItem[]>(1);

  protected _onDestroy = new Subject<void>();
  
  private currentItem:TableItem  = new TableItem();
  public categorySwipe: string;
  public isNew: boolean = true;
  public inValids: string[] = [];

  public brands :SelectItem[] ;
  public manus :SelectItem[] ;
  public mgs :SelectItem[] ;
 
  constructor(public dialog:MatDialog, public dialogRef: MatDialogRef<SeoMainComponent>,@Inject(MAT_DIALOG_DATA) public data: any , public _dataService :DataService , public _translationService : TranslateService) { 
    if (data.item){
      this.currentItem = data.item;
      this.isNew = false;
    }
  }

  ngOnInit() {
    forkJoin([this._dataService.getBrands(), this._dataService.getManu()]).subscribe(results => {
      if (results.length > 0) {
        this.brands = results[0].data.items;
        // this.nodes = results[1].data.items;
        this.manus = results[1].data.items;

        this.filteredBrands.next(this.brands.slice());
        // this.filteredNodes.next(this.nodes.slice());
        this.filteredManus.next(this.manus.slice());
      }
    });
    // this.brands = this._dataService.getBrands().subscribe(res => { 
    //   this.brands = res.data.items 
    //   console.log("brands"+ this.brands.length)
    //  
    // } );
    // this.nodes = this._dataService.getNodes().subscribe(res =>{
    //   this.nodes = res.data.items
    //   console.log("nodes"+ this.nodes.length)
    //   this.filteredNodes.next(this.nodes.slice());
    // });
    // this.manus = this._dataService.getManu().subscribe(res =>{
    //   this.manus = res.data.items
    //   console.log("manu"+ this.manus.length)
    //   this.filteredManus.next(this.manus.slice());
    // });
    
    if(this.isNew)
      this.currentItem.cmsContentType = 1;
    else
      if (this.currentItem.manufacturer.id)
        this.getMG(false);
        
    this.categorySwipe = 'manufacturer';

    this.brandFilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
        this.filtering(this.brands , this.brandFilterCtrl.value , this.filteredBrands);
      });
    // this.nodeFilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
    //     this.filtering(this.nodes , this.nodeFilterCtrl.value , this.filteredNodes);
    //   });

    this.manuFilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
        this.filtering(this.manus , this.manuFilterCtrl.value , this.filteredManus);
      });
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  compareObjects(o1: SelectItem, o2: SelectItem): boolean {
    return o1.name === o2.name && o1.id === o2.id;
  }

  openDialog(){

    const dialogRef = this.dialog.open(ModalTreeComponent, {
      width: '710px',
      disableClose: true,
      data: this.currentItem.treeNode
    });

    dialogRef.afterClosed().subscribe(( result:SelectItem )=> {
      result.id? this.currentItem.treeNode = result: false;
    });
  }
  getMG(createNewMG : boolean){
    if(createNewMG)
      this.currentItem.modelGroup = {name : ' ', id : null}
      
    this.mgs = this._dataService.getMg(this.currentItem.manufacturer.id).subscribe(res => {
      if(res.data){
        this.mgs = res.data.items
        this.filteredMgs.next(this.mgs.slice());
      }
    });

    this.mgFilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
      this.filtering(this.mgs, this.mgFilterCtrl.value , this.filteredMgs);
    });
  }

  qwe(){
    console.log(this.currentItem);
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
      array.filter(item => item.name.toLowerCase().indexOf(search) > -1)
    );
  }

  close(): void {
    this.dialogRef.close();
  }

  validator(){
    this.inValids = [];
    var isNewItem = 0;
    ['displayBrand' , 'manufacturer', 'treeNode', 'modelGroup'].forEach(prop => {
      if (this.currentItem[prop].name == " " )
        this.inValids.push(prop);
      if (this.currentItem[prop].name == "" )
        isNewItem++;
    });
    if(isNewItem == 4 )
      this.inValids.push("Can not be empty");
  }
  
  addNewItem(){
    this.validator();
    if ( this.inValids.length == 0 ){
      if(!this.isNew)
        this._dataService.edit(this.currentItem).subscribe((res:AtpResponseBase) => ( !res.error?
          Swal.fire(
            this._translationService.instant('client_info_texts.edit_modal_title'),
            this._translationService.instant('client_info_texts.edited_successfully_title'),
            'success') :
          Swal.fire(
            this._translationService.instant('client_info_texts.error_modal_title'),
            this._translationService.instant('client_info_texts.error_title'),
            'error') ,
          this.close() )); 
      else
        this._dataService.set(this.currentItem).subscribe((res:AtpResponseBase) => ( !res.error?
          Swal.fire(
              this._translationService.instant('client_info_texts.add_modal_title'),
              this._translationService.instant('client_info_texts.added_successfully_title'),
              'success') : 
          Swal.fire(
            this._translationService.instant('client_info_texts.error_modal_title'),
            this._translationService.instant('client_info_texts.error_title'),
            'error') ,
          this.close() )); 
    }
  }

  preview(){
    Swal.fire(this.currentItem.displayBrand.name);
  }
}
