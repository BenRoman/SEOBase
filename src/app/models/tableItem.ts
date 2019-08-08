import * as uuid from 'uuid';
import { SelectItem } from './selectItem';
export class TableItem{
    cmsContentId: number
    cmsContentType: number
    createdBy: string
    createdUtc: string 
    displayBrand: SelectItem
    id: number
    isActive: boolean
    manufacturer: SelectItem
    memo: string
    modelGroup: SelectItem
    modifyBy: string
    modifyUtc: string 
    treeNode: SelectItem
    
    // constructor() {
    //     this.Id = uuid.v4();  
    //     this.Model_Group = "";
    //     this.Manufacturer = "";
    //     this.Brand = "";
    //     this.Node = "";
    //     this.Target_URL = "";
    //     this.Memo = "";
    // }
  
}