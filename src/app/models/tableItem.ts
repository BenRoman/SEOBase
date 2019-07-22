import * as uuid from 'uuid';
export class TableItem{
    Id: string;
    Brand: string;
    Node: string;
    Model_Group: string;
    Manufacturer: string;
    Target_URL: string;
    Memo: string;
    
    constructor() {
        this.Id = uuid.v4();  
        this.Model_Group = "";
        this.Manufacturer = "";
        this.Brand = "";
        this.Node = "";
        this.Target_URL = "";
        this.Memo = "";
    }
    /**
     *
     */
    // constructor(brand , node , mg , mn , url) {
    //     this.Brand = brand , this.Node = node , this.Model_Group = mg , this. Manufacturer = mn , this.Target_URL = url ;
    //     this.Id = uuid.v4();
    // }
}