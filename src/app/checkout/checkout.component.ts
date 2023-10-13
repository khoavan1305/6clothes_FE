import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICart } from '../icart';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  ProductArray: any[] = [];
  currentProductID = '';
  items: ICart[] = [];
  itemss: any;
  ten: string = '';
  ho: string = '';
  email: string = '';
  sdt: string = '';
  diachi: string = '';
  thanhpho: string = '';
  ghichu: string = "" ;
  pttt: string = '';
  sale:any ;
  userID:any;
  tokenUser:any;
  urlApi :any = "http://127.0.0.1:8000/api/";
  constructor(private http: HttpClient, private router: Router,private toastr: ToastrService) {
    this.itemss = localStorage.getItem('items');
    this.items = JSON.parse(this.itemss);
    this.tokenUser = localStorage.getItem('token');
    this.getOneUser();
    this.tongtien();
    this.sale = localStorage.getItem('sale');

  }
  ngOnInit(): void {
    this.checkOut();
  }
 
  total:number = 0;
  ship:number = 10;
  tongtien(){
    this.items.forEach(item => this.total += item.quantity * item.price);
    if(this.sale == 0){
      return this.total + this.ship;
    }else{
      return this.total / this.sale + this.ship;
    }
  }
  getOneUser(){
    this.http 
    .get(this.urlApi+'user/'+this.tokenUser)
    .subscribe((resultData: any) => {
      this.userID = resultData['data']['id'];
    });
  }
  order(){
    let bodyData = {
      "first_name" : this.ten,
      "last_name" : this.ho,
      "street_address" : this.diachi,
      "email" : this.email,
      "phone" : this.sdt,
      "pttt" : this.pttt,
      "city" : this.thanhpho,
      "note" : this.ghichu,
      "total" : this.total,
      "user_id":  this.userID ,
      "array" : this.items,
    };
    this.http.post("http://127.0.0.1:8000/api/order",bodyData).subscribe((resultData: any)=>
    {
      if (resultData['code'] === 200) {
        this.toastr.success("Đặt hàng thành công! Bạn cần kiểm tra E-mail để xác nhận đơn hàng trong 24h",'',{
          timeOut:5000,
          progressBar:true
        })
      localStorage.removeItem("items");
        this.router.navigate(['cart']);
        setTimeout(function(){
          window.location.reload();
       }, 5000);
      }else{
        this.toastr.error("Đặt hàng thành thất bại",'',{
          timeOut:2000,
          progressBar:true
        })
        
      }
    });
  }
  checkOut(){
    if(localStorage.getItem('token') == null ||  !this.items.length){
      if(!this.items.length){
        this.router.navigate(['shop']);
        this.toastr.error("Giỏ hàng trống!",'',{
          timeOut:1000,
          progressBar:true
        })
      }else{
        this.router.navigate(['signin']);
        this.toastr.error("Bạn cần đăng nhập!",'',{
          timeOut:1000,
          progressBar:true
        })
      }
    }else {
      this.router.navigate(['checkout']);
    }
    }
}
