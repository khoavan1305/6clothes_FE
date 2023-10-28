import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICart } from './icart';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = '6clothes';
  UserArray: any[] = [];
  token: any;
  userDisplay: any = '';
  loguserDisplay: any = '';
  routerlinksignin: any = '';
  routerlinksignup: any = '';
  logoutuser: any = '';
  currentUserID = '';
  items: ICart[] = [];
  itemss:any;
  urlApi: any = 'https://admin.6clothes.click/api/';
  constructor(private http: HttpClient, private router: Router,private toastr: ToastrService) {
    this.token = localStorage.getItem("token");
    this.getOneUser();
    if(localStorage.getItem('items')){
      this.itemss= localStorage.getItem('items');
      this.items= JSON.parse(this.itemss);
    }else{
      localStorage.setItem('items', JSON.stringify(this.items));
    }
    this.tongtien();
  }
  public ngOnInit(): void {
    this.getProductLike();
    if ((this.token = localStorage.getItem('token'))) {
      this.userDisplay = 'Xin Chào: ' + localStorage.getItem('loggedUser');
      this.routerlinksignin = '';
      this.loguserDisplay = 'Đăng Xuất';
      this.routerlinksignup = 'logout';
      this.logoutuser = '';
    } else {
      this.userDisplay = 'Đăng Nhập';
      this.routerlinksignin = 'signin';
      this.loguserDisplay = '';
      this.routerlinksignup = 'signup';
      this.logoutuser = 'Đăng Ký';
    }

  }
  idUser:any;
  getOneUser(){
    this.http
    .get(this.urlApi+'user/'+this.token)
    .subscribe((resultData: any) => {
      this.idUser = resultData['data']['id'];
      this.getProductLike();
    });
  }
  productdetaill(id: string) {
        localStorage.setItem('productdt',id);
        this.router.navigate(['detail']);
          setTimeout(function(){
        window.location.reload();
     }, 1000);
      };
  productLikeArray: any[] = [];
  getProductLike(){
    this.http
    .get(this.urlApi+'product_like/'+this.idUser)
    .subscribe((resultData: any) => {
      this.productLikeArray = resultData['data'];
    });
  }
  removeLike(index:any){
    this.http.delete(this.urlApi+'product_like/'+index).subscribe((resultData:any)=>{
      this.toastr.success("Xóa thành công!",'',{
        timeOut:1000,
        progressBar:true
      })
      setTimeout(function(){
        window.location.reload();
     }, 1000);
    });
  }
  
  logout() {
    if (confirm('Bạn có muốn đăng xuất không?')) {
      this.router.navigate(['/']);
      localStorage.clear();
      this.toastr.success("Đăng xuất thành công thành công",'',{
        timeOut:1000,
        progressBar:true
      })
      setTimeout(function(){
        window.location.reload();
     }, 1000);
    }else{
    }
  }  
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
    
  }
  minusQuantity(index:any){
    if(this.items[index].quantity <= 1){
      this.items[index].quantity;
      localStorage.setItem("items",JSON.stringify(this.items));
    }else{
      this.items[index].quantity--;
      localStorage.setItem("items",JSON.stringify(this.items));
    }
  }
  search(index:any){
    if(index === "Áo Nam"){
      sessionStorage.setItem("search","Nam");
      setTimeout(function(){
        window.location.reload();
     }, 1000);
    }
    if(index === "Áo Nữ"){
      sessionStorage.setItem("search","Nữ");
      setTimeout(function(){
        window.location.reload();
     }, 1000);
    }
  }
}
