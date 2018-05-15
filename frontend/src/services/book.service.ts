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
  private urlBooks = 'http://localhost:8000/api/books';
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

  /**
   * Update a book - Only Admin allows update
   * @param {Book} book
   * @returns {Observable<any>}
   */
  updateBook (book: Book): Observable<any> {
    const token = 'Token ' + window.localStorage.getItem('tokenAdmin');
    const httpOptionsAuth = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }).set('Authorization', token)
    };
    const id = book.id;
    const url = `${this.urlBooks}/${id}`;
    return this.http.put(url, book, httpOptionsAuth);
  }

  /**
   * Create a new Book
   * @param name
   * @param price
   * @param quantity
   * @param description
   */
  createBook(name, price, quantity, description) {
    const token = 'Token ' + window.localStorage.getItem('tokenAdmin');
    const httpOptionsAuth = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }).set('Authorization', token)
    };
    const body = {
      name: name,
      price: price,
      quantity: quantity,
      description: description
    };
    return this.http.post(this.urlBooks, body, httpOptionsAuth);
  }

  /**
   * Delete book
   * @param {Book} book
   * @returns {Observable<any>}
   */
  deleteBook (book: Book): Observable<any> {
    const token = 'Token ' + window.localStorage.getItem('tokenAdmin');
    const httpOptionsAuth = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }).set('Authorization', token)
    };
    const id = book.id;
    const url = `${this.urlBooks}/${id}`;
    return this.http.delete(url, httpOptionsAuth);
  }

}
