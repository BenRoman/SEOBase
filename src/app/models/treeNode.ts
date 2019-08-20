export class TreeNode 
{
    treeNodeId  :number; 
    treeNodeDescription :string; 
    parentTreeNodeId? :number;
    nestedTreeNodes? : TreeNode[]; 
}