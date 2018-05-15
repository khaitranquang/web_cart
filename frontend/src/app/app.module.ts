import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './/app-routing.module';
import { HttpClientModule} from '@angular/common/http';
import { StorageServiceModule } from 'angular-webstorage-service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BooksComponent } from './books/books.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { HomeComponent } from './home/home.component';
import { UserService} from '../services/user.service';
import { BookService } from '../services/book.service';
import { CartService } from '../services/cart.service';
import { CartComponent } from './cart/cart.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminBookDetailComponent } from './admin-book-detail/admin-book-detail.component';
import { AdminOrderDetailComponent } from './admin-order-detail/admin-order-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    BooksComponent,
    BookDetailComponent,
    HomeComponent,
    CartComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    AdminBookDetailComponent,
    AdminOrderDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StorageServiceModule,
    FormsModule
  ],
  providers: [
    UserService,
    BookService,
    CartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
