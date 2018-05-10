import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  emailUser: string;
  tokenUser: string;
  orderID: string;
  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getEmailAndToken();
  }

  getEmailAndToken(): void {
    const localStorage = window.localStorage;
    this.emailUser = localStorage.getItem('email');
    this.tokenUser = localStorage.getItem('token');
    this.orderID = localStorage.getItem('orderID');
  }
  logout(): void {
    this.userService.logout();
    this.emailUser = null;
    this.tokenUser = null;
    this.orderID = null;
  }
}
