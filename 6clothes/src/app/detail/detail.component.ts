import { ShopComponent } from './../shop/shop.component';
import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  ProductArray : any= "";
  name: string ="";
  key: string ="";
  productdt: any = '';
  currentProductID = "";
  constructor(private http: HttpClient, private router: Router ) 
  {
    this.productdt =localStorage.getItem('productdt');
    this.productdetaill();
  }
  ngOnInit(): void {
  }
  productdetaill(){
    this.http.get("http://127.0.0.1:8000/api/product/"+this.productdt)
    .subscribe((resultData: any)=>
    {
      console.log(resultData);
      this.ProductArray = resultData['data'];
      console.log(this.ProductArray);
    });
  }
}
