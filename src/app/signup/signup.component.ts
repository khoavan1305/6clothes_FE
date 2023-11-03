import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
  Form,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  submitted = false;
  token: any;
  constructor(
    private http: HttpClient,
    private fbuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    if ((this.token = localStorage.getItem('token'))) {
      this.router.navigate(['/']);
    }
  }
  UserArray: any[] = [];
  name: string = '';
  email: string = '';
  address: string = '';
  phone: string = '';
  password: string = '';
  password_confirm: string = '';
  currentUserID = '';
  urlApi: any = 'https://admin.6clothes.click/api/';
  register() {
    this.submitted = true;
    let bodyData = {
      name: this.name,
      email: this.email,
      password: this.password,
      password_confirm: this.password_confirm,
    };
    this.http
      .post(this.urlApi + "user", bodyData)
      .subscribe((resultData: any) => {
        if (resultData['code'] === 401) {
          this.toastr.error(JSON.stringify(resultData['messeage']), '', {
            timeOut: 1000,
            progressBar: true,
          });
          this.password = '';
        }
        if (resultData['code'] === 409) {
          this.toastr.error(JSON.stringify(resultData['messeage']), '', {
            timeOut: 1000,
            progressBar: true,
          });
          this.password = '';
        }
        if (resultData['code'] === 200) {
          this.toastr.success(JSON.stringify(resultData['messeage']), '', {
            timeOut: 1000,
            progressBar: true,
          });
          this.name = '';
          this.email = '';
          this.password = '';
          this.router.navigate(['/signin']);
        }
      });
  }
  save() {
    this.register();
  }
}
