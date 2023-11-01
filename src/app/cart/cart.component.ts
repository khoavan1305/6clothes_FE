import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICart } from '../icart';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit  {
  ProductArray: any[] = [];
  currentProductID = '';
  items: ICart[] = [];
  itemss:any;
  constructor(private http: HttpClient, private router: Router,private toastr: ToastrService) {4
    localStorage.setItem("sale",this.sale);
    this.itemss= localStorage.getItem('items');
    this.items= JSON.parse(this.itemss);
    this.tongtien();
    this.sale = localStorage.getItem('sale');
  }
  ngOnInit(): void {}
  total:number = 0;
  ship:number = 10;
  tongtien(){
     this.items.forEach(item => this.total += item.quantity * item.price);
     return this.total;
  }
  
  removeItemCart(index:any){
    if(confirm("Bạn có chắc muốn xóa sản phẩm này?")){
      this.items.splice(index,1)
      localStorage.setItem("items",JSON.stringify(this.items));
      this.toastr.success("Xóa sản phẩm thành công",'',{
        timeOut:1000,
        progressBar:true
      })
      setTimeout(function(){
        window.location.reload();
     }, 1000);
    }else{
      localStorage.setItem("items",JSON.stringify(this.items));
    }
  }
  plusQuantity(index:any){
    this.items[index].quantity++;
    localStorage.setItem("items",JSON.stringify(this.items));
    setTimeout(function(){
      window.location.reload();
   }, 500);
  }
  minusQuantity(index:any){
    if(this.items[index].quantity <= 1){
      this.items[index].quantity;
      localStorage.setItem("items",JSON.stringify(this.items));
      setTimeout(function(){
        window.location.reload();
     }, 500);
    }else{
      this.items[index].quantity--;
      localStorage.setItem("items",JSON.stringify(this.items));
      setTimeout(function(){
        window.location.reload();
     }, 500);
    }
  }
  sale:any = 0;
  salecode:string ='';
  saleCode(){
    if( this.salecode == 'abc' ){
      this.sale = 10;
      localStorage.setItem("sale",this.sale);
      this.toastr.success("Thêm mã sản phầm thành công",'',{
        timeOut:1000,
        progressBar:true
      })
    }else{
      this.sale = 0;
      localStorage.setItem("sale",this.sale);
      this.toastr.error("Mã sản phẩm không tồn tại",'',{
        timeOut:1000,
        progressBar:true
      })
    }
  }
}
