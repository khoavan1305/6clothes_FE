import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, Form } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-for-get-password',
  templateUrl: './for-get-password.component.html',
  styleUrls: ['./for-get-password.component.css']
})
export class ForGetPasswordComponent implements OnInit  {
  urlApi: any = 'https://admin.6clothes.click/api/';
  constructor(private  http: HttpClient,private fbuilder:FormBuilder, private router: Router){

  } 
  ngOnInit(): void {
  }
  email: string = "";
  mailSubmit (){
    let bodyData = {
      "email" : this.email, 
    }
    this.http.post(this.urlApi + "forGetPassword",bodyData).subscribe((resulData:any)=>{
      if(resulData["code"] === 409){
        alert(resulData["data"]["email"]);
      }
      if(resulData["code"] === 200){
        alert(resulData["message"]);
      }
    })
  }
}
