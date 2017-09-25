import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HandledComponent } from './handled.component';

describe('HandledComponent', () => {
  let component: HandledComponent;
  let fixture: ComponentFixture<HandledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HandledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HandledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
