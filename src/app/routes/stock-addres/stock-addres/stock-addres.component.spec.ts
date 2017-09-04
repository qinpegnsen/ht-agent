import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockAddresComponent } from './stock-addres.component';

describe('StockAddresComponent', () => {
  let component: StockAddresComponent;
  let fixture: ComponentFixture<StockAddresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockAddresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockAddresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
