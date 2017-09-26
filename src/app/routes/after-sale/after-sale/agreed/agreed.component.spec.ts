import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreedComponent } from './agreed.component';

describe('AgreedComponent', () => {
  let component: AgreedComponent;
  let fixture: ComponentFixture<AgreedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgreedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
