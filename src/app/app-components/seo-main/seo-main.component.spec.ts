import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeoMainComponent } from './seo-main.component';

describe('SeoMainComponent', () => {
  let component: SeoMainComponent;
  let fixture: ComponentFixture<SeoMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeoMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeoMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
