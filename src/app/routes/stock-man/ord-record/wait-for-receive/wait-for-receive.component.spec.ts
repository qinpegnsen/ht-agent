import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitForReceiveComponent } from './wait-for-receive.component';

describe('WaitForReceiveComponent', () => {
  let component: WaitForReceiveComponent;
  let fixture: ComponentFixture<WaitForReceiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitForReceiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitForReceiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
