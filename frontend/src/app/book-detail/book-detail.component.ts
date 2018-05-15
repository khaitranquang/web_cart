import {Component, Input, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  @Input() book: Book;
  listBooksIDCart: number[] = [];
  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private cartService: CartService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getBook();
  }

  getBook(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.bookService.getBook(id).subscribe(book => this.book = book);
  }

  goBack(): void {
    this.location.back();
  }

  addBookToCart(book: Book) {
    if (window.localStorage.getItem('pkCart') === null) {
      alert('Ban phai dang nhap de thuc hien chuc nang nay');
      return;
    }
    const id = parseInt(window.localStorage.getItem('pkCart'), 10);
    console.log(id);
    this.cartService.getCart(id).subscribe(
      res => {
        this.listBooksIDCart = res['list_books'];
        this.listBooksIDCart.push(parseInt(book.id, 10));
        const orderID = window.localStorage.getItem('orderID');
        this.cartService.updateOrder(orderID, this.listBooksIDCart, false, 0).subscribe(
          response => {
            alert('Da them san pham vao gio hang');
          },
          err => {
            console.log('Error: ', err.error);
          }
        );
      },
      err => {
        console.log('Error: ', err.error);
      }
    );
  }
}
