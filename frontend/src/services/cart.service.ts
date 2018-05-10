import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Book} from '../models/book';



@Injectable()
export class CartService {
  private urlCart = 'http://localhost:8000/api/v1/orders';
  private totalMoney = 0;
  constructor(
    private http: HttpClient
  ) { }

  getCart(id: number) {
    const token = 'Token ' + window.localStorage.getItem('token');
    const httpOptionsAuth = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }).set('Authorization', token)
    };
    const url = `${this.urlCart}/${id}`;
    return this.http.get(url, httpOptionsAuth);
  }

  /**
   * Create a new order
   * @param orderID
   * @param listBooks
   * @returns {Subscription}
   */
  createOrder(orderID) {
    const token = 'Token ' + window.localStorage.getItem('token');
    const httpOptionsAuth = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }).set('Authorization', token)
    };

    const body = {
      order_id: orderID,
      list_books: []
    };
    return this.http.post(this.urlCart, body, httpOptionsAuth)
      .subscribe(
        res => {
          const localStorage = window.localStorage;
          localStorage.setItem('pkCart', res['id']);
        },
        err => {
          console.log('An error occurred: ', err.error);
        }
      );
  }

  /**
   * Update order
   * @param orderID
   * @param listBooks
   * @param isSubmit
   */
  updateOrder(orderID, listBooks, isSubmit) {
    if (isSubmit) {
    }
    const token = 'Token ' + window.localStorage.getItem('token');
    const httpOptionsAuth = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }).set('Authorization', token)
    };
    const pkCart = window.localStorage.getItem('pkCart');
    const url = `${this.urlCart}/${pkCart}`;
    const body = {
      order_id: orderID,
      list_books: listBooks,
      is_submit: isSubmit,
      total_money: 0
    };
    return this.http.put(url, body, httpOptionsAuth);
  }
}
