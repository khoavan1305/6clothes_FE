import{HttpClient,HttpHeaders} from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {FormGroup ,Validators ,FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css']
})
export class UserdetailComponent implements OnInit {
  user: any = "";
  token: any = '';
  currentUserID = "";

  constructor(private http: HttpClient,private FormBuilder: FormBuilder, private router: Router,private toastr: ToastrService) {
    this.token = localStorage.getItem('token');
    this.userdetaill();
    
    
  }
  ngOnInit(): void { 
    if(this.token === null){
      this.router.navigate(['/']);
    }else{
      this.router.navigate(['/userdetaill']);
    }
  }
  userdetaill() {
    this.http.get('http://127.0.0.1:8000/api/user/' + this.token)
      .subscribe((resultData: any) => {
        this.user = resultData['data'];
      });
  }
  old_password: string = "";
  new_password: string = "";
  confirm_password: string = "";
  updateuser() {
    let bodyData = {
      "old_password": this.old_password,
      "new_password": this.new_password,
      "confirm_password": this.confirm_password,
      "id": this.user['id'],
    };
    this.http.put("http://127.0.0.1:8000/api/updatepw/" + this.user['id'], bodyData).subscribe((resultData: any) => {
      if (resultData["code"] === 401) {
        this.toastr.error(JSON.stringify(resultData['Message']),'',{
          timeOut:1000,
          progressBar:true
        })
      }
      if (resultData["code"] === 409) {
        this.toastr.error(JSON.stringify(resultData['Message']),'',{
          timeOut:1000,
          progressBar:true
        })
      }
      if (resultData["code"] === 200) {
        this.old_password = '';
        this.new_password = '';
        this.confirm_password = '';
        this.toastr.success(JSON.stringify(resultData['Message']),'',{
          timeOut:1000,
          progressBar:true
        })
        this.router.navigate(['/userdetaill']);
      }
    });
  }
  name: string = "";
  updatettc() {
    let bodyData = {
      "name": this.name,
      "id": this.user['id'],
    };
    this.http.put("http://127.0.0.1:8000/api/updatettc/" + this.user['id'], bodyData).subscribe((resultData: any) => {
      if (resultData["code"] === 409) {
        this.toastr.error(JSON.stringify(resultData['Message']),'',{
          timeOut:1000,
          progressBar:true
        })
      }
      if (resultData["code"] === 200) {
        localStorage.setItem('loggedUser',this.name);
        this.toastr.success(JSON.stringify(resultData['Message']),'',{
          timeOut:1000,
          progressBar:true
        })
        setTimeout(function(){
          window.location.reload();
       }, 1000);
        this.router.navigate(['/userdetaill']);
      }
    });
    
  }
  phone: string = "";
  address: string = "";
  date: string = "";
  updatettcn() {
    let bodyData = {
      "phone": this.phone,
      "date": this.date,
      "address": this.address,
      "id": this.user['id'],
    };
    this.http.put("http://127.0.0.1:8000/api/updatettcn/" + this.user['id'], bodyData).subscribe((resultData: any) => {
      if (resultData["code"] === 409) {
        this.toastr.error(JSON.stringify(resultData['Message']),'',{
          timeOut:1000,
          progressBar:true
        })
      }
      if (resultData["code"] === 200) {
        this.toastr.success(JSON.stringify(resultData['Message']),'',{
          timeOut:1000,
          progressBar:true
        })
        setTimeout(function(){
          window.location.reload();
       }, 1000);
        this.router.navigate(['/userdetaill']);
      }
    });
  }
  files:any;
  imageUrl: any;

  uploadImage(event: any){
    this.files = event.target.files[0];
    console.log(this.files);
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.files);
  }

  changeAvatar(){
    const formData = new FormData();
    formData.append("images",this.files,this.files.name);
    this.http.post("http://127.0.0.1:8000/api/changeAvatar/" + this.user['id'],formData)
    .subscribe((resultData: any) => {
      if(resultData['status'] = true){
          this.toastr.success(JSON.stringify(resultData['Message']),'',{
            timeOut:2000,
            progressBar:true
          })
          setTimeout(function(){
            window.location.reload();
         }, 2000);
        }else{
          this.toastr.error(JSON.stringify(resultData['Mesage']),'',{
            timeOut:2000,
            progressBar:true
          })
          setTimeout(function(){
            window.location.reload();
         }, 2000);
        }
    });
  }
  
}
