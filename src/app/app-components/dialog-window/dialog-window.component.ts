import {MAT_DIALOG_DATA} from '@angular/material';
import {Component,
  ComponentFactoryResolver,
  ComponentRef,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
  Output} from '@angular/core';
import { ModalTreeComponent } from '../modal-tree/modal-tree.component';
import { SeoMainComponent } from '../seo-main/seo-main.component';
import { EventEmitter } from 'events';
import { Type } from '@angular/compiler';

@Component({
  selector: 'dialog-window',
  templateUrl: './dialog-window.component.html',
  styleUrls: ['./dialog-window.component.css']
})
export class DialogWindowComponent implements OnInit, OnDestroy {

  @Output() onCustomize: any; // TODO
  @ViewChild('target', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;

  componentRef: ComponentRef<any>;
  component: any;
  constructor(private resolver: ComponentFactoryResolver, @Inject(MAT_DIALOG_DATA) public data: any) { 
    console.log(data);
    console.log(typeof data.component);
    this.component = data.component;
    this.onCustomize = data.data ? data.data.function : (param: any) => {
      debugger;//TODO
    };
  }

  
  ngOnInit() {
    const factory =  this.resolver.resolveComponentFactory(this.component);
    this.componentRef = this.viewContainerRef.createComponent(factory);
    this.onCustomize(this.componentRef.instance);

  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}
