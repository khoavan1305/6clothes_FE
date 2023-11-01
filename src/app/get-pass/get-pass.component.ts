import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, Form } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-pass',
  templateUrl: './get-pass.component.html',
  styleUrls: ['./get-pass.component.css']
})
export class GetPassComponent implements OnInit {
  urlApi: any = 'https://admin.6clothes.click/api/';
  constructor(private  http: HttpClient,private fbuilder:FormBuilder, private router: Router){
  } 
  ngOnInit(): void {
  }
  new_password: string = "";
  new_password_confirm: string = "";
  
  Submit(){
    let bodyData = {
      "new_password" : this.new_password, 
      "new_password_confirm" : this.new_password_confirm, 
    }
    this.http.post(this.urlApi + "getPassword",bodyData).subscribe((resulData:any)=>{
      console.log(resulData);
      if(resulData["code"] === 409){
        alert(resulData["message"]);
      }
      if(resulData["code"] === 401){
        alert(resulData["message"]);
        this.router.navigate(['/']);
      }
      if(resulData["code"] === 200){
        alert(resulData["message"]);
        this.router.navigate(['/signin']);
      }
    })
  }
}
