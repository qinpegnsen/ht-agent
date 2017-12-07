import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedPacketPushOrderComponent } from './red-packet-push-order.component';

describe('RedPacketPushOrderComponent', () => {
  let component: RedPacketPushOrderComponent;
  let fixture: ComponentFixture<RedPacketPushOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedPacketPushOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedPacketPushOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
