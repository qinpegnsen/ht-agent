import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdRecordComponent } from './ord-record.component';

describe('OrdRecordComponent', () => {
  let component: OrdRecordComponent;
  let fixture: ComponentFixture<OrdRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
