import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  registerUser(email, username, password, repassword): void {
    if (password !== repassword) {
      alert('Vui lòng nhập lại đúng mật khẩu');
      return;
    }
    this.userService.register(email, username, password)
      .subscribe(res => {
        console.log(res);
        console.log(res['user']);
        // console.log(res['e']['error']);
        //
        // if (res['e']['error']) {
        //   alert('Xem lại các trường dữ liệu hoặc email này đã được sử dụng');
        //   this.router.navigate(['/register']);
        //   return;
        // }
        if (res['user'] != null) {
          console.log(res['user']['email']);
          this.router.navigate(['/login']);
          return;
        } else {
          alert('Lỗi server hoặc email này đã được sử dụng');
          this.router.navigate(['/register']);
          return;
        }
      });
  }

}
