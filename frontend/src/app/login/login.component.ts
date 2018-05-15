import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public isLogin = false;
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.checkLogin();
  }

  /**
   * Check isLogin
   */
  checkLogin(): void {
    if (window.localStorage.getItem('email') !== null) {
      this.isLogin = true;
      this.router.navigate(['/']);
    } else {
      this.isLogin = false;
    }
  }

  /**
   * Login Action
   * @param email
   * @param password
   */
  loginUser(email, password): void {
    this.userService.login(email, password);
  }
}
