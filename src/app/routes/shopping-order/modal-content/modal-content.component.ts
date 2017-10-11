import {Component} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap";
import {ShoppingOrderService} from "../shopping-order.service";

@Component({
  selector: 'modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss']
})
export class ModalContentComponent {
  public title: string;
  public list: any[] = [];
  public other: string;
  public stateEnum: string='OTHER';
  public woAgengId: number;
  constructor(public bsModalRef: BsModalRef, private shoppingOrderService: ShoppingOrderService,) {
  }

  /**
   * 提交拒单的原因
   */
  submit() {
    let url = '/woAgent/updateWoAgentToReject';
    let data = {
      reasonEnum: this.stateEnum,
      other: this.other,
      woAgengId: this.woAgengId
    };
    this.shoppingOrderService.toAcceptWork(url, data);
    this.bsModalRef.hide()
  }
}
