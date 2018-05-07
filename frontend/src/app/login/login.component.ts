import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {UserService} from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  loginUser(email, password): void {
    this.userService.login(email, password)
      .subscribe(res => {
        console.log(res);
        // console.log(JSON.stringify(res));
        // const data = JSON.stringify(res);
        console.log(res['user']);
        if (res['user'] != null) {
          this.router.navigate(['/books']);
        } else {
          this.router.navigate(['/login']);
        }
      });
  }

}
