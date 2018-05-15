import { Component, OnInit } from '@angular/core';


import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  books: Book[] = [];
  constructor(
    private bookService: BookService
  ) { }

  ngOnInit() {
    this.getBooks();
  }

  /**
   * Get list Books
   */
  getBooks(): void {
    this.bookService.getBooks().subscribe(
      res => this.books = res
    );
  }
}
