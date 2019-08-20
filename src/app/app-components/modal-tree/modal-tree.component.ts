import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DataService } from 'src/app/services.ts/data.service';
import { TranslateService } from '@ngx-translate/core';
import { TreeNode } from 'src/app/models/treeNode';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';

@Component({
  selector: 'app-modal-tree',
  templateUrl: './modal-tree.component.html',
  styleUrls: ['./modal-tree.component.css']
})
export class ModalTreeComponent implements OnInit {
  @ViewChild('tree') tree;

  public choosenNode: TreeNode = null;
  public dataSource = new MatTreeNestedDataSource<TreeNode>();
  public treeControl = new NestedTreeControl<TreeNode>(node => node.nestedTreeNodes);

  constructor(
    public dialogRef: MatDialogRef<ModalTreeComponent>,@Inject(MAT_DIALOG_DATA) public data: any,
    public _dataService :DataService , public _translationService : TranslateService  ) {}
  
  hasChild = (_: number, node: TreeNode) => !!node.nestedTreeNodes && node.nestedTreeNodes.length > 0;
  
  close(): void {
    this.dialogRef.close(this.choosenNode? {id: this.choosenNode.treeNodeId , name: this.choosenNode.treeNodeDescription } : { id: null , name: " " });

  }

  ngOnInit() {
    this._dataService.getNodes().subscribe(res => {this.dataSource.data = res.data.items });
  }


  search(searchKey: any){
    console.log(this.tree)
    this.treeControl.collapseAll();
 
    var routes: TreeNode[][] = [];
    var resArray: TreeNode[] = [];

    // this._dataService.getNodes().subscribe(res => {
    //   res.data.items.forEach((item: TreeNode) => {
    //     rec(item.nestedTreeNodes, [item]);
    //   });
    //   convertToTree(routes);
    //   this.dataSource.data = resArray;
    //   treeFilter();
    // });

    // function rec(array: TreeNode[], newNode: TreeNode[]) {
    //   array.forEach(subItem => {
    //     var tmp: TreeNode[] = newNode.slice(0)
    //     tmp.push(subItem)
    //     subItem.treeNodeDescription.toLowerCase().includes(searchKey.toLocaleLowerCase()) ? routes.push(tmp) : rec(subItem.nestedTreeNodes, tmp)
    //   })
    // }

    this._dataService.getNodes().subscribe(res => {
      var arr: TreeNode[] = [];
      res.data.items.forEach((item: TreeNode) => {
        item.nestedTreeNodes = rec2(item);
        item.nestedTreeNodes.length? arr.push(removeDouble(item)): false;
      });
      this.dataSource.data = arr;
      this.treeControl.dataNodes = arr, 
      this.treeControl.expandAll()
    });

    function removeDouble(experimental: TreeNode): TreeNode{
      var uniqueChilds: TreeNode = JSON.parse(JSON.stringify(experimental));
      uniqueChilds.nestedTreeNodes = experimental.nestedTreeNodes.filter(function (item, pos) {
        return experimental.nestedTreeNodes.indexOf(item) == pos;
      })
      return uniqueChilds;
    }
    function rec2(newNode: TreeNode): TreeNode[]{
      var potentialKids: TreeNode[] = [];
      newNode.nestedTreeNodes.forEach(element => {
        if(element.treeNodeDescription.toLowerCase().includes(searchKey.toLocaleLowerCase())){
          potentialKids.push(element);
        }
        else
          if(element.nestedTreeNodes.length){
            var child = rec2(element);
            element.nestedTreeNodes = [];
            child.forEach(item =>{ 
              debugger;
              element.nestedTreeNodes.push(item);
              potentialKids.push(element);
            });
          }

      });
      return potentialKids;
    }

    function convertToTree(sourceArray: TreeNode[][]){
      sourceArray.forEach((element: TreeNode[]) => {
        var i = 0;
        var parentNode: TreeNode = element.slice(0,1)[i];
        adder(parentNode)
        
        function adder(tmp: TreeNode){
          if(element[++i]){
            tmp.nestedTreeNodes = [];
            tmp.nestedTreeNodes.push(element[i]);
            adder(tmp.nestedTreeNodes[0]);
          }
        }

        resArray.push(parentNode);
      });
    }

  }
}
