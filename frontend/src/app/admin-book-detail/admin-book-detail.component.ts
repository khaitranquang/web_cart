import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import {Book} from '../../models/book';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-admin-book-detail',
  templateUrl: './admin-book-detail.component.html',
  styleUrls: ['./admin-book-detail.component.css']
})
export class AdminBookDetailComponent implements OnInit {
  book: Book;
  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private routerDirect: Router
  ) { }

  ngOnInit() {
    this.getBook();
  }

  /**
   * Get detail of a book
   */
  getBook(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.bookService.getBook(id).subscribe(book => this.book = book);
  }

  /**
   * Update book
   */
  updateBook(): void {
    this.bookService.updateBook(this.book).subscribe(() => alert('Update thanh cong'));
  }

  /**
   * Delete this Book
   */
  deleteBook(): void {
    this.bookService.deleteBook(this.book).subscribe(() => {
      alert('Xoa thanh cong');
      this.routerDirect.navigate(['/admin/dashboard']);
    });
  }

  /**
   * Back to Dashboard
   */
  back(): void {
    this.routerDirect.navigate(['/admin/dashboard']);
  }
}
