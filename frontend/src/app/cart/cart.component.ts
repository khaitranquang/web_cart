import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

import {Book} from '../../models/book';
import { CartService } from '../../services/cart.service';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public listBooksCart: Book[] = [];
  public totalMoney = 0;
  public listBooksID: string[] = [];
  constructor(
    private cartService: CartService,
    private bookService: BookService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getDetailCart();
  }
  getDetailCart() {
    const id = parseInt(window.localStorage.getItem('pkCart'), 10);
    this.cartService.getCart(id).subscribe(
      res => {
        for (const index of res['list_books']) {
          this.bookService.getBook(index).subscribe(
            book => {
              this.totalMoney += book.price;
              this.listBooksCart.push(book);
              this.listBooksID.push(index);
            }
          );
        }
      },
      err => {
        console.log('Error: ', err.error);
      }
    );
  }

  payment () {
    const orderID = window.localStorage.getItem('orderID');
    this.cartService.updateOrder(orderID, this.listBooksID, true, this.totalMoney).subscribe(
      res => {
        alert('Tổng số tiền cần thanh toán là: ' + this.totalMoney);
        // Now, delete orderID and pkCart from localStorage
        // And create new orderID and new cart
        window.localStorage.removeItem('orderID');
        window.localStorage.removeItem('pkCart');
        const time = new Date().getTime().toString();
        const newOrderID = btoa(window.localStorage.getItem('email') + time).replace(/[^a-zA-Z ]/g, '');
        window.localStorage.setItem('orderID', newOrderID);
        this.cartService.createOrder(newOrderID);
        // Then, redirect to home '/'
        this.router.navigate(['/']);
      },
      err => {
        console.log('Error occurred: ', err);
      }
    );
  }

  /**
   * Remove a book from cart
   */
  removeBook(book: Book) {
    const orderID = window.localStorage.getItem('orderID');
    const index = this.listBooksCart.indexOf(book);
    if (index !== -1) {
      this.listBooksID.splice(index, 1);
      this.listBooksCart.splice(index, 1);
      this.totalMoney = this.totalMoney - book.price;
    }
    this.cartService.updateOrder(orderID, this.listBooksID, false, 0).subscribe(
      res => {},
      err => {
        console.log('Error: ', err);
      }
    );
  }
}
