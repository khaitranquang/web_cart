import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
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

  registerUser(email, username, password, repassword): void {
    this.userService.register(email, username, password, repassword);
  }

}
