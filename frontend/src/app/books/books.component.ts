import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.getBooks();
  }

  getBooks(): void {
    // Get list books from book.service.ts
  }
}
