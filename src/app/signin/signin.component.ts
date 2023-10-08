import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit{
  UserArray: any[] = [];
  token: any;

  name: string = '';
  email: string = '';
  password: string = '';
  currentUserID = '';
required: any;
pattern: any;
  constructor(private http: HttpClient, private router: Router) {}
  // public exampleText: string = '';
  public ngOnInit(): void {
    if (this.token === null) {
      this.router.navigate(['/login']);
    }
    if ((this.token = localStorage.getItem('token'))) {
      this.router.navigate(['/']);
    }
  }
  login() {
    let bodyData = {
      name:this.name,
      email: this.email,
      password: this.password,
    };
    this.http
      .post('http://127.0.0.1:8000/api/login', bodyData)
      .subscribe((resultData: any) => {
        if (resultData['code'] === 409) {
          alert('Email hoặc PassWord không Chính Xác');
          this.email = '';
          this.password = '';
        } else {
          this.token = resultData['data']['token'];
          localStorage.setItem('token', this.token);
          localStorage.setItem('loggedUser', resultData['data']['name']);
          this.router.navigate(['/']);
          window.location.reload();
          alert('Đăng Nhập Thành Công');
          // console.log(resultData['data']['name']);
        }
      });
  }

}
