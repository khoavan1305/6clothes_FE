import { ShopComponent } from './../shop/shop.component';
import { HttpClient } from '@angular/common/http';
import { Element, Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ICart } from '../icart';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  ProductArray : any= "";
  productdt: any = '';
  currentProductID = "";
  itemss:any;
  urlApi :any = "http://127.0.0.1:8000/api/";

  constructor(private http: HttpClient, private router: Router,private toastr: ToastrService ) 
  {
    if(   this.token = localStorage.getItem('productdt') === null){
      this.router.navigate(['/']);
    }else{
  }
  }
  ngOnInit(): void {
    this.productdt =localStorage.getItem('productdt');
    this.token = localStorage.getItem('token');
    this.userdetaill();
    this.productdetaill();
    this.clickstar();
    this.getComment();
    this.getProduct();

  }
  productdetaill(){
    this.http.get(this.urlApi + "product/"+this.productdt).subscribe((resultData: any)=>
    {
      this.ProductArray = resultData['data'];
      localStorage.setItem('category_id',this.ProductArray["product_category_id"] )
    });
  }
  productdetaills(id: string) {
    this.http
      .get(this.urlApi + 'product/' + id)
      .subscribe((resultData: any) => {
        this.ProductArray = resultData;
        localStorage.setItem('productdt', resultData['data']['id']);
        location.reload();
      });
  }
  token: any = '';
  user: any = "";
  userdetaill() {
    this.http.get(this.urlApi + 'user/' + this.token).subscribe((resultData: any) => {
        this.user = resultData['data'];
      });
  }
  rating: any;
  messages: string = "";
  name: string = "";
  email: string = "";
  onSubmit(){
    let bodyData = {
      "messages": this.messages,
      "name": this.user['name'],
      "email": this.user['email'],
      "iduser": this.user['id'],
      "idpro": this.productdt,
      "rating": this.rating,
      "avatar": this.user['avatar'],
    };
    this.http.post(this.urlApi + 'product_comment',bodyData).subscribe((resultData:any)=>{
      if (resultData["code"] === 409) {
        this.toastr.error((resultData['messeage']),'',{
          timeOut:1000,
          progressBar:true
        })
      }
      if (resultData["code"] === 200) {
        this.toastr.success((resultData['messeage']),'',{
          timeOut:1000,
          progressBar:true
        })
        setTimeout(function(){
          window.location.reload();
       }, 1000);
      }
    });
  }
  comments: any[] = [];
  avatars: any[] = [];
  review: any = 0;
  countcmt: any = 0;
  getComment(){
    this.http.get(this.urlApi + 'product_comment/' + this.productdt).subscribe((resultData:any)=>{
    this.comments = resultData["data"];
    console.log(this.comments[0]["created_at"])
    for (let i = 0; i < resultData["data"].length; i++) {
      this.review += resultData["data"][i]['rating'];
      this.countcmt++;
    }
    let i = this.review / this.countcmt;
    this.review = Math.ceil(i)
    });
  }
  show_category : any= "";
  getProduct(){
    this.http.get(this.urlApi + 'show_category_id/' +localStorage.getItem('category_id')
    ).subscribe((resultData:any)=>{
    this.show_category = resultData["data"];
    });
  }
clickstar(){ 
    const stars = document.querySelectorAll(".stars i");
    let value = "";
stars.forEach((star, index1) => {
  star.addEventListener("click", () => {
    let value = index1 + 1;
    stars.forEach((star, index2) => {
      index1 >= index2
        ? star.classList.add("active")
        : star.classList.remove("active");
    });
    this.rating = value;
  });
    });
  }
  items: ICart[] = [];
  size:any;
  color:any;
  quantity:any = 1;
  plusQuantity(){
    this.quantity++;
  }
  minusQuantity(){
    if(this.quantity <= 1){
      this.quantity;
    }else{
      this.quantity--;
    }
  }
  addToCart(id: string) {
    if(this.size == null || this.color ==null){
      this.toastr.error(("Vui lòng chọn kích thước & màu"),'',{
        timeOut:2000,
        progressBar:true
      })
    }else{
    this.http
      .get(this.urlApi+'product/' + id)
      .subscribe((resultData: any) => {
        var index = this.items.findIndex(
          (item) => item.id == resultData['data']['id']
        );
        if (index >= 0 && this.items[index].size == this.size ) {
          this.items[index].quantity++;
          this.toastr.success("Thêm sản phẩm thành công",'',{
            timeOut:1000,
            progressBar:true
          })
          setTimeout(function(){
            window.location.reload();
         }, 1000);
        } else {
          var c: ICart;
          c = {
            id: resultData['data']['id'],
            name: resultData['data']['name'],
            price: resultData['data']['price'],
            image: resultData['data']['image'],
            size: this.size,
            color: this.color,
            quantity: this.quantity,
          };
          this.items.push(c);
          this.toastr.success("Thêm sản phẩm thành công",'',{
            timeOut:1000,
            progressBar:true
          })
          setTimeout(function(){
            window.location.reload();
         }, 1000);
        }
        localStorage.setItem('items', JSON.stringify(this.items));
      });
    }
  }
}
