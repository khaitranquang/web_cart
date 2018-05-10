import { Component, OnInit } from '@angular/core';
import {Book} from '../../models/book';

import { CartService } from '../../services/cart.service';
import {BookService} from '../../services/book.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public listBooksCart: Book[] = [];
  constructor(
    private cartService: CartService,
    private bookService: BookService
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
              this.listBooksCart.push(book);
            }
          );
        }
      },
      err => {
        console.log('Error: ', err.error);
      }
    );
  }
}
