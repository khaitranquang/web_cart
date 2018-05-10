import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

import { UserService } from '../../services/user.service';
import { BookService } from '../../services/book.service';
import { CartService } from '../../services/cart.service';
import { Book } from '../../models/book';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  listBooksIDCart: number[] = [];
  constructor (
    private router: Router,
    private userService: UserService,
    private bookService: BookService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.getBooks();
  }
  getBooks(): void {
    this.bookService.getBooks().subscribe(
      res => {
        this.books = res;
      }
    );
  }
  addBookToCart(book: Book) {
    const id = parseInt(window.localStorage.getItem('pkCart'), 10);
    console.log(id);
    this.cartService.getCart(id).subscribe(
      res => {
        this.listBooksIDCart = res['list_books'];
        this.listBooksIDCart.push(parseInt(book.id, 10));
        const orderID = window.localStorage.getItem('orderID');
        this.cartService.updateOrder(orderID, this.listBooksIDCart, false).subscribe(
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
