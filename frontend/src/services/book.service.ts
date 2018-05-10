import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';


import { Book } from '../models/book';


const httpOptionsNormal = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class BookService {
  private urlBooks = 'http://localhost:8000/api/v1/books';
  constructor(
    private http: HttpClient,
  ) { }

  /**
   * Get list books
   * @returns {Observable<Book[]>}
   */
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]> (this.urlBooks, httpOptionsNormal);
  }

  /**
   * Get a book
   * @param {number} id
   * @returns {Observable<Book>}
   */
  getBook(id: number): Observable<Book> {
    const url = `${this.urlBooks}/${id}`;
    return this.http.get<Book>(url, httpOptionsNormal);
  }
}
