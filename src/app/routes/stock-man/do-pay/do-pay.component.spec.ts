import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoPayComponent } from './do-pay.component';

describe('DoPayComponent', () => {
  let component: DoPayComponent;
  let fixture: ComponentFixture<DoPayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoPayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
