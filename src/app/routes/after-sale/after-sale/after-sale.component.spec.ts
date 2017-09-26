import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterSaleComponent } from './after-sale.component';

describe('AfterSaleComponent', () => {
  let component: AfterSaleComponent;
  let fixture: ComponentFixture<AfterSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfterSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfterSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
