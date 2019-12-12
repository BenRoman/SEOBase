import { Component, OnInit, Inject, ViewChild, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DataService } from 'src/app/services.ts/data.service';
import { TranslateService } from '@ngx-translate/core';
import { TreeNode } from 'src/app/models/treeNode';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { element } from '@angular/core/src/render3';
import { DialogService } from 'src/app/services.ts/dialog.service';

@Component({
  selector: 'app-modal-tree',
  templateUrl: './modal-tree.component.html',
  styleUrls: ['./modal-tree.component.css']
})
export class ModalTreeComponent{

  constructor(
    changeDetector: ChangeDetectorRef
  ) {

  }

  public choosenNode: TreeNode = null;
  public dataSource = new MatTreeNestedDataSource<TreeNode>();
  public treeControl = new NestedTreeControl<TreeNode>(node => node.nestedTreeNodes);

  @Output() onClose = new EventEmitter();
  @Output() onSearch = new EventEmitter();

  hasChild = (_: number, node: TreeNode) => !!node.nestedTreeNodes && node.nestedTreeNodes.length > 0;
  
  close(): void {
    this.onClose.emit(this.choosenNode);
  }

  search(searchKey: any){
    this.onSearch.emit(searchKey);
    
  }
}
