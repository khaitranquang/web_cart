import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BooksComponent } from './books/books.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { CartComponent } from './cart/cart.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminBookDetailComponent } from './admin-book-detail/admin-book-detail.component';
import { AdminOrderDetailComponent } from './admin-order-detail/admin-order-detail.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', component: BooksComponent},
  {path: 'books/:id', component: BookDetailComponent},
  {path: 'cart/:orderID', component: CartComponent},
  {path: 'logout', redirectTo: '/', pathMatch: 'full'},

  {path: 'admin', redirectTo: '/admin/login', pathMatch: 'full'},
  {path: 'admin/login', component: AdminLoginComponent},
  {path: 'admin/dashboard', component: AdminDashboardComponent},
  {path: 'admin/books/:id', component: AdminBookDetailComponent},
  {path: 'admin/orders/:id', component: AdminOrderDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
