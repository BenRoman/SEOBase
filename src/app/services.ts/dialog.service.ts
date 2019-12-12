import {Injectable, TemplateRef} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ComponentType} from '@angular/cdk/typings/portal';
import { DialogWindowComponent } from '../app-components/dialog-window/dialog-window.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) { }

  private conf = { autoFocus: true };

  private mediumConf = {height: 'auto', width: '70%', ...this.conf};


  public open(component: any, data: any, id: any, width?: any) {
    debugger;
    this.mediumConf['data'] = { component, data };
    this.mediumConf['id'] = id ;
    this.mediumConf['width'] = width? width: 'auto';
    const conf = this.mediumConf;
    return this.dialog.open(DialogWindowComponent, conf);
  }

  public close(id: any) {
    console.log(id);
    this.dialog.getDialogById(id).close();
    debugger;
  }
  
//  public error<T>(data: any) {
//     return this.dialog.open(AlertDialogComponent, {panelClass: 'alert-panel', data: data});
//   }
}
