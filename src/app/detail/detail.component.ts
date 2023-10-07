import { ShopComponent } from './../shop/shop.component';
import { HttpClient } from '@angular/common/http';
import { Element, Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  ProductArray : any= "";
  productdt: any = '';
  currentProductID = "";

  constructor(private http: HttpClient, private router: Router ) 
  {
    if(   this.token = localStorage.getItem('productdt') === null){
      this.router.navigate(['/']);
    }else{
    this.productdt =localStorage.getItem('productdt');
    this.token = localStorage.getItem('token');
    this.userdetaill();
    this.productdetaill();
  }
  }
  ngOnInit(): void {
    this.clickstar();
    this.getComment();
    this.getProduct();
  }
  productdetaill(){
    this.http.get("http://127.0.0.1:8000/api/product/"+this.productdt).subscribe((resultData: any)=>
    {
      this.ProductArray = resultData['data'];
      localStorage.setItem('category_id',this.ProductArray["product_category_id"] )
    });
  }
  productdetaills(id: string) {
    this.http
      .get('http://127.0.0.1:8000/api/product/' + id)
      .subscribe((resultData: any) => {
        this.ProductArray = resultData;
        localStorage.setItem('productdt', resultData['data']['id']);
        location.reload();
      });
  }
  token: any = '';
  user: any = "";
  userdetaill() {
    this.http.get('http://127.0.0.1:8000/api/user/' + this.token).subscribe((resultData: any) => {
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
    this.http.post('http://127.0.0.1:8000/api/product_comment',bodyData).subscribe((resultData:any)=>{
      if (resultData["code"] === 409) {
        alert(resultData["messeage"]);
      }
      if (resultData["code"] === 200) {
        alert(resultData["messeage"]);
        location.reload();
      }
    });
  }
  comments: any[] = [];
  avatars: any[] = [];
  getComment(){
    this.http.get('http://127.0.0.1:8000/api/product_comment/' + this.productdt).subscribe((resultData:any)=>{
    this.comments = resultData["data"];

      // for(let i = 0;i  <  this.comments.length;i++){
      //   this.comments[i]['user_id']; 
      //   this.http.get('http://127.0.0.1:8000/api/getUserId/' + this.comments[i]['user_id']).subscribe((resultData:any)=>{
      //     // this.comments[i].push();
      //     this.avatars.push(resultData['data']);
      //   });
      // }
      console.log(this.comments); 

    });
  }
  show_category : any= "";
  getProduct(){
    this.http.get('http://127.0.0.1:8000/api/show_category_id/' +localStorage.getItem('category_id')
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
}
