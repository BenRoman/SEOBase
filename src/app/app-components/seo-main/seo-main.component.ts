import { Component, OnInit, Inject, ViewChild, Output, EventEmitter, Input } from '@angular/core';
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
import { DialogService } from 'src/app/services.ts/dialog.service';

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

  public _onDestroy = new Subject<void>();

  public currentItem:TableItem  = new TableItem();
  public categorySwipe: string;
  public isNew: boolean = true;
  public inValids: string[] = [];

  public brands :SelectItem[] ;
  public manus :SelectItem[] ;
  public mgs :SelectItem[] ;


  @Output() onNodesOpen = new EventEmitter();
  @Output() onMGLoad = new EventEmitter();//TODO
  @Output() onEdit = new EventEmitter();
  @Output() onAdd = new EventEmitter();
  @Output() onClose = new EventEmitter();


  ngOnInit() {
    debugger;
    // if(this.isNew)
    //   this.currentItem.cmsContentType = 1;
    // else
    //   if (this.currentItem.manufacturer.id)
    //     this.getMG(false);

  }

  qwe(){
    debugger;
  }
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  compareObjects(o1: SelectItem, o2: SelectItem): boolean {
    return o1.name === o2.name && o1.id === o2.id;
  }


  openDialog(){
    this.onNodesOpen.emit(this.currentItem.treeNode);
  }

  
  // getMG(createNewMG : boolean){
  //   if(createNewMG)
  //     this.currentItem.modelGroup = {name : ' ', id : null}

  //   this.mgs = this.onMGLoad.emit(this.currentItem.manufacturer.id).subscribe(res => {
  //     if(res.data){
  //       this.mgs = res.data.items
  //       this.filteredMgs.next(this.mgs.slice());
  //     }
  //   });

  //   this.mgFilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
  //     this.filtering(this.mgs, this.mgFilterCtrl.value , this.filteredMgs);
  //   });
  // }

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

  validator(){
    this.inValids = [];
    var isNewItem = 0;
    ['displayBrand' , 'manufacturer', 'treeNode', 'modelGroup'].forEach(prop => {
      if (this.currentItem[prop].name == " " || this.currentItem[prop].treeNodeDescription == " " )
        this.inValids.push(prop);
      if (this.currentItem[prop].name == "" || this.currentItem[prop].treeNodeDescription == "")
        isNewItem++;
    });
    if(isNewItem == 4 )
      this.inValids.push("Can not be empty");
  }

  addNewItem(){
    this.validator();
    if ( this.inValids.length == 0 ){
      if (!this.isNew)
        this.onEdit.emit(this.currentItem);
      else
        this.onAdd.emit(this.currentItem);
      this.onClose.emit();
    }
  }
}
