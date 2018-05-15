import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import {Order} from '../../models/order';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-admin-order-detail',
  templateUrl: './admin-order-detail.component.html',
  styleUrls: ['./admin-order-detail.component.css']
})
export class AdminOrderDetailComponent implements OnInit {
  order: Order;
  constructor(
    private cartService: CartService,
    private route: ActivatedRoute,
    private routerDirect: Router,
    private location: Location
  ) { }

  ngOnInit() {
    this.getOrder();
  }

  /**
   * Get Detail order
   */
  getOrder(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.cartService.getOrder(id).subscribe(order => this.order = order);
  }

  /**
   * Delete order
   */
  deleteOrder(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.cartService.deleteOrder(id).subscribe(
      res => {
        alert('Xoa thanh cong order');
        this.routerDirect.navigate(['/admin/dashboard']);
      }
    );
  }

  goBack(): void {
    this.location.back();
  }
}
