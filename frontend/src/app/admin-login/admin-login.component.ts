import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  public isLogin = false;
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    // this.checkLogin();
  }

  /**
   * Check isLogin
   */
  // checkLogin(): void {
  //   if (window.localStorage.getItem('emailAdmin') !== null) {
  //     this.isLogin = true;
  //     this.router.navigate(['/']);
  //   } else {
  //     this.isLogin = false;
  //   }
  // }

  /**
   * Login Action
   * @param email
   * @param password
   */
  loginAdmin(email, password): void {
    this.userService.adminLogin(email, password);
  }

}
