import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedPacketStaticsComponent } from './red-packet-statics.component';

describe('RedPacketStaticsComponent', () => {
  let component: RedPacketStaticsComponent;
  let fixture: ComponentFixture<RedPacketStaticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedPacketStaticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedPacketStaticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
