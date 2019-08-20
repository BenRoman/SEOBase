import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTreeComponent } from './modal-tree.component';

describe('ModalTreeComponent', () => {
  let component: ModalTreeComponent;
  let fixture: ComponentFixture<ModalTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
