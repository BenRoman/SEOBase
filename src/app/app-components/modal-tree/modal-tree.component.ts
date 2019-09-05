import { Component, OnInit, Inject, ViewChild, Output, EventEmitter } from '@angular/core';
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

  public choosenNode: TreeNode = null;
  public dataSource = new MatTreeNestedDataSource<TreeNode>();
  public treeControl = new NestedTreeControl<TreeNode>(node => node.nestedTreeNodes);

  @Output() onClose = new EventEmitter();
  hasChild = (_: number, node: TreeNode) => !!node.nestedTreeNodes && node.nestedTreeNodes.length > 0;
  
  close(): void {
    this.onClose.emit(this.choosenNode);
  }
  
  async hightlightWord(keyWord: string) {
    await delay();  //  TODO check in the future
    Array.from(document.getElementsByClassName("highlight-element-selector")).forEach( element => {
      if (element.lastChild.nodeValue.toLocaleLowerCase().includes(keyWord.toLowerCase() )){
        var start = element.lastChild.nodeValue.toLowerCase().search(keyWord.toLowerCase());
        var forChange = element.lastChild.nodeValue.slice(start, start + keyWord.length);
        var newOne = element.lastChild.nodeValue.split(forChange).join('<span class="highlighted">'+ forChange +'</span>');
        element.innerHTML = element.innerHTML.replace(element.innerHTML.split('>').pop() , newOne);
      }
    });
    function delay() {
      return new Promise( resolve => setTimeout(resolve, 0) );
    }
  }


  search(searchKey: any){
    // this.treeControl.collapseAll();
    // this._dataService.getNodes().subscribe(async res => {
    //   var arr: TreeNode[] = [];
    //   res.data.items.forEach((item: TreeNode) => {
    //     item.nestedTreeNodes = recFilter(item);
    //     item.nestedTreeNodes.length? arr.push(removeDouble(item)): false;
    //   });
    //   this.dataSource.data = arr;
    //   this.treeControl.dataNodes = arr;
    //   this.treeControl.expandAll();
    //   this.hightlightWord(searchKey);
    // });
    
  

    function removeDouble(experimental: TreeNode): TreeNode{
      var uniqueChilds: TreeNode = JSON.parse(JSON.stringify(experimental));
      uniqueChilds.nestedTreeNodes = experimental.nestedTreeNodes.filter(function (item, pos) {
        return experimental.nestedTreeNodes.indexOf(item) == pos;
      })
      return uniqueChilds;
    }
    
    function recFilter(newNode: TreeNode): TreeNode[]{
      var potentialKids: TreeNode[] = [];
      newNode.nestedTreeNodes.forEach(element => {
        if(element.treeNodeDescription.toLowerCase().includes(searchKey.toLocaleLowerCase())){
          potentialKids.push(element);
        }
        else
          if(element.nestedTreeNodes.length){
            var child = recFilter(element);
            element.nestedTreeNodes = [];
            child.forEach(item =>{ 
              element.nestedTreeNodes.push(item);
              potentialKids.push(element);
            });
          }

        });
      return potentialKids;
    }
    
    
    // var resArray: TreeNode[] = [];
    // var routes: TreeNode[][] = [];
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
    
    // function convertToTree(sourceArray: TreeNode[][]){
    //   sourceArray.forEach((element: TreeNode[]) => {
    //     var i = 0;
    //     var parentNode: TreeNode = element.slice(0,1)[i];
    //     adder(parentNode)
        
    //     function adder(tmp: TreeNode){
    //       if(element[++i]){
    //         tmp.nestedTreeNodes = [];
    //         tmp.nestedTreeNodes.push(element[i]);
    //         adder(tmp.nestedTreeNodes[0]);
    //       }
    //     }
        
    //     resArray.push(parentNode);
    //   });
    // }
    
  }
}
