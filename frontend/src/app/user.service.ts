import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router} from '@angular/router';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login (email, password) {
    const body = {
      email: email,
      password: password
    };

    return this.http.post('http://localhost:8000/api/users/login/', body, httpOptions);
  }

  register (email, username, password) {
    const body = {
      email: email,
      username: username,
      password: password
    };
    return this.http.post('http://localhost:8000/api/users/register/', body, httpOptions);
  }
}
