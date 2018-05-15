import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { Book } from '../../models/book';
import { Order } from '../../models/order';
import { UserService } from '../../services/user.service';
import { BookService } from '../../services/book.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  public emailAdmin: string;
  public tokenAdmin: string;
  books: Book[] = [];
  orders: Order[] = [];
  public showAddBook = false;
  public showBookArea = false;
  public showOrderArea = false;
  constructor(
    private userService: UserService,
    private bookService: BookService,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initialize();
  }

  /**
   * Get email and token admin from local storage
   * If login => /admin/dashboard
   * else => /admin/login
   */
  initialize(): void {
    this.emailAdmin = window.localStorage.getItem('emailAdmin');
    this.tokenAdmin = window.localStorage.getItem('tokenAdmin');
    if (this.emailAdmin !== null && this.tokenAdmin !== null) {
      this.getBooks();
      this.getOrders();
    } else {
      this.router.navigate(['/admin/login']);
    }
  }
  /**
   * Get list Books
   */
  getBooks(): void {
    this.bookService.getBooks().subscribe(
      res => this.books = res
    );
  }

  /**
   * Create a new Book
   */
  createBook(name, price, quantity, description): void {
    this.bookService.createBook(name, price, quantity, description).subscribe(
      res => {
        alert('Tao moi sach thanh cong');
        window.location.reload();
      },
      err => {
        console.log('Error: ', err);
        alert('Server loi - Thu lai sau');
      }
    );
  }

  /**
   * Toggle add book
   */
  toggleAddBook() {
    this.showAddBook = !this.showAddBook;
  }

  /**
   * Show/Hide Book Area
   */
  showListBook() {
    this.showBookArea = !this.showBookArea;
  }

  /**
   * Show / Hide Order Area
   */
  showListOrder(){
    this.showOrderArea = !this.showOrderArea;
  }


  /**
   * Get list order
   */
  getOrders(): void {
    this.cartService.getOrders().subscribe(
      res => {
        this.orders = res;
      }
    );
  }

  /**
   * Admin Logout
   */
  logoutAdmin(): void {
    this.userService.logoutAdmin();
    this.emailAdmin = null;
    this.tokenAdmin = null;
    this.router.navigate(['/admin/login']);
  }
}
