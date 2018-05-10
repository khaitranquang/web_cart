import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router} from '@angular/router';

import { CartService } from './cart.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private cartService: CartService
  ) { }

  login (email, password) {
    const body = {
      email: email,
      password: password
    };

    return this.http.post('http://localhost:8000/api/auth/users/login/', body, httpOptions)
      .subscribe(
        res => {
          if (res['user'] != null) {
            const time = new Date().getTime().toString();
            const orderID = btoa(res['user']['email'] + time).replace(/[^a-zA-Z ]/g, '');
            const localStorage = window.localStorage;
            localStorage.setItem('email', res['user']['email']);
            localStorage.setItem('token', res['user']['token']);
            localStorage.setItem('orderID', orderID);
            console.log('Order ID: ', orderID);
            this.cartService.createOrder(orderID);
            this.router.navigate(['/']);
          }
        },
        error => {
          console.log('An error occurred: ', error.error);
          alert('Tài khoản hoặc mật khẩu không đúng');
          this.router.navigate(['/login']);
        }
      );
  }

  register (email, username, password, repassword) {
    if (password !== repassword) {
      alert('Vui lòng nhập lại đúng mật khẩu');
      return;
    }
    const body = {
      email: email,
      username: username,
      password: password
    };
    this.http.post('http://localhost:8000/api/auth/users/register/', body, httpOptions)
      .subscribe(
        res => {
          console.log(res);
          console.log(res['user']);
          if (res['user'] != null) {
            console.log(res['user']['email']);
            this.router.navigate(['/login']);
            return;
          }
        },
        err => {
          console.log('Error: ', err);
          alert('Tài khoản này đã được sử dụng, hoặc server lỗi. Hãy thử lại sau');
          this.router.navigate(['/register']);
          return;
        }
      );
  }

  logout () {
    const localStorage = window.localStorage;
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    localStorage.removeItem('orderID');
    localStorage.removeItem('pkCart');
  }
}
