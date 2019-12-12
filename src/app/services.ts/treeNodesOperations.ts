import { TreeNode } from '../models/treeNode';

export class NodesOperator {


  static removeDouble(experimental: TreeNode): TreeNode {
    var uniqueChilds: TreeNode = JSON.parse(JSON.stringify(experimental));
    uniqueChilds.nestedTreeNodes = experimental.nestedTreeNodes.filter(function (item, pos) {
      return experimental.nestedTreeNodes.indexOf(item) == pos;
    })
    return uniqueChilds;
  }

  static recFilter(newNode: TreeNode, searchKey: string): TreeNode[] {
    var potentialKids: TreeNode[] = [];
    newNode.nestedTreeNodes.forEach(element => {
      if (element.treeNodeDescription.toLowerCase().includes(searchKey.toLocaleLowerCase())) {
        potentialKids.push(element);
      }
      else
        if (element.nestedTreeNodes.length) {
          var child = NodesOperator.recFilter(element, searchKey);
          element.nestedTreeNodes = [];
          child.forEach(item => {
            element.nestedTreeNodes.push(item);
            potentialKids.push(element);
          });
        }

    });
    return potentialKids;
  }

  static async hightlightWord(keyWord: string) {
    // await NodesOperator.delay();  //  TODO check in the future
    Array.from(document.getElementsByClassName("highlight-element-selector")).forEach(element => {
      if (element.lastChild.nodeValue.toLocaleLowerCase().includes(keyWord.toLowerCase())) {
        var start = element.lastChild.nodeValue.toLowerCase().search(keyWord.toLowerCase());
        var forChange = element.lastChild.nodeValue.slice(start, start + keyWord.length);
        var newOne = element.lastChild.nodeValue.split(forChange).join('<span class="highlighted">' + forChange + '</span>');
        element.innerHTML = element.innerHTML.replace(element.innerHTML.split('>').pop(), newOne);
      }
    });
  }
  static delay() {
    return new Promise(resolve => setTimeout(resolve, 0));
  }


}