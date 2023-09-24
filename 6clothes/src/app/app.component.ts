import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = '6clothes';
  UserArray: any[] = [];
  token: any;
  userDisplay: any = '';
  loguserDisplay: any = '';
  routerlinksignin:any ="";
  routerlinksignup:any = "";
  logoutuser:any = "";
  currentUserID = '';
  constructor(private http: HttpClient, private router: Router) {}
  public ngOnInit(): void {
    if ((this.token = localStorage.getItem('token'))) {
      this.userDisplay = "Xin Chào: " + localStorage.getItem('loggedUser');
      this.routerlinksignin = "";
      this.loguserDisplay = "Đăng Xuất";
      this.routerlinksignup = "logout";
      this.logoutuser = "";
    }else{
      this.userDisplay = "Đăng Nhập";
      this.routerlinksignin = "signin";
      this.loguserDisplay = "";
      this.routerlinksignup = "signup";
      this.logoutuser = "Đăng Ký";
    }
  }
  logout() {
    localStorage.clear();
    window.location.reload();
    this.router.navigate(['']);
    alert('Đăng Xuất Thành Công');
  }
}
