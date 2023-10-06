import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, Form } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit  {
  form!: FormGroup;
  submitted= false;
  token: any;

  constructor(private  http: HttpClient,private fbuilder:FormBuilder, private router: Router){

  } 
  ngOnInit(): void {
    if ((this.token = localStorage.getItem('token'))) {
      this.router.navigate(['/']);
    }
    this.form = new FormGroup({
      name: new FormControl(null,[Validators.required,Validators.maxLength(10),Validators.minLength(3)]),
      email: new FormControl(null,[Validators.required,Validators.email]),
      password: new FormControl(null,[Validators.required,Validators.minLength(6)]),
    });
  }
  UserArray : any[] = [];
  name: string ="";
  email: string ="";
  password: string ="";
  currentUserID = "";
  Alluser()
  { 
    
    this.http.get("http://127.0.0.1:8000/api/user")
  
    .subscribe((resultData: any)=>
    {
        this.UserArray = resultData;

    });
  }
  register()
  {
    this.submitted= true;

    let bodyData = {
      "name" : this.name,
      "email" : this.email,
      "password" : this.password,
    };
    this.http.post("http://127.0.0.1:8000/api/user",bodyData).subscribe((resultData: any)=>
    {
        if(resultData["code"] === 401){
          // console.log(resultData);
          alert(resultData["messeage"]);
          this.password = '';
        }
        if(resultData["code"] === 409){
          // console.log(resultData);
          alert(resultData["messeage"]);
          this.password = '';
        }
        if(resultData["code"] === 200){
          // console.log(resultData);
          alert(resultData["messeage"]);
          this.name = '';
          this.email = '';
          this.password = '';
          this.router.navigate(['/signin']);
        }
    });
  }
  save()
  { 
        this.register();
  }
}
